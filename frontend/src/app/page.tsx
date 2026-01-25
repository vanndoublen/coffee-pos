export default async function Home() {
  const res = await fetch("http://localhost:8080/api/user/me", {
    cache: "no-store",
  });

  const text = await res.text();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">CoffeePOS</h1>
      <p className="mt-4">Backend says: {text}</p>
    </main>
  );
}
