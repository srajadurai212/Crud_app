// components/ProductForm.tsx
"use client";

import { useState } from "react";
import { createProduct } from "../services/api";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", desc);
    formData.append("File", file);

    await createProduct(formData);
    alert("Created!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Desc" onChange={e => setDesc(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files?.[0])} />
      <button type="submit">Submit</button>
    </form>
  );
}