import { useEffect, useState, FormEvent } from "react";

import { FiTrash } from "react-icons/fi";
import { api } from "./services/api";

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  create_at: string;
  updated_at: string;
}

export default function App() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function getCustomers() {
    const response = await api.get("/customers");
    setCustomers(response.data);
  }
  useEffect(() => {
    getCustomers();
  }, []);

  async function handleDelete(id: string) {
    try {
      await api.delete("/customer", {
        params: {
          id,
        },
      });
      const allCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(allCustomers);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name || !email) return;

    const response = await api.post("/customer", {
      name,
      email,
    });
    setCustomers((prevState) => [...prevState, response.data]);
    setName("");
    setEmail("");
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="text-white font-medium mb-1" htmlFor="name">
            Nome
          </label>
          <input
            className="w-full mb-5 p-2 rounded"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-white font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full mb-5 p-2 rounded"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full cursor-pointer p-2 bg-green-400 font-medium rounded hover:bg-green-500 duration-200"
            type="submit"
            value="Cadastrar"
          />
        </form>

        <section className="flex flex-col">
          {customers.length &&
            customers.map((customer) => (
              <article
                className="w-full bg-white rounded p-2 my-2 relative hover:scale-105 duration-200"
                key={customer.email}
              >
                <p>
                  <span className="font-medium">Nome: </span>
                  {customer.name}
                </p>
                <p>
                  <span className="font-medium">Email: </span>
                  {customer.email}
                </p>
                <p>
                  <span className="font-medium">Status: </span>
                  {customer.status ? "Ativo" : "Inativo"}
                </p>
                <button
                  className="bg-red-400 w-7 h-7 flex items-center justify-center rounded absolute -top-2 -right-2"
                  onClick={() => handleDelete(customer.id)}
                >
                  <FiTrash size={18} />
                </button>
              </article>
            ))}
        </section>
      </main>
    </div>
  );
}
