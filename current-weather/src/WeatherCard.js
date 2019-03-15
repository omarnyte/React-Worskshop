import './WeatherCard.css';
import React, { Component } from 'react';
var moment = require('moment');
moment().format();

class WeatherCard extends Component {
  
  render() {
    const { weatherData } = this.props;
    return (
     <div className="weather-card">
       <h2>Current Temperature for {weatherData.name}</h2>
       <p>{this.kelvinToFahrenheit(weatherData.main.temp)}</p>
       <p>As of {this.formatLocalTime()}</p>
     </div> 
    );
  }

  renderTemperature(kelvin) {
    return (this.props.showCelcius) ? this.kelvinToCelsius(kelvin) : this.kelvinToFahrenheit(kelvin); 
  }

  kelvinToCelsius(kelvin) {
    return `${Math.floor(kelvin - 273.15)}°C`;
  }
  
  kelvinToFahrenheit(kelvin) {
    return `${Math.floor((kelvin - 273.15) * 1.8 + 32)}°F`;
  }

  formatLocalTime() {
    var localTime  = moment.utc().toDate();
    return moment(localTime).format('YYYY-MM-DD HH:mm:ss');
  }

}

export default WeatherCard;