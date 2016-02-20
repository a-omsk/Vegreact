import React from 'react';
import MarkerList from './MarkerList';
import MapStore from '../stores/MapStores';
import MarkerStore from '../stores/MarkerStore';
import CityStore from '../stores/CityStore';
import MapService from '../MapService';
import MarkerService from '../MarkerService';

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: MarkerStore.allMarkers
        };

        this.onCityChange = ()  => {
            const city = CityStore.currentCity;

            if (city) {
                MarkerService.getMarkers(city);
            }
        };

        this.onChange = () => {
            this.setState({markers: MarkerStore.allMarkers});
        };
    }

    componentWillUnmount() {
        MarkerStore.removeListener("change", this.onChange);
    }

    componentWillMount() {
        if(DG.ready) {
            // Do nothing
        } else {
            MapService.initMap();
        }
    }

    componentDidMount() {
        MarkerStore.addListener("change", this.onChange);
        MapStore.addListener("change", this.onChange);
        CityStore.addListener("change", this.onCityChange);
    }

    render() {
        const mapStyle = {
            width: 100 + '%',
            height: 100 + '%'
        };

        return (
            <div style={mapStyle} id="map">
                <MarkerList list={this.state.markers} />
            </div>
        )
    }
};
