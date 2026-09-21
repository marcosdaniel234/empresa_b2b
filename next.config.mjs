/** A single shared epoch keeps demo dates identical on the server and browser. */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_DEMO_EPOCH:
      process.env.NEXT_PUBLIC_DEMO_EPOCH ?? String(Date.now()),
  },
};
export default nextConfig;

