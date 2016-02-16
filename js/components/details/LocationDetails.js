import React, { PropTypes } from 'react';
import { findIndex, isNumber } from 'lodash';
import LocationStore from '../../stores/LocationStore';
import LocationService from '../../services/LocationService';
import DetailsContent from './DetailsContent';
import DetailsComments from './DetailsComments';

class LocationDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            group: LocationStore.getCurrentGroup(),
            selectedLocation: {},
            selectedComments: []
        };

        this.onLocationChange = () => {
            const group = LocationStore.getCurrentGroup();
            const selectedId = parseInt(this.props.location.query.id);
            const selectedIndex = findIndex(group.locations, loc => selectedId ? selectedId === loc.id : true);
            const selectedLocation = group.locations[selectedIndex];
            const selectedComments = selectedLocation.comments;

            this.setState({
                group: group,
                selectedLocation: selectedLocation,
                selectedComments: selectedComments
            });
        };
    }

    componentWillMount() {
        const id = parseInt(this.props.params.id, 10);

        if (id && isNumber(id)) {
            LocationService.getGroup(this.props.params.city, id);
        }
    }

    componentWillUnmount() {
        LocationStore.removeListener("locationSets", this.onLocationChange);
    }

    componentDidMount() {
        LocationStore.addListener("locationSets", this.onLocationChange);
    }

    render () {
        return (<div>
                   <DetailsContent location={this.state.selectedLocation} />
                   <DetailsComments comments={this.state.selectedComments}/>
               </div>)
    }
}

export default LocationDetails;
