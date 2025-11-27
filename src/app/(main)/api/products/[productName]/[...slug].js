// /pages/api/products/[productName]/[...slug].js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { productName, slug } = req.query;

  const filePath = path.join(
    process.cwd(),
    "uploaded-products",
    productName,
    ...(slug || ["index.html"])
  );

  if (!fs.existsSync(filePath)) return res.status(404).send("Not found");

  const ext = path.extname(filePath);
  if (ext === ".js") res.setHeader("Content-Type", "application/javascript");
  else if (ext === ".css") res.setHeader("Content-Type", "text/css");
  else if (ext === ".html") res.setHeader("Content-Type", "text/html");

  res.send(fs.readFileSync(filePath));
}
