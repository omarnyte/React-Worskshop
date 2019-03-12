import './WeatherCard.css';
import React, { Component } from 'react';
var moment = require('moment');
moment().format();

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      tempComparison: null
    }
  }

  shouldComponentUpdate(nextProps) {
    const currentCity = this.props.weatherData.name;
    const nextCity = nextProps.weatherData.name;
    return currentCity !== nextCity;
  }

  render() {
    const { weatherData } = this.props;

    return (
     <div className="weather-card">
       <h2>Current Temperature for {weatherData.name}</h2>
       <p>{this.kelvinToFahrenheit(weatherData.main.temp)}&#8457;</p>
       <p>As of {this.formatLocalTime()}</p>
     </div> 
    );
  }

  formatLocalTime() {
    var localTime  = moment.utc().toDate();
    return moment(localTime).format('YYYY-MM-DD HH:mm:ss');
  }

  kelvinToFahrenheit(kelvin) {
    return Math.floor((kelvin - 273.15) * 1.8 + 32)
  }
}

export default App;