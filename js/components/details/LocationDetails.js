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
            group: LocationStore.currentGroup,
            selectedLocation: {},
            selectedComments: []
        };

        this.setLocation = () => {
            const group = LocationStore.currentGroup;
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
        const currentId = parseInt(this.props.params.id, 10);
        const {id} = LocationStore.currentGroup;

        if(currentId === id) {
            this.setLocation();
        } else {
            if (currentId && isNumber(currentId)) {
                LocationService.getGroup(this.props.params.city, currentId);
            }
        }
    }

    componentWillUnmount() {
        LocationStore.removeListener("locationSets", this.setLocation);
    }

    componentDidMount() {
        LocationStore.addListener("locationSets", this.setLocation);
    }

    render () {
        return (<div style={{overflow: 'auto'}}>
                   <DetailsContent location={this.state.selectedLocation} />
                   <DetailsComments comments={this.state.selectedComments}/>
               </div>)
    }
}

export default LocationDetails;
