import React from 'react';

const CityButton = ({ city, actions }) => (
    <div onClick={actions.toggleSidebar} className="btn btn-default">
        <span>Ваш город: <b>{ city && city.name ? city.name : 'Не выбран'}</b></span>
    </div>
);

CityButton.propTypes = {
    city: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
};

export default CityButton;
