import React from 'react';

const DetailsContent = ({ location, hasManyLocations, prev, next }) => {
    const displayStyle = {
        display: hasManyLocations ? null : 'none',
    };

    let content;

    if (Object.keys(location).length) {
        content = (
            <div style={{ paddingLeft: 15 }} className="location-details-container">
                <div className="location-details-name">
                    <div className="location-details__name">
                        <span className="location-arrow" onClick={prev} style={displayStyle}>{'<'}</span>
                        <h1 className="location-details__name__title">{location.name}</h1>
                        <span className="location-arrow" onClick={next} style={displayStyle}>{'>'}</span>
                    </div>
                    <h2>{location.address}</h2>
                </div>

                <div className="location-details-type">
                    <h4 className="location-type">Тип заведения:</h4>
                    <p>{location.type}</p>
                </div>

                <div className="location-details-time">
                    <h4 className="location-time">Время работы:</h4>
                    <p>{location.business_time}</p>
                </div>

                <div className="location-specification">
                    <h4 className="location-specification">Представлена кухня:</h4>
                    <p>{location.specification}</p>
                </div>

                <div className="location-details-desc">
                    <h4 className="location-name">В меню:</h4>
                    <p>{location.description}</p>
                </div>
            </div>);
    } else {
        content = <div />;
    }

    return content;
};

DetailsContent.propTypes = {
    location: React.PropTypes.object.isRequired,
    hasManyLocations: React.PropTypes.bool.isRequired,
    prev: React.PropTypes.func.isRequired,
    next: React.PropTypes.func.isRequired,
};

export default DetailsContent;
