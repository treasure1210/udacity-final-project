import { compose, withProps, withStateHandlers } from "recompose"
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import React from 'react'
import PlacesInfoComponent from './Places'
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
                id: "civic-center-park-denver"
            },
            {
                name: 'Voodoo Donuts Mile High',
                location: {lat: 39.7399, lng: -104.9692},
                id: "voodoo-doughnut-denver"
            },
            {
                name: 'Denver Art Museum',
                location: {lat: 39.7372, lng: -104.9893},
                id: "denver-art-museum-denver-2"
            },
            {
                name: 'Great Divide Brewing',
                location: {lat: 39.7538, lng: -104.9885},
                id: "great-divide-brewing-company-denver"
            },
            {
                name: '16th Street Mall',
                location: {lat: 39.7478, lng: -104.9949},
                id: "16th-street-mall-denver-3"
            }
        ],
        markerOpen: false
        }), {
        onToggleOpen: ({ activeMarker }) => (marker) => ({
            activeMarker: marker,
        }),
        filterList: ({filteredMarkers, activeMarker}) => markers => ({
            filteredMarkers: markers,
            activeMarker: null,
        }),
        setMarkerOpen: ({markerOpen}) => () => ({
            markerOpen: !markerOpen
        })
    }),
    withGoogleMap
)((props) => {
    const google = props.google;

    

    const clickList = marker => {
        if (props.markerOpen === false) {
            props.onToggleOpen(marker);
            props.setMarkerOpen();
        } else {
            props.onToggleOpen(null);
            props.setMarkerOpen();
        }
    } 

    return (
        <div className="Map">
            <SidebarComponent
                markers={props.filteredMarkers}
                callback={clickList}
                filter={props.filterList}
                markerOpen={props.markerOpen}
                setMarkerOpen={props.setMarkerOpen}
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
                            if(props.markerOpen === false) {
                                props.onToggleOpen(marker);
                                props.setMarkerOpen();
                            }
                        }}
                    ></Marker>
                ))}
                {props.activeMarker && <InfoWindow
                    position={props.activeMarker.location}
                    options={{pixelOffset: new google.maps.Size(0, -35)}}
                    onCloseClick={() => {
                        props.onToggleOpen(null);
                        props.setMarkerOpen();
                    }}
                >
                    <PlacesInfoComponent
                        activeMarker={props.activeMarker}
                        google={google}
                    />
                </InfoWindow>}
            </GoogleMap>
        </div>
    )
})