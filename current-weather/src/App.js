import React, { Component } from 'react';
import secrets from "./secrets";
import WeatherCard from "./WeatherCard";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: null,
      zip: ""
    }

    this.fetchWeather = this.fetchWeather.bind(this);
    this.fetchWeatherByBrowserPosition = this.fetchWeatherByBrowserPosition.bind(this);
    this.fetchWeatherByZip = this.fetchWeatherByZip.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getWeatherInCurrentLocation();
  }
  
  render() {
    const { weatherData, zip } = this.state;
    if (!weatherData) {
      return <div>LOADING...</div>
    }

    return (
      <div>
        <header>
          <h1>Current Weather</h1>

          <div>
            <input onChange={this.handleChange} type="text" value={zip}/>
            <button onClick={this.fetchWeatherByZip} type="button">Search</button>
          </div>

          <WeatherCard weatherData={this.state.weatherData} />
        </header>

      </div>
    );
  }

  handleChange(e) {
    this.setState({
      zip: e.target.value
    })
  }

  getWeatherInCurrentLocation() {
    navigator.geolocation.getCurrentPosition(this.fetchWeatherByBrowserPosition);
  }

  fetchWeatherByBrowserPosition(position) {
    const { latitude, longitude } = position.coords;

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${secrets.OPEN_WEATHER_MAP_KEY}`;
    this.fetchWeather(url);
  }

  fetchWeatherByZip() {
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},us&appid=${secrets.OPEN_WEATHER_MAP_KEY}`;
    this.fetchWeather(url);
  }

  fetchWeather(url) {
    fetch(url)
      .then(response => response.json())
      .then(jsonData => this.setState({
        weatherData: jsonData
      })); 
  }

}

export default App;
