import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths(),
  ],
  build: {
    sourcemap: true, // Habilita los mapas de fuente
  },
  server: {
    watch: {
      ignored: [], // Asegúrate de que ninguna carpeta esté excluida
    },
  },
});




