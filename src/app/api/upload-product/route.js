import fs from "fs";
import path from "path";
import { unstable_parseMultipartFormData } from "next/server";

export const config = { api: { bodyParser: false } };

export async function POST(req) {
  try {
    // Parse form data
    const formData = await unstable_parseMultipartFormData(req, async (file) => {
      const uploadDir = path.join(process.cwd(), "uploaded-products");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, file.originalName);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      return file.originalName;
    });

    // Optional: get productName from formData
    const productName = formData.get("productName")?.toString() || "default";

    return new Response(JSON.stringify({ message: "Uploaded!", productName }), {
      status: 200,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}