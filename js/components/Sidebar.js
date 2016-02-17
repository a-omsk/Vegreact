import React from 'react';
import LocationStore from '../stores/LocationStore';
import LocationService from '../services/LocationService';
import MarkerService from '../MarkerService';
import LocationList from './LocationList';
import CitiesList from './CitiesList';
import WarningMessage from './WarningMessage';
import CityStore from '../stores/CityStore';
import SidebarStore from '../stores/SidebarStore';
import CityService from '../CityService';
import {isEmpty} from 'lodash'

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

            if (isEmpty(this.state.cities) && CityStore.getCitiesList().length) {
                this.setState({cities: CityStore.getCitiesList()});
            }
        }

        this.onChange = () => {
            this.setState({locations: LocationStore.getLocations()});
        };

        this.onViewChange = () => {
            this.setState({cityView: SidebarStore.getViewState()});
        }

        this.handleScrolling = (e) => {
            if (LocationStore.canLoadMore()) {
                const initialHeight = e.nativeEvent.srcElement.firstChild.scrollHeight - window.innerHeight;
                const currentScrollHeight = e.nativeEvent.srcElement.scrollTop;

                if (currentScrollHeight >= initialHeight && !LocationStore.isBlocked()) {
                    const city = CityStore.getCurrentCity();
                    const targetPage = LocationStore.getCurrentPage() + 1;

                    LocationService.getLocations(city, targetPage);
                }
            }
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
            zIndex: 10,
            overflow: 'auto'
        };

        let content;
        let isLocationList;

        if (this.state.cityView) {
            content  = <CitiesList list={this.state.cities} />
        } else {
            if (this.props.children) {
                content = this.props.children;
            } else {
                if (CityStore.getCurrentCity()) {
                    content = <LocationList list={this.state.locations} />
                    isLocationList = true;
                } else {
                    content = <WarningMessage message="Вы находитесь за пределами ближайшего города" />
                }
            }
        }

        return (
            <div onScroll={isLocationList ? this.handleScrolling.bind(this) : ''}  style={sidebarStyle} className="sidebar" >
                {content}
            </div>)
    }
};
