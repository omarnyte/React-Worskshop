import './App.css';

import React, { Component } from 'react';
import secrets from "./secrets";
import WeatherCard from "./WeatherCard";

const LOADING_STATUS = {
  ERROR: "error",
  IN_PROGRESS: "in-progress",
  SUCCESS: "success"
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingStatus: LOADING_STATUS.IN_PROGRESS,
      weatherData: null,
      zip: ""
    }

    this.Content = this.Content.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.fetchWeatherByBrowserPosition = this.fetchWeatherByBrowserPosition.bind(this);
    this.fetchWeatherByZip = this.fetchWeatherByZip.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.ZipInput = this.ZipInput.bind(this);
  }

  componentDidMount() {
    this.getWeatherInCurrentLocation();
  }

  render() {
    const { Content, ZipInput } = this;

    return (
      <div className="app">
        <header>
          <h1>Current Weather</h1>
        </header>
          <ZipInput />
          <Content />
      </div>
    );
  }

  ZipInput() {
    const { zip } = this.state;
    return (
      <div>
        <input onChange={this.handleChange} type="text" value={zip} />
        <button onClick={this.fetchWeatherByZip} type="button">Search</button>
      </div>
    )
  }

  Content() {
    const { loadingStatus } = this.state;

    if (loadingStatus === LOADING_STATUS.IN_PROGRESS) {
      return <div>Loading...</div>
    } else if (loadingStatus === LOADING_STATUS.ERROR) {
      return <div>Error Loading Data!</div>
    } else {
      return <WeatherCard weatherData={this.state.weatherData} />
    }
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
    this.setState({
      zip: ""
    })

    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},us&appid=${secrets.OPEN_WEATHER_MAP_KEY}`;
    this.fetchWeather(url);
  }

  fetchWeather(url) {
    fetch(url)
      .then(this.handleErrors)
      .then(jsonData => this.setState({
        loadingStatus: LOADING_STATUS.SUCCESS,
        weatherData: jsonData
      }))
      .catch(() => this.setState({
        loadingStatus: LOADING_STATUS.ERROR
      }));
  }

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

}

export default App;
