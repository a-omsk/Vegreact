import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as citiesActions from 'actions/cities';
import CitiesList from 'CitiesList';

export class LocationsListContainer extends Component {
    static propTypes = {
        actions: PropTypes.shape({
            fetchCitiesList: PropTypes.func.isRequired
        })
    }
    
    shouldComponentUpdate() {
        return !this.props.city.loaded;
    }

    componentWillMount() {
        if (!this.props.city.loaded) {
            this.props.actions.fetchCitiesList();
        }
    }

    render() {
        return <CitiesList switchCity={() => true} list={this.props.city.list} />;
    }
}

const mapStateToProps = ({ city }) => ({
    city
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...citiesActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationsListContainer);
