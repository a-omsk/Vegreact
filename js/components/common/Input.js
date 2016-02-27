import React, { PropTypes } from 'react';

const Input = ({inputType, name, placeholder, onChange, value, error}) => {
    let wrapperClass = 'form-group';

    const properties = {
        type: inputType || 'text',
        name: name,
        className: 'form-control',
        placeholder: placeholder,
        onChange: onChange,
        value: value
    };

    if(error && error.length) {
        wrapperClass += ' ' + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <div className='field'>
                {inputType === 'textarea' ? <textarea {...properties} /> : <input {...properties} />}
                <div className='input'>{error}</div>
            </div>
        </div>
    );
};

Input.propTypes = {
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    inputType: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string
};

export default Input;
