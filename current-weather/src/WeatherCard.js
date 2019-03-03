import React, { Component } from 'react';

class App extends Component {
  
  render() {
    const { weatherData } = this.props;
    
    return (
     <div>
       <h2>Current Temperature for {weatherData.name}</h2>
       <p>{this.kelvinToFahrenheit(weatherData.main.temp)}</p>
     </div> 
    );
  }

  kelvinToFahrenheit(kelvin) {
    return Math.floor((kelvin - 273.15) * 1.8 + 32)
  }
}

export default App;