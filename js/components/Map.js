import React from 'react';
import MapStore from '../stores/MapStores';
import MarkerStore from '../stores/MarkerStore';
import MapService from '../MapService';
import MarkerService from '../MarkerService';
import MarkerList from './MarkerList';

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: MarkerStore.getAllMarkers()
        };

        this._onChange = () => {
            this.setState({markers: MarkerStore.getAllMarkers()});
        };
    }

    componentWillUnmount() {
        MarkerStore.removeListener("change", this._onChange);
    }

    componentWillMount() {
        MarkerService.getMarkers('omsk');
        MapService.initMap();
    }

    componentDidMount() {
        MarkerStore.addListener("change", this._onChange);
        MapStore.addListener("change", this._onChange);
    }

    render() {
        const mapStyle = {
            width: 100 + '%',
            height: 100 + '%'
        };

        return (
            <div style={mapStyle} id="map">
                <MarkerList list={this.state.markers}></MarkerList>
            </div>
        )
    }
};
