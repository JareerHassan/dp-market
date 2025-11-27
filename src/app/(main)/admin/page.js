"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [productName, setProductName] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("productName", productName);

    for (let file of files) {
      formData.append("files", file);
    }

    try {
      await axios.post("http://localhost:9003/upload-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div>
      <input
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="file"
        webkitdirectory="true"
        directory=""
        multiple
        onChange={(e) => setFiles([...e.target.files])}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}