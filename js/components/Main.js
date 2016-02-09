import React from  'react';
import Map from './Map';
import Sidebar from './Sidebar';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Sidebar></Sidebar>
                <Map></Map>
            </div>
        )
    }
};
