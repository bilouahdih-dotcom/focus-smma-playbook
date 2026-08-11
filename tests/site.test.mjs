import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("renders complete SEO metadata and one clear H1", async () => {
  const html = await read(".next/server/app/index.html");
  assert.match(html, /<html[^>]*lang="fr"/i);
  assert.match(html, /<title>BS IA — SMMA Masterbook 2026<\/title>/i);
  assert.match(html, /<meta[^>]+name="description"/i);
  assert.match(html, /<link[^>]+rel="canonical"[^>]+focus-smma-playbook\.vercel\.app/i);
  assert.match(html, /application\/ld\+json/i);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
});

test("keeps every internal navigation target valid", async () => {
  const html = await read(".next/server/app/index.html");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  const targets = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  assert.ok(targets.length > 10);
  assert.deepEqual(targets.filter((target) => !ids.has(target)), []);
});

test("publishes the corrected market data and current service count", async () => {
  const page = await read("app/page.tsx");
  const layout = await read("app/layout.tsx");
  assert.match(page, /value: "27 %"/);
  assert.doesNotMatch(page, /value: "37 %"/);
  assert.match(layout, /27 modules, 15 services/);
  assert.doesNotMatch(layout, /27 modules, 9 services/);
  assert.match(page, /String\(index \+ 1\)\.padStart\(2, "0"\)/);
});

test("protects mobile interactions and keyboard navigation", async () => {
  const [page, css] = await Promise.all([read("app/page.tsx"), read("app/globals.css")]);
  assert.match(css, /\.quick-nav\s*\{\s*pointer-events:\s*none/);
  assert.match(css, /\.quick-nav\.open nav\s*\{\s*pointer-events:\s*auto/);
  assert.match(page, /role="tab"/);
  assert.match(page, /aria-selected=/);
  assert.match(page, /className="skip-link"/);
  assert.match(css, /:focus-visible/);
});

test("ships crawl routes and baseline security headers", async () => {
  const [robots, sitemap, config] = await Promise.all([
    read("app/robots.ts"),
    read("app/sitemap.ts"),
    read("next.config.ts"),
  ]);
  assert.match(robots, /sitemap:/);
  assert.match(sitemap, /focus-smma-playbook\.vercel\.app/);
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /X-Content-Type-Options/);
  assert.match(config, /Referrer-Policy/);
});
