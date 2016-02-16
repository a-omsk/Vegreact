import React, { PropTypes } from 'react';
import { isNumber } from 'lodash';
import LocationStore from '../../stores/LocationStore';
import LocationService from '../../services/LocationService';

class LocationDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            location: LocationStore.getCurrentLocation() || {}
        }

        this.onLocationChange = () => {
            this.setState({
                location: LocationStore.getCurrentLocation()
            });
        }
    }

    componentWillMount() {
        const id = parseInt(this.props.params.id, 10);

        if (id && isNumber(id)) {
            LocationService.getLocation(this.props.params.city, id);
        }
    }

    componentWillUnmount() {
        LocationStore.removeListener("locationSets", this.onLocationChange);
    }

    componentDidMount() {
        LocationStore.addListener("locationSets", this.onLocationChange);
    }

    render () {
        return (<div>Hello</div>);
    }
}

export default LocationDetails;
