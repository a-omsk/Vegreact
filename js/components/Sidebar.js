import React from 'react';
import LocationStore from '../stores/LocationStore';
import LocationService from '../LocationService';
import MarkerService from '../MarkerService';
import LocationList from './LocationList';
import CitiesList from './CitiesList';
import WarningMessage from './WarningMessage';
import CityStore from '../stores/CityStore';
import SidebarStore from '../stores/SidebarStore';
import CityService from '../CityService';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: LocationStore.getLocations(),
            cities: CityStore.getCitiesList(),
            cityView: SidebarStore.getViewState()
        };

        this.onCityChange = () => {
            let city = CityStore.getCurrentCity();

            if (city) {
                LocationService.getLocations(CityStore.getCurrentCity());
            } else {
                MarkerService.removeMarkers();
            }
        }

        this.onChange = () => {
            this.setState({locations: LocationStore.getLocations()});
        };

        this.onViewChange = () => {
            this.setState({cityView: SidebarStore.getViewState()});
        }
    }

    componentWillUnmount() {
        LocationStore.removeListener("change", this.onChange);
    }

    componentWillMount() {
        LocationService.getLocations(CityStore.getCurrentCity());
        CityService.fetchCitiesList();

        LocationStore.addListener("change", this.onChange);
        CityStore.addListener("change", this.onCityChange);
        SidebarStore.addListener("change", this.onViewChange);
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

        if (this.state.cityView) {
            content  = <CitiesList list={this.state.cities} />
        } else {
            if (CityStore.getCurrentCity()) {
                content = <LocationList list={this.state.locations} />
            } else {
                content = <WarningMessage message="Вы находитесь за пределами ближайшего города" />
            }
        }

        return (
            <div style={sidebarStyle} className="sidebar" >
                {content}
            </div>)
    }
};
