import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as markerActions from 'actions/markers';
import Map from 'Map';
import MapService from 'MapService';

export class MapContainer extends Component {
    static propTypes = {
        actions: PropTypes.shape({
            fetchMarkers: PropTypes.func.isRequired
        })
    }

    componentWillReceiveProps(nextProps) {
        const { current: currentCity } = nextProps.city;
        const { isLoading, loaded } = nextProps.markers;

        if (currentCity && !isLoading && !loaded) {
            this.props.actions.fetchMarkers(currentCity);
        }
    }

    componentWillMount() {
        MapService.initMap();
    }

    render() {
        return <Map {...this.props} />;
    }
}

const mapStateToProps = ({ city, markers }) => ({
    city,
    markers
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...markerActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
