/* eslint-disable @typescript-eslint/no-require-imports -- Node's built-in test runner loads the TypeScript domain modules without additional dependencies. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");

require.extensions[".ts"] = (module, filename) => {
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename,
  });
  module._compile(output.outputText, filename);
};

const { parseBRLToCents, validateDemoBid } = require("../lib/money.ts");
const { parseFavorites } = require("../lib/preferences.ts");
const {
  parseFilters,
  applyFilters,
  filtersToQueryString,
  EMPTY_FILTERS,
} = require("../lib/filters.ts");
const { ASSETS, SUBCATEGORIES } = require("../lib/data.ts");
const { getCountdownParts, formatCurrencyFull } = require("../lib/format.ts");

test("Brazilian amounts preserve cents", () => {
  for (const [input, cents] of [
    ["28.500,50", 2850050],
    ["28500,5", 2850050],
    ["1,01", 101],
    [" 2.000 ", 200000],
    ["0,01", 1],
  ])
    assert.equal(parseBRLToCents(input), cents);
  assert.match(
    formatCurrencyFull(parseBRLToCents("28.500,50") / 100),
    /28\.500,50/,
  );
});
test("invalid, negative and unsafe amounts are rejected", () => {
  for (const input of [
    "",
    "0",
    "-5",
    "1e6",
    "10.50",
    "1,001",
    "1.23.456",
    "R$ 100",
    "NaN",
    "99999999999999999",
  ])
    assert.equal(parseBRLToCents(input), null, input);
});
test("minimum bid includes exact cents", () => {
  assert.equal(validateDemoBid("100,49", 100.5).cents, null);
  assert.equal(validateDemoBid("100,50", 100.5).cents, 10050);
  assert.equal(validateDemoBid("100,51", 100.5).cents, 10051);
});
test("corrupt and unexpected favorite storage cannot break rendering", () => {
  for (const raw of ["{", "null", "{}", "42", '"abc"'])
    assert.deepEqual(parseFavorites(raw), []);
  assert.deepEqual(parseFavorites('["a1",null,"a1",42,"a2","<bad>"]'), [
    "a1",
    "a2",
  ]);
  assert.equal(
    parseFavorites(
      JSON.stringify(Array.from({ length: 250 }, (_, i) => `asset-${i}`)),
    ).length,
    200,
  );
});
test("query filters whitelist values and canonicalize location", () => {
  const filters = parseFilters({
    categoria: "maquinas,unknown,maquinas",
    status: "aberto,bad",
    sort: "bad",
    uf: "sp",
    valorMin: "-1",
    valorMax: "Infinity",
  });
  assert.deepEqual(filters.categorias, ["maquinas"]);
  assert.deepEqual(filters.status, ["aberto"]);
  assert.equal(filters.uf, "SP");
  assert.equal(filters.sort, "relevantes");
  assert.equal(filters.valorMin, "");
  assert.equal(filters.valorMax, "");
});
test("accent-insensitive search finds companies, categories and cities", () => {
  for (const q of ["maquinas", "METALFOR", "sao paulo"])
    assert.ok(applyFilters({ ...EMPTY_FILTERS, q }).length > 0, q);
  assert.equal(
    applyFilters({ ...EMPTY_FILTERS, q: "inexistente-zzz" }).length,
    0,
  );
});
test("cancelled assets are excluded and price ordering is consistent", () => {
  const results = applyFilters({
    ...EMPTY_FILTERS,
    sort: "valor_asc",
    valorMin: "100",
    valorMax: "1000000",
  });
  assert.ok(results.length > 1);
  assert.ok(results.every((a) => a.status !== "cancelado"));
  const values = results.map((a) => a.currentBid ?? a.startingBid);
  assert.deepEqual(
    values,
    [...values].sort((a, b) => a - b),
  );
});
test("filter state survives URL round trip", () => {
  const state = {
    ...EMPTY_FILTERS,
    categorias: ["maquinas", "tecnologia"],
    status: ["aberto"],
    q: "máquinas",
    uf: "SP",
    valorMin: "0",
    sort: "valor_desc",
  };
  assert.deepEqual(
    parseFilters(
      Object.fromEntries(new URLSearchParams(filtersToQueryString(state))),
    ),
    state,
  );
});
test("closing filter selects only open examples due within 24h of demo epoch", () => {
  const results = applyFilters({ ...EMPTY_FILTERS, status: ["encerrando"] });
  assert.ok(results.length > 0);
  assert.ok(results.every((a) => ["aberto", "encerrando"].includes(a.status)));
  assert.ok(ASSETS.some((a) => a.status === "agendado" && !!a.startsAtIso));
});
test("deadline expires at exact boundary and countdown never goes negative", () => {
  const deadline = "2026-09-21T12:00:00.000Z";
  const end = Date.parse(deadline);
  assert.equal(getCountdownParts(deadline, end - 1000).seconds, 1);
  assert.equal(getCountdownParts(deadline, end).isPast, true);
  const after = getCountdownParts(deadline, end + 5000);
  assert.equal(after.isPast, true);
  assert.deepEqual(
    [after.days, after.hours, after.minutes, after.seconds],
    [0, 0, 0, 0],
  );
});

test("subcategory filter narrows within a category and survives the URL", () => {
  const base = { ...EMPTY_FILTERS, categorias: ["maquinas"] };
  const all = applyFilters(base);
  const narrowed = applyFilters({ ...base, subcategorias: ["agricolas"] });
  assert.ok(narrowed.length > 0);
  assert.ok(narrowed.length < all.length);
  assert.ok(narrowed.every((a) => a.subcategory === "agricolas"));
  assert.deepEqual(
    parseFilters(
      Object.fromEntries(
        new URLSearchParams(
          filtersToQueryString({ ...base, subcategorias: ["agricolas"] }),
        ),
      ),
    ).subcategorias,
    ["agricolas"],
  );
  assert.deepEqual(
    parseFilters({ subcategoria: "nao-existe" }).subcategorias,
    [],
  );
});

test("every lot points at a subcategory that exists in the taxonomy", () => {
  const known = new Set(
    Object.values(SUBCATEGORIES).flatMap((list) => list.map((s) => s.slug)),
  );
  for (const asset of ASSETS)
    assert.ok(known.has(asset.subcategory), `${asset.lot}: ${asset.subcategory}`);
  const lots = ASSETS.map((a) => a.lot);
  assert.equal(new Set(lots).size, lots.length, "códigos de lote duplicados");
});

test("sale modality filters and survives the URL round trip", () => {
  const diretas = applyFilters({ ...EMPTY_FILTERS, modalidade: "venda_direta" });
  const leiloes = applyFilters({ ...EMPTY_FILTERS, modalidade: "leilao" });
  assert.ok(diretas.length > 0, "nenhum lote em venda direta");
  assert.ok(diretas.every((a) => a.modalidade === "venda_direta"));
  assert.ok(leiloes.every((a) => a.modalidade !== "venda_direta"));
  assert.equal(
    diretas.length + leiloes.length,
    applyFilters(EMPTY_FILTERS).length,
  );
  // venda direta não tem disputa: nenhum lance registrado
  for (const a of diretas) {
    assert.equal(a.currentBid, null, a.lot);
    assert.equal(a.bidCount, 0, a.lot);
  }
  const state = { ...EMPTY_FILTERS, modalidade: "venda_direta" };
  assert.equal(
    parseFilters(
      Object.fromEntries(new URLSearchParams(filtersToQueryString(state))),
    ).modalidade,
    "venda_direta",
  );
  assert.equal(parseFilters({ modalidade: "qualquer" }).modalidade, "");
});

test("compact countdown keeps the most significant units", () => {
  const { formatCompactCountdown } = require("../lib/format.ts");
  const now = Date.UTC(2026, 0, 1, 12);
  const at = (ms) => new Date(now + ms).toISOString();
  const H = 3600000;
  assert.equal(formatCompactCountdown(at(2 * 24 * H + 14 * H + 32 * 60000), now), "2d 14h 32m");
  assert.equal(formatCompactCountdown(at(14 * H + 5 * 60000), now), "14h 05m");
  assert.equal(formatCompactCountdown(at(32 * 60000 + 9000), now), "32m 09s");
  assert.equal(formatCompactCountdown(at(-1000), now), "Encerrado");
});

test("free-text lists keep accents and drop junk", () => {
  const { parseTextList, parseSlugList } = require("../lib/preferences.ts");
  assert.deepEqual(
    parseTextList(JSON.stringify(["Caminhão", " caminhão ", "Gerador 250 kVA", "", 3, "a\u0007b"])),
    ["Caminhão", "Gerador 250 kVA"],
  );
  assert.deepEqual(parseTextList("não é json"), []);
  assert.deepEqual(parseTextList(JSON.stringify(["x".repeat(61)])), []);
  // o parser de slugs continua estrito
  assert.deepEqual(parseSlugList(JSON.stringify(["Caminhão"])), []);
});
