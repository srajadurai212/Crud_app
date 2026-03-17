"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<any>(null);
  const [preview, setPreview] = useState("");

  const id = params.id;

  // 🔹 Fetch existing product
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/api/product`);
      const data = await res.json();

      const product = data.find((p: any) => p.id == id);

      if (product) {
        setName(product.name);
        setDesc(product.description);
        setPreview(`http://localhost:5000${product.filePath}`);
      }
    };

    fetchData();
  }, [id]);

  // 🔹 Update product
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", desc);

    if (file) {
      formData.append("File", file);
    }

    await fetch(`http://localhost:5000/api/product/${id}`, {
      method: "PUT",
      body: formData
    });

    alert("Updated!");
    router.push("/");
  };

  return (
    <div>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />

        <div>
          <p>Current File:</p>
          {preview && <img src={preview} width="120" />}
        </div>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}