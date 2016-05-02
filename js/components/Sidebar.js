import React, { Component, PropTypes} from 'react';
import LocationList from 'containers/locations-list';
import CitiesList from 'containers/cities-list';
import WarningMessage from './WarningMessage';

const sidebarStyle = {
    position: 'fixed',
    display: 'inline-block',
    width: '300px',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
    overflow: 'auto'
};

export default class Sidebar extends Component {
    static propTypes = {
        children: PropTypes.element,
        sidebar: PropTypes.shape({
            isCityListShown: PropTypes.bool.isRequired
        }),
        city: PropTypes.shape({
            current: PropTypes.string.isRequired
        })
    }

    render() {
        const { isCityListShown } = this.props.sidebar;
        let content;

        if (isCityListShown) {
            content = <CitiesList />;
        } else {
            if (this.props.children) {
                content = this.props.children;
            } else {
                if (this.props.city.current) {
                    content = <LocationList />;
                } else {
                    const warningMsg = 'Вы находитесь за пределами ближайшего города';
                    content = <WarningMessage message={warningMsg} />;
                }
            }
        }

        return (
            <div style={sidebarStyle} className="sidebar">
                {content}
            </div>);
    }
}
