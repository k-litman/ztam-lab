import { useState } from "react";
import { fetchWeather } from "./api/fetchWeather.js";
import "./App.css";
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const search = async (e) => {
    e.preventDefault();
    if (!query.trim()) return; // puste pole - nic nie robimy
    setLoading(true);
    setError("");
    try {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery(""); // czyścimy pole po udanym wyszukiwaniu
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="main-container">
      <form onSubmit={search}>
        <input
          type="text"
          className="search"
          placeholder="Wpisz miasto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {loading && <p className="message">Pobieranie danych...</p>}
      {error && <p className="message error">{error}</p>}
      {weather && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
        </div>
      )}
    </div>
  );
}
export default App;
