import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import webVitals from "@astrojs/web-vitals";
import vercel from '@astrojs/vercel/serverless';

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), tailwind(), react(), webVitals(), db()],
  adapter: vercel(),
});