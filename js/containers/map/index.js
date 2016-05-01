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

    componentWillMount() {
        if (DG.ready) {
            // Do nothing
        } else {
            MapService.initMap();
        }

        this.props.actions.fetchMarkers('novosibirsk');
    }

    render() {
        return <Map {...this.props} />;
    }
}

const mapStateToProps = ({ map, markers }) => ({
    map,
    markers
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...markerActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
