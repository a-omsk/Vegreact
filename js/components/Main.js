import React from  'react';
import Map from './Map';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                {this.props.children}
                <Toolbar />
                <Map />
            </div>
        )
    }
};
