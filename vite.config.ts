import { createRequire } from "node:module";
import path from "node:path";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const require = createRequire(import.meta.url);
const prismaClientPath = require
  .resolve("@prisma/client")
  .replace(/@prisma(\/|\\)client(\/|\\).*/, ".prisma/client");

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      // This is a workaround for the issue with Prisma Client and Vite
      // where the client is not being properly resolved in the browser
      // See: https://github.com/prisma/prisma/issues/12504
      ".prisma/client/index-browser": path.join(
        prismaClientPath,
        "index-browser.js",
      ),
    },
  },
});
