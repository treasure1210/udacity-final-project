import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class MarkerWithInfowindow extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.marker);
        this.state = {
            marker: this.props.marker,
            isOpen: false,
        }
        this.toggleOpen = this.toggleOpen.bind(this);
        this.toggleClose = this.toggleClose.bind(this);
    }

    toggleOpen() {
        this.setState({
            isOpen: true
        });
    }

    toggleClose() {
        this.setState({
            isOpen: false
        });
    }

    render() {
        return (
            <Marker
                position={this.state.marker.location}
                onClick={this.toggleOpen}
            >
                {this.state.isOpen && <InfoWindow
                    onCloseClick={this.toggleClose}
                >
                    <div>{this.state.marker.name}</div>
                </InfoWindow>}
            </Marker>
        );
    }
}

export default MarkerWithInfowindow;
