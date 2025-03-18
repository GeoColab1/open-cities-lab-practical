# Weather Map App

This project is a weather map app using React and Leaflet. It lets you search for a place or click on the map to see the weather there. Also got dark mode for those who like it.

## What You Need
- Node.js 
- npm or yarn 

## Libraries Used
- React – Frontend framework
- Leaflet – Interactive maps
- React-Leaflet – React wrapper for Leaflet
- OpenWeather API – Fetches weather data
- Axios – Handles API requests
- FontAwesome – Icons for UI elements
- CSS Modules – Custom styles
- 

## How To Run

1. Clone the repo:
   ```sh
   git clone https://github.com/yourusername/weather-map-app.git
   cd weather-map-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
3. Start the app:
   ```sh
   npm start
   ```
   or
   ```sh
   yarn start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Keys
You need an API key from OpenWeatherMap.
1. Go to [OpenWeather](https://openweathermap.org/)
2. Sign up and get a free API key
3. Make a `.env` file in the project root and put:
   ```env
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

## Features
- Search for a city to see weather
- Click anywhere on the map to get weather
- Dark mode toggle
- Uses Leaflet for map rendering

## Assumptions & Development Decisions

- The app defaults to a world-centered map until a user selects a location.
- Weather data is fetched only when a new location is selected or searched.
- Clicking on the map updates the weather and marker position.
- Users can enable dark mode, affecting the map and UI.
- The OpenWeatherMap free tier is assumed for API usage.
- Error handling is included for API failures and invalid searches.
- The default location is set to [20, 0] (centered on the map) when the app loads.
- The map zooms to level 10 upon location selection.
