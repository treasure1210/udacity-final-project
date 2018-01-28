import React, { Component } from 'react';
import {MyMapComponent} from './Map'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyMapComponent 
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAN1YV5D2JI8euHNDkHk1YWsEIEXFDKCbQ"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;
