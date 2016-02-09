import React from 'react';
import LocationStore from '../stores/LocationStore';
import LocationService from '../LocationService';
import LocationList from './LocationList';
import CityStore from '../stores/CityStore';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: LocationStore.getLocations()
        };

        this._onChange = () => {
            this.setState({locations: LocationStore.getLocations()});
        };
    }

    componentWillUnmount() {
        LocationStore.removeListener("change", this._onChange);
    }

    componentWillMount() {
        LocationService.getLocations(CityStore.getCurrentCity());
        LocationStore.addListener("change", this._onChange);
        CityStore.addListener("change", this._onChange);
    }

    render() {
        const sidebarStyle = {
            position: 'fixed',
            display: 'inline-block',
            width: 300 + 'px',
            height: 100 + '%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 10
        };

        return (
            <div style={sidebarStyle} className="sidebar" >
                <LocationList list={this.state.locations}></LocationList>
            </div>)
    }
};
