import React from 'react';
import MarkerList from './MarkerList';
import MapStore from '../stores/MapStores';
import MarkerStore from '../stores/MarkerStore';
import MapService from '../MapService';
import MarkerService from '../MarkerService';

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
        if(DG.ready) {
            // Do nothing
        } else {
            MapService.initMap();
        }

        MarkerService.getMarkers('omsk');
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
