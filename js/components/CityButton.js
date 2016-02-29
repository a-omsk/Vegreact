import React from 'react';
import SidebarActions from '../actions/SidebarActions';

const CityButton = ({ city }) => {

    const handleClick = (e) => {
        e.preventDefault();
        SidebarActions.toggleCityList();
    };

    return (
        <div onClick={handleClick} className="btn btn-default">
            <span>Ваш город: <b>{ city && city.name ? city.name : 'Не выбран'}</b></span>
        </div>
    );
};

CityButton.propTypes = {
    city: React.PropTypes.object.isRequired,
};

export default CityButton;
