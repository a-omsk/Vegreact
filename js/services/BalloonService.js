import {render} from 'react-dom';
import React from 'react';
import BalloonContent from '../components/balloon/BalloonContent';

const BaloonService = {
    createContent(origin) {
        const div = document.createElement('div');
        render(<BalloonContent origin={origin || 'map'} />, div);
        return div;
    }
};

export default BaloonService;
