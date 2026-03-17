"use client";

import { useState } from "react";

export default function Create() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<any>();

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", desc);
    formData.append("File", file);

    await fetch("http://localhost:5000/api/product", {
      method: "POST",
      body: formData
    });

    alert("Created");
  };

  return (
    <form onSubmit={submit}>
      <input onChange={e => setName(e.target.value)} placeholder="Name" />
      <input onChange={e => setDesc(e.target.value)} placeholder="Desc" />
      <input type="file" onChange={e => setFile(e.target.files?.[0])} />
      <button>Create</button>
    </form>
  );
}