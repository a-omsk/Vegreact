import React, { PropTypes } from 'react';
import { findIndex, isNumber, isUndefined } from 'lodash';
import LocationStore from '../../stores/LocationStore';
import LocationService from '../../services/LocationService';
import DetailsContent from './DetailsContent';
import DetailsComments from './DetailsComments';

class LocationDetails extends React.Component {

    constructor(props) {
        super(props);
        const self = this;

        const locationGenerator = function* (reverse) {
            const locations = self.state.group.locations;
            let index = locations.indexOf(self.state.selectedLocation);

            while(true) {
                if(reverse) {
                    yield isUndefined(locations[index - 1]) ? locations.length - 1 : index - 1;
                } else {
                    yield isUndefined(locations[index + 1]) ? 0 : index + 1;
                }
            }
        };

        this.state = {
            group: LocationStore.currentGroup,
            selectedLocation: {},
            selectedComments: []
        };

        this.locationGenerator = (reverse) => {
            const generator = locationGenerator(reverse);
            return () => {
                const index = generator.next().value;
                const newLocation = this.state.group.locations[index];

                this.setState({
                    selectedLocation: newLocation,
                    selectedComments: newLocation.comments
                });
            };
        };

        this.setLocation = () => {
            const group = LocationStore.currentGroup;
            const selectedId = parseInt(this.props.location.query.id);
            const selectedIndex = findIndex(group.locations, loc => selectedId ? selectedId === loc.id : true);
            const selectedLocation = group.locations[selectedIndex];

            this.setState({
                group: group,
                selectedLocation: selectedLocation,
                selectedComments: selectedLocation.comments
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
        const hasManyLocations = this.state.group.locations && this.state.group.locations.length > 1;

        return (<div style={{overflow: 'auto'}}>
                   <DetailsContent next={this.locationGenerator().bind(this)}
                                   prev={this.locationGenerator(true).bind(this)}
                                   hasManyLocations={hasManyLocations}
                                   location={this.state.selectedLocation} />
                   <DetailsComments comments={this.state.selectedComments}/>
               </div>)
    }
}

export default LocationDetails;
