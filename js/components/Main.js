import React from  'react';
import Map from './Map';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Map></Map>
            </div>
        )
    }
};
