import { useEffect, useState } from "react";
import { fetchWeather } from "./api/fetchWeather.js";
import "./App.css";
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);
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
      {!online && (
        <p className="message error">
          Brak połączenia - pokazuję ostatnio pobrane dane.
        </p>
      )}
      {loading && <p className="message">Pobieranie danych...</p>}
      {error && <p className="message error">{error}</p>}
      {weather && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            <span>{Math.round(weather.main.temp)}</span>
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              alt={weather.weather[0].description}
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <p>{weather.weather[0].description}</p>
            <p>Wilgotność: {weather.main.humidity}%</p>
            <p>Ciśnienie: {weather.main.pressure} hPa</p>
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span style={{ textWrap: "nowrap" }}>
                Wiatr: {weather.wind.speed} m/s
              </span>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFycm93LWRvd24gcHJldmlldy1pY29uIj48cGF0aCBkPSJNMTIgNXYxNCIvPjxwYXRoIGQ9Im0xOSAxMi03IDctNy03Ii8+PC9zdmc+"
                style={{
                  height: "75%",
                  marginInline: "3px",
                  rotate: `${weather.wind.deg}deg`,
                }}
              />
              <span>({weather.wind.deg}&deg;)</span>
            </p>
            {weather.wind.gust && <p>Porywy: {weather.wind.gust} m/s</p>}
            <p>
              Czas aktualizacji:{" "}
              {new Date(weather.dt * 1000).toLocaleTimeString("pl-PL", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
