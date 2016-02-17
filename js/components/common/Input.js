import React, { PropTypes } from 'react';

const Input = (props) => {
    let wrapperClass = 'form-group';

    const properties = {
        type: 'text',
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
                {props.type === 'input' ? <input {...properties} /> : <textarea {...properties} />}
                <div className='input'>{props.error}</div>
            </div>
        </div>
    );
}

Input.propTypes = {
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string,
};

export default Input;
