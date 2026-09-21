"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar({
  className = "",
  compact = false,
  defaultValue = "",
}: {
  className?: string;
  compact?: boolean;
  defaultValue?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.push(`/resultados${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={`relative w-full ${className}`}>
      <label htmlFor="site-search" className="sr-only">
        O que sua empresa procura?
      </label>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary"
        aria-hidden="true"
      />
      <input
        id="site-search"
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="O que sua empresa procura?"
        className={`w-full rounded-control border border-border-subtle bg-surface-card py-3 pl-11 pr-4 text-body text-text-primary placeholder:text-text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
          compact ? "h-11" : "h-12"
        }`}
      />
    </form>
  );
}
