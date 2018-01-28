import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import MarkerWithInfowindow from './MarkerWithInfowindow';
import React from 'react'

export const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => {
    this.state = {
        markers: [
            {
                name: 'Civic Center Park',
                location: {lat: 39.739319, lng: -104.988937},
            },
            {
                name: 'Voodoo Donuts Mile High',
                location: {lat: 39.7399, lng: -104.9692},
            },
            {
                name: 'Denver Art Museum',
                location: {lat: 39.7372, lng: -104.9893},
            },
            {
                name: 'Great Divide Brewing',
                location: {lat: 39.7538, lng: -104.9885},
            },
            {
                name: '16th Street Mall',
                location: {lat: 39.7478, lng: -104.9949},
            }
        ],
    }
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{
                lat: 39.745,
                lng: -104.983
            }}
        >
        {this.state.markers.map(marker => (
            <MarkerWithInfowindow
                key={marker.name}
                marker={marker}
            />
        ))}
        </GoogleMap>
    )
})