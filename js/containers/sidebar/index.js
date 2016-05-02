import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as sidebarActions from 'actions/sidebar';
import Sidebar from 'Sidebar';

export class SidebarContainer extends Component {
    static propTypes = {
        actions: PropTypes.shape({
            toggleSidebar: PropTypes.func.isRequired
        })
    }

    render() {
        return <Sidebar {...this.props} />;
    }
}

const mapStateToProps = ({ sidebar, city }) => ({
    sidebar,
    city
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...sidebarActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
