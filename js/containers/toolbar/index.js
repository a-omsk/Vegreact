import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as sidebarActions from 'actions/sidebar';
import Toolbar from 'Toolbar';

export class ToolbarContainer extends Component {
    static propTypes = {
        actions: PropTypes.shape({
            toggleSidebar: PropTypes.func.isRequired
        })
    }

    render() {
        return <Toolbar {...this.props} />;
    }
}

const mapStateToProps = ({ sidebar }) => ({
    sidebar
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...sidebarActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarContainer);
