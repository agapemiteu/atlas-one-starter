// Kano Fabrics: a tiny shop site with zero dependencies, ready for your coding agent to add an N-ATLaS
// feature through Atlas One. Run it with `npm start`, then open http://localhost:3000.

import { readFileSync, existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

// Load .env.local (where your Atlas One key goes). It is git-ignored: never commit it.
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const PORT = Number(process.env.PORT ?? 3000);
const PUBLIC = join(import.meta.dirname, "public");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" };

/** API routes: "METHOD /path" -> async (req, res) => {}. Your agent adds the N-ATLaS route here. */
const routes = {
  "GET /api/shop": async (_req, res) => sendJson(res, 200, JSON.parse(readFileSync("shop.json", "utf8"))),
};

export function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

export async function readJson(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  return body ? JSON.parse(body) : {};
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  try {
    const route = routes[`${req.method} ${pathname}`];
    if (route) return await route(req, res);
    if (req.method !== "GET") return sendJson(res, 404, { error: "not_found" });
    const file = normalize(join(PUBLIC, pathname === "/" ? "index.html" : pathname));
    if (!file.startsWith(PUBLIC) || !existsSync(file)) return sendJson(res, 404, { error: "not_found" });
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
    res.end(await readFile(file));
  } catch (err) {
    console.error(err);
    sendJson(res, 500, { error: "server_error" });
  }
}).listen(PORT, () => console.log(`Kano Fabrics is running at http://localhost:${PORT}`));
