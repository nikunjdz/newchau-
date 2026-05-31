import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 8093,
    strictPort: true,
    open: '/newchau/arc/newindex.html',
  },
});
