import React from 'react';
import LocationStore from '../stores/LocationStore';
import LocationService from '../LocationService';
import MarkerService from '../MarkerService';
import LocationList from './LocationList';
import WarningMessage from './WarningMessage';
import CityStore from '../stores/CityStore';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: LocationStore.getLocations()
        };

        this._onCityChange = () => {
            let city = CityStore.getCurrentCity();

            if (city) {
                LocationService.getLocations(CityStore.getCurrentCity());
            } else {
                MarkerService.removeMarkers();
            }
        }

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
        CityStore.addListener("change", this._onCityChange);
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

        let content;

        if (CityStore.getCurrentCity()) {
            content = <LocationList list={this.state.locations}></LocationList>
        } else {
            content = <WarningMessage message="Вы находитесь за пределами города" />
        }

        return (
            <div style={sidebarStyle} className="sidebar" >
                {content}
            </div>)
    }
};
