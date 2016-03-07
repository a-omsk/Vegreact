import React from 'react';
import haversineFormula from '../../services/Haversine';

const Haversine = ({ originLat, originLng, targetLat, targetLng, style, units, helper = {} }) => {
    const distance = haversineFormula(originLat, originLng, targetLat, targetLng);
    const lessThanKm = distance <= 1;

    let result;

    if (units === 'auto') {
        result = distance * (lessThanKm ? 1000 : 1);
    } else {
        result = distance * ((units === 'm') ? 1000 : 1);
    }

    return (
        <div style={style}>
            { lessThanKm ? `${result} ${helper.m}` : `${result.toFixed(2)} ${helper.km}` }
        </div>
    );
};

Haversine.propTypes = {
    helper: React.PropTypes.object,
    style: React.PropTypes.object,
    units: React.PropTypes.string,
    originLat: React.PropTypes.number.isRequired,
    originLng: React.PropTypes.number.isRequired,
    targetLat: React.PropTypes.number.isRequired,
    targetLng: React.PropTypes.number.isRequired,
};

export default Haversine;
