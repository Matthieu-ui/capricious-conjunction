import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";


// https://astro.build/config
export default defineConfig({
  site: "https://matthieufelker.com/",
  server: {
    host: "0.0.0.0",
    port: 5000
  },
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: true
    }
  },
  integrations: [mdx({}), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sitemap(), prefetch(), react()],
  compressHTML: true
});