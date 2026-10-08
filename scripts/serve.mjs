import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
const root = path.resolve("out");
const port = Number(process.env.PORT || 3000);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".json": "application/json",
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url || "/", `http://${req.headers.host}`);
      let name = decodeURIComponent(url.pathname);
      if (name.endsWith("/")) name += "index.html";
      let file = path.resolve(root, "." + name);
      if (!file.startsWith(root + path.sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      let body;
      try {
        body = await readFile(file);
      } catch {
        if (!path.extname(name)) {
          file = path.join(file, "index.html");
          body = await readFile(file);
        } else throw new Error("Not found");
      }
      const compressed =
        /gzip/.test(req.headers["accept-encoding"] || "") &&
        /\.(html|css|js|svg|xml|txt|json)$/.test(file);
      if (compressed) body = gzipSync(body);
      res.writeHead(200, {
        "Content-Type": mime[path.extname(file)] || "application/octet-stream",
        Vary: "Accept-Encoding",
        ...(compressed ? { "Content-Encoding": "gzip" } : {}),
        "Cache-Control": name.startsWith("/_next/static/")
          ? "public, max-age=31536000, immutable"
          : "no-cache",
      });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(
        await readFile(path.join(root, "404.html")).catch(
          () => "<h1>Not found</h1>",
        ),
      );
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Campus2Pro preview: http://localhost:${port}`),
  );
