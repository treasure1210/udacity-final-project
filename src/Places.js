import React, { Component } from 'react';
import './App.css';

class PlacesInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMarker: props.activeMarker,
            streetview: null,
            streeViewService: null,
        }
        this.google = props.google;
        this.div = props.children
        this.radius = 50;
    }

    getStreetView(data, status) {
        if (status === this.google.maps.StreetViewStatus.OK) {
            var nearStreetViewLocation = data.location.latLng;
            var heading = this.google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, this.state.activeMarker.location);
            var panoramaOptions = {
                position: nearStreetViewLocation,
                pov: {
                heading: heading,
                pitch: 30
                }
            };
            var panorama = new this.google.maps.StreetViewPanorama(document.getElementById('streetview'), panoramaOptions);
            return panorama;
        } else {
            return (
                <div>No street view found</div>
            )
        }
    }

    displayStreetView() {
        this.state.streetViewService.getPanoramaByLocation(this.state.activeMarker.location, this.radius, this.getStreetView.bind(this));
    }

    componentWillMount() {
        this.setState({
            activeMarker: {
                name: this.state.activeMarker.name,
                location: new this.google.maps.LatLng(this.state.activeMarker.location.lat, this.state.activeMarker.location.lng),
            },
            streetViewService: new this.google.maps.StreetViewService(),
        });
    }

    componentDidMount() {
        this.displayStreetView();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeMarker: {
                name: nextProps.activeMarker.name,
                location: new this.google.maps.LatLng(nextProps.activeMarker.location.lat, nextProps.activeMarker.location.lng),
            },
        })
        console.log(this.state.activeMarker);
        this.displayStreetView();
    }

    render() {
        return (
            <div>
                {this.state.activeMarker.name}
                <div id="streetview" style={{height: '200px'}}></div>
            </div>
        );
    }
}

export default PlacesInfoComponent;
