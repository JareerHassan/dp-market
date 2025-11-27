import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send(err);

    const productName = fields.productName;
    const productDir = path.join(process.cwd(), "uploaded-products", productName);

    // Create folder if not exists
    if (!fs.existsSync(productDir)) fs.mkdirSync(productDir, { recursive: true });

    // Save all files
    const allFiles = Array.isArray(files.files) ? files.files : [files.files];
    allFiles.forEach((file) => {
      const dest = path.join(productDir, file.originalFilename);
      fs.copyFileSync(file.filepath, dest);
    });

    res.status(200).send({ message: "Files uploaded successfully!" });
  });
}
