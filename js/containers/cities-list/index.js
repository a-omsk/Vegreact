import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchCitiesList, switchCity } from 'actions/cities';
import { toggleSidebar } from 'actions/sidebar';

import CitiesList from 'CitiesList';

export class LocationsListContainer extends Component {
    static propTypes = {
        actions: PropTypes.shape({
            fetchCitiesList: PropTypes.func.isRequired,
            switchCity: PropTypes.func.isRequired
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

    handleSwitch(code) {
        const { actions } = this.props;

        actions.switchCity(code);
        actions.toggleSidebar();
    }

    render() {
        return <CitiesList switchCity={this.handleSwitch.bind(this)} list={this.props.city.list} />;
    }
}

const mapStateToProps = ({ city }) => ({
    city
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        toggleSidebar,
        fetchCitiesList,
        switchCity
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationsListContainer);
