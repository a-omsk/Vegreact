import React from 'react';

const WarningMessage = (props) => {

    return <div className="message-warning">
               <h3>{props.message}</h3>
           </div>
};

export default WarningMessage;
