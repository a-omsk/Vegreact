import React from 'react';

const Select = ({ name, onChange, value, options, error }) => {
    let wrapperClass = 'form-group';

    const properties = {
        className: 'form-control',
        name,
        onChange,
        value,
    };

    if (error && error.length) {
        wrapperClass += ' ' + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <div className="field">
                <select {...properties}>
                    {options.map(({ code, title }) => <option key={code} value={code}>{title}</option>)}
                </select>
                <div className="input">{error}</div>
            </div>
        </div>
    );
};

Select.propTypes = {
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    options: React.PropTypes.array.isRequired,
    value: React.PropTypes.string,
    error: React.PropTypes.string,
};

export default Select;
