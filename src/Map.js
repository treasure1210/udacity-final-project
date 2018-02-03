import { compose, withProps, withStateHandlers } from "recompose"
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import React from 'react'
import PlacesInfoComponent from './Places'
import SidebarComponent from './Sidebar'
import HeaderComponent from './Header'

//set up Map with React-Google-Maps npm package
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
                position: {lat: 39.739319, lng: -104.988937},
            },
            {
                name: 'Voodoo Donuts Mile High',
                position: {lat: 39.7399, lng: -104.9692},
            },
            {
                name: 'Denver Art Museum',
                position: {lat: 39.7372, lng: -104.9893},
            },
            {
                name: 'Great Divide Brewing',
                position: {lat: 39.7538, lng: -104.9885},
            },
            {
                name: '16th Street Mall',
                position: {lat: 39.7478, lng: -104.9949},
            }
        ],
        animations: [
            {'Civic Center Park': null},
            {'Voodoo Donuts Mile High': null},
            {'Denver Art Museum': null},
            {'Great Divide Brewing': null},
            {'16th Street Mall': null},
        ],
        markerOpen: false,
        sidebarVisible: false,
        }), {
        onToggleOpen: ({ activeMarker }) => (marker, google) => {
            if (marker) {
                return {activeMarker: new google.maps.Marker({name: marker.name, position: marker.position})};
            } else {
                return {activeMarker: null};
            }
        },
        filterList: ({filteredMarkers, activeMarker}) => markers => ({
            filteredMarkers: markers,
            activeMarker: null,
        }),
        setMarkerOpen: ({markerOpen}) => () => ({
            markerOpen: !markerOpen
        }),
        setSidebar: ({sidebarVisible}) => () => ({
            sidebarVisible: !sidebarVisible,
        }),
        //add bounce effect when marker is clicked from map
        setAnimationInfowindow: ({animations, markerOpen}) => (marker, google) => {
            if(!markerOpen) {
                animations[`${marker.name}`] = google.maps.Animation.BOUNCE;
            }
            return {animations}
        },
        //add bounce effect when marker is clicked from list
        setAnimationClicklist: ({animations, markerOpen}) => (marker, google) => {
            animations[`${marker.name}`] = google.maps.Animation.BOUNCE;
            return {animations}
        },
        //remove bounce effect when marker is not selected
        removeAnimations: ({animations}) => () => ({
            animations: [
                {'Civic Center Park': null},
                {'Voodoo Donuts Mile High': null},
                {'Denver Art Museum': null},
                {'Great Divide Brewing': null},
                {'16th Street Mall': null},
            ],
        }),
    }),
    withGoogleMap
)((props) => {
    const google = props.google;

    //select marker using list
    const clickList = marker => {
        if (props.markerOpen === false) {
            props.onToggleOpen(marker, google);
            props.setMarkerOpen();
            props.setAnimationClicklist(marker, google);
        } else {
            props.onToggleOpen(null);
            props.removeAnimations();
            props.setMarkerOpen();
        }
    }

    return (
        <div className="Map">
            <HeaderComponent
                callback={props.setSidebar}
            />
            {props.sidebarVisible && <SidebarComponent
                markers={props.filteredMarkers}
                callback={clickList}
                filter={props.filterList}
                markerOpen={props.markerOpen}
                setMarkerOpen={props.setMarkerOpen}
            />}
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{
                    lat: 39.759,
                    lng: -104.983
                }}
            >
                {props.filteredMarkers.map(marker => (
                    <Marker
                        key={marker.name}
                        position={marker.position}
                        onClick={() => {
                            if(props.markerOpen === false) {
                                props.onToggleOpen(marker, google);
                                props.setAnimationInfowindow(marker, google);
                                props.setMarkerOpen();
                            }
                        }}
                        animation={props.animations[`${marker.name}`]}
                    ></Marker>
                ))}
                {props.activeMarker && <InfoWindow
                    position={props.activeMarker.position}
                    options={{pixelOffset: new google.maps.Size(0, -35)}}
                    onCloseClick={() => {
                        props.onToggleOpen(null);
                        props.removeAnimations();
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