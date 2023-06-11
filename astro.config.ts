import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";


// https://astro.build/config
export default defineConfig({
  site: "https://matthieufelker.com/",
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
  }), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), sitemap(), prefetch(), react()],
  compressHTML: true,


});