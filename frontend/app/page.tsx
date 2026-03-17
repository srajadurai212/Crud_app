async function getData() {
  const res = await fetch("http://localhost:5000/api/product", {
    cache: "no-store"
  });
  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <div>
      <h1>Products</h1>

      {data.map((p: any) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <img src={`http://localhost:5000${p.filePath}`} width="100" />
        </div>
      ))}
    </div>
  );
}