import React, { useState, useEffect } from "react";
// Explanations are listed per step
export default function App() {
  // 1. Setup state variables
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Setup inputs for the user (defaulting to Columbus)
  const [latInput, setLatInput] = useState("39.9612");
  const [lonInput, setLonInput] = useState("-82.9988");

  const API_KEY = "9fc0a438f42c353560af2e08f6ca0c9c";

  // 3. The reusable fetch function
  async function fetchWeather(latitude, longitude) {
    try {
      setLoading(true);
      setError(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Location not found. HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  // 4. Initial fetch when the app first loads
  useEffect(() => {
    fetchWeather("39.9612", "-82.9988");
  }, []);

  // 5. Handle the form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (latInput && lonInput) {
      fetchWeather(latInput, lonInput);
    }
  };

  // 6. What shows up on the screen
  return (
    <div
      style={{ fontFamily: "sans-serif", padding: "20px", maxWidth: "400px" }}
    >
      <h2>Weather Search Tracker</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Latitude:</label>
          <input
            type="text"
            value={latInput}
            onChange={(e) => setLatInput(e.target.value)}
            placeholder="e.g. 39.9612"
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Longitude:</label>
          <input
            type="text"
            value={lonInput}
            onChange={(e) => setLonInput(e.target.value)}
            placeholder="e.g. -82.9988"
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: "8px 15px", cursor: "pointer" }}
        >
          Search Weather
        </button>
      </form>

      <hr />

      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && !loading && (
        <div style={{ marginTop: "20px" }}>
          <h3>{weather.name || "Custom Coordinates"}</h3>
          <p>
            <b>Temperature:</b> {Math.round(weather.main.temp)}°F
          </p>
          <p>
            <b>Feels Like:</b> {Math.round(weather.main.feels_like)}°F
          </p>
          <p>
            <b>Humidity:</b> {weather.main.humidity}%
          </p>
          <p>
            <b>Conditions:</b> {weather.weather[0].description}
          </p>
        </div>
      )}
    </div>
  );
}
