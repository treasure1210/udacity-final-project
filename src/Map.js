import { compose, withProps, withStateHandlers } from "recompose"
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import React from 'react'
import SidebarComponent from './Sidebar'

export const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAN1YV5D2JI8euHNDkHk1YWsEIEXFDKCbQ",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        google: window.google,
    }),
    withStateHandlers(() => ({
        activeMarker: null,
        filteredMarkers: [
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
        }), {
        onToggleOpen: ({ activeMarker }) => (marker) => ({
            activeMarker: marker,
        }),
        filterList: ({filteredMarkers, activeMarker}) => markers => ({
            filteredMarkers: markers,
            activeMarker: null,
        })
    }),
    withGoogleMap
)((props) => {
    const google = props.google;


    const clickList = marker => {
        props.onToggleOpen(marker);
    } 

    return (
        <div className="Map">
            <SidebarComponent
                markers={props.filteredMarkers}
                callback={clickList}
                filter={props.filterList}
            />
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{
                    lat: 39.745,
                    lng: -104.983
                }}
            >
                {props.filteredMarkers.map(marker => (
                    <Marker
                        key={marker.name}
                        position={marker.location}
                        onClick={() => {
                            props.onToggleOpen(marker);
                        }}
                    ></Marker>
                ))}
                {props.activeMarker && <InfoWindow
                    position={props.activeMarker.location}
                    options={{pixelOffset: new google.maps.Size(0, -35)}}
                    onCloseClick={() => props.onToggleOpen(null)}
                >
                    <div>{props.activeMarker.name}</div>
                </InfoWindow>}
            </GoogleMap>
        </div>
    )
})