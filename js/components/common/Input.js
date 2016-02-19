import React, { PropTypes } from 'react';

const Input = (props) => {
    let wrapperClass = 'form-group';

    const properties = {
        type: props.inputType || 'text',
        name: props.name,
        className: 'form-control',
        placeholder: props.placeholder,
        onChange: props.onChange,
        value: props.value
    };

    if(props.error && props.error.length) {
        wrapperClass += ' ' + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <div className='field'>
                {props.inputType === 'textarea' ? <textarea {...properties} /> : <input {...properties} />}
                <div className='input'>{props.error}</div>
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
