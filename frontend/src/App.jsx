import { useEffect, useState } from "react";
import "./App.css";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function App() {
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [message, setMessage] = useState("Connecting to backend...");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  async function loadItems() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/items`);

      if (!response.ok) {
        throw new Error("Unable to load items");
      }

      const data = await response.json();
      setItems(data);
      setError("");
    } catch {
      setError("Could not load items. Please check the backend connection.");
    }
  }

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health`);

        if (!response.ok) {
          throw new Error("API unavailable");
        }

        const data = await response.json();

        setApiStatus("Online");
        setMessage(data.message);
      } catch {
        setApiStatus("Offline");
        setMessage("Backend connection unavailable");
      }
    }

    checkBackend();
    loadItems();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add item");
      }

      setItems((previousItems) => [data, ...previousItems]);
      setName("");
      setDescription("");
    } catch (err) {
      setError(err.message || "Unable to add item.");
    }
  }

  return (
    <main className="dashboard">
      <header className="header">
        <div>
          <p className="eyebrow">Q66 · DOCKER PROJECT</p>
          <h1>MERN Control Center</h1>
          <p className="subtitle">
            Monitor your application services in one place.
          </p>
        </div>

        <span className="stack-badge">MERN + Nginx</span>
      </header>

      <section className="status-card">
        <div className="status-top">
          <span>Backend API</span>
          <span className={apiStatus === "Online" ? "online" : "offline"}>
            {apiStatus}
          </span>
        </div>

        <h2>
          {apiStatus === "Online" ? "Service operational" : apiStatus}
        </h2>

        <p>{message}</p>
      </section>

      <section className="services">
        <article className="service-card">
          <span className="service-icon">UI</span>
          <h3>React Frontend</h3>
          <p>User interface and dashboard</p>
          <span className="service-label">Frontend</span>
        </article>

        <article className="service-card">
          <span className="service-icon">API</span>
          <h3>Node.js + Express</h3>
          <p>Backend API services</p>
          <span className="service-label">Backend</span>
        </article>

        <article className="service-card">
          <span className="service-icon">DB</span>
          <h3>MongoDB Atlas</h3>
          <p>Application data storage</p>
          <span className="service-label">Database</span>
        </article>

        <article className="service-card">
          <span className="service-icon">NG</span>
          <h3>Nginx</h3>
          <p>Web server and reverse proxy</p>
          <span className="service-label">Gateway</span>
        </article>
      </section>

      <section className="items-section">
        <h2>Manage Items</h2>
        <p>Add items and store them in MongoDB.</p>

        <form onSubmit={handleSubmit} className="item-form">
          <input
            type="text"
            placeholder="Item name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <button type="submit">Add Item</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="items-list">
          {items.length === 0 ? (
            <p>No items yet. Add your first item above.</p>
          ) : (
            items.map((item) => (
              <article className="item-row" key={item._id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description || "No description provided"}</p>
                </div>

                <span className="service-label">Saved</span>
              </article>
            ))
          )}
        </div>
      </section>

      <footer>Q66 · MERN Stack · Docker Compose · Nginx</footer>
    </main>
  );
}

export default App;