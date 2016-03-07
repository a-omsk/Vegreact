import React from 'react';

const WarningMessage = ({ message }) => (
    <div className="message-warning">
        <h3>{message}</h3>
    </div>
);

WarningMessage.propTypes = {
    message: React.PropTypes.string.isRequired,
};

export default WarningMessage;
