import React from 'react';

const Input = ({ inputType, name, placeholder, onChange, value, error, addOn }) => {
    let wrapperClass = 'form-group';

    const properties = {
        type: inputType || 'text',
        className: 'form-control',
        name,
        placeholder,
        onChange,
        value,
    };

    if (error && error.length) { wrapperClass += ' ' + 'has-error'; }

    return (
        <div className={wrapperClass}>
            <div className={`field ${addOn && 'input-group'}`}>
                {inputType === 'textarea' ?
                    <textarea {...properties} /> :
                    <input {...properties} />}

                {inputType === 'text' && addOn ? <span className="input-group-addon">{addOn}</span> : null}
            </div>
            <div className="input">{error}</div>
        </div>
    );
};

Input.propTypes = {
    addOn: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    inputType: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string,
};

export default Input;
