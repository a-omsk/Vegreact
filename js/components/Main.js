import React from 'react';
import Map from 'containers/map';
import Toolbar from './Toolbar';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
                <Toolbar />
                <Map />
            </div>
        );
    }
}
