import React, { PropTypes } from 'react';
import SidebarActions from '../actions/SidebarActions';

const CityButton = (props) => {

    const handleClick = (e) => {
        e.preventDefault();
        SidebarActions.toggleCityList();
    };

    return (
        <div onClick={handleClick} className="btn btn-default">
            <span>Ваш город: <b>{ props.city && props.city.name ? props.city.name : 'Не выбран'}</b></span>
        </div>
    )
};

export default CityButton
