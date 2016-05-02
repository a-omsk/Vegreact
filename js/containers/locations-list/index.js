import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as locationsActions from 'actions/locations';
import LocationList from 'LocationList';

export class LocationsListContainer extends Component {
    static propTypes = {
        actions: PropTypes.shape({
            fetchLocations: PropTypes.func.isRequired
        })
    }

    componentWillMount() {
        const { city, actions } = this.props;

        if (city.current) {
            actions.fetchLocations(city.current);
        }
    }

    render() {
        const { geo, locations } = this.props;
        
        return <LocationList coordinates={geo.userCoordinates} list={locations.list} />;
    }
}

const mapStateToProps = ({ geo, city, locations }) => ({
    geo,
    city,
    locations
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...locationsActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationsListContainer);
