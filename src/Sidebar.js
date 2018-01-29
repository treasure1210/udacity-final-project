import React, { Component } from 'react';
import './App.css';

class SidebarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: props.markers,
            filteredMarkers: props.markers
        }

        this.filterList = this.filterList.bind(this);
    }

    filterList(e) {
        let filteredMarkers = this.state.markers.filter(marker => 
            marker.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        this.setState({
            filteredMarkers: filteredMarkers
        });
        this.props.filter(filteredMarkers);
    }

    render() {
        return (
        <div className="Sidebar">
            <input type="text" onChange={this.filterList}/>
            {this.state.filteredMarkers.map(marker => (
                <li 
                key={marker.name}
                onClick={() => this.props.callback(marker)}
                >
                    {marker.name}
                </li>
            ))}
        </div>
        );
    }
}

export default SidebarComponent;
