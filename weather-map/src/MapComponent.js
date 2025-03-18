import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet"; 
import './MapComponent.css'; 

const API_KEY = "OpenwheatermapAPIKey"; 

const WeatherApp = () => {
  const [position, setPosition] = useState([20, 0]); 
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showWeather, setShowWeather] = useState(true); 
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const customIcon = new L.Icon({
    iconUrl: require("./location-pin.png"), 
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  const handleSearch = async () => {
    if (!search) return;
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
      );
      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        const newPosition = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPosition);
        fetchWeather(lat, lon);
        setShowWeather(true); 
      } else {
        setError("City not found!");
      }
    } catch (error) {
      setError("Error searching for city.");
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        fetchWeather(e.latlng.lat, e.latlng.lng);
        setShowWeather(true); 
      },
    });
    return null;
  };

  const MapUpdater = ({ position }) => {
    const map = useMap();
    map.setView(position, 10); 
    return null;
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const mapLayerUrl = isDarkMode
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" 
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"; 

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
      </button>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <MapContainer center={position} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer url={mapLayerUrl} />
        <MapUpdater position={position} /> 
        <MapClickHandler />
        <Marker position={position} icon={customIcon}> 
          <Popup>{weather ? weather.name : "Selected Location"}</Popup>
        </Marker>
      </MapContainer>

      {showWeather && (
        <div className="weather-info">
          <button className="close-btn" onClick={() => setShowWeather(false)}>&#10005;</button>
          <h2>Weather Info</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {weather ? (
            <div>
              <div className="weather-details">
                <h3>{weather.name || "Unknown Location"}</h3>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          ) : (
            <p>Click on the map or search for a city.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
