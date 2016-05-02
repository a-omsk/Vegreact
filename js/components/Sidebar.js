import React from 'react';
import LocationStore from '../stores/LocationStore';
import MarkerStore from '../stores/MarkerStore';
import MapStore from '../stores/MapStores';
import LocationService from '../services/LocationService';
import MapService from '../MapService';
import MarkerService from '../MarkerService';
import LocationList from 'containers/locations-list';
import NoLocations from './NoLocations';
import CitiesList from 'containers/cities-list';
import WarningMessage from './WarningMessage';
import CityStore from '../stores/CityStore';
import SidebarStore from '../stores/SidebarStore';
import isEmpty from 'lodash/isEmpty';

const sidebarStyle = {
    position: 'fixed',
    display: 'inline-block',
    width: '300px',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
    overflow: 'auto'
};

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinates: MapStore.location,
            locations: LocationStore.locations,
            city: CityStore.currentCity,
            cities: CityStore.citiesList,
            cityView: SidebarStore.viewState
        };

        this.switchCity = (city) => () => MapService.switchCity(city);
        this.onChange = () => this.setState({ locations: LocationStore.locations });
        this.onViewChange = () => this.setState({ cityView: SidebarStore.viewState });

        this.onLocationChange = () => {
            const coordinates = MapStore.location;
            const isMarkersLoaded = MarkerStore.loaded;

            if (coordinates && isMarkersLoaded) {
                this.setState({ locations: LocationStore.locations, coordinates });
            }
        };

        this.onCityChange = () => {
            const city = CityStore.currentCity;

            if (city) {
                LocationService.getLocations(city);
            } else {
                MarkerService.removeMarkers();
            }

            this.setState({ city });

            if (isEmpty(this.state.cities) && CityStore.citiesList.length) {
                this.setState({ cities: CityStore.citiesList });
            }
        };

        this.handleScrolling = ({ nativeEvent }) => {
            if (LocationStore.canLoadMore) {
                const maxScroll = nativeEvent.srcElement.firstChild.scrollHeight;
                const initialHeight = maxScroll - window.innerHeight;
                const currentScrollHeight = nativeEvent.srcElement.scrollTop;

                if (currentScrollHeight >= initialHeight && !LocationStore.isBlocked) {
                    const targetPage = LocationStore.currentPage + 1;
                    LocationService.getLocations(CityStore.currentCity, targetPage);
                }
            }
        };
    }

    componentWillMount() {
        LocationStore.addListener('change', this.onChange);
        MarkerStore.addListener('markersLoaded', this.onLocationChange);
        MapStore.addListener('newGeolocation', this.onLocationChange);
        CityStore.addListener('change', this.onCityChange);
        SidebarStore.addListener('change', this.onViewChange);
    }

    componentWillUnmount() {
        LocationStore.removeListener('change', this.onChange);
        MarkerStore.removeListener('markersLoaded', this.onLocationChange);
        MapStore.removeListener('newGeolocation', this.onLocationChange);
        CityStore.removeListener('change', this.onCityChange);
        SidebarStore.removeListener('change', this.onViewChange);
    }

    render() {
        let content;
        let isLocationList;

        if (this.state.cityView) {
            content = (
                <CitiesList
                  switchCity={this.switchCity.bind(this)}
                  list={this.state.cities}
                />);
        } else {
            if (this.props.children) {
                content = this.props.children;
            } else {
                if (this.state.city) {
                    content = this.state.locations.length ?
                        <LocationList coordinates={this.state.coordinates} /> : <NoLocations />;
                    isLocationList = true;
                } else {
                    const warningMsg = 'Вы находитесь за пределами ближайшего города';
                    content = <WarningMessage message={warningMsg} />;
                }
            }
        }

        return (
            <div onScroll={isLocationList ? this.handleScrolling.bind(this) : ''}
              style={sidebarStyle}
              className="sidebar"
            >
            {content}
            </div>);
    }
}
