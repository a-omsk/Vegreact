import React from 'react';
import CheckboxGroup from 'react-checkbox-group';

class MultiCheckbox extends React.Component {
    constructor(props) {
        super(props);

        this.wrapperClass = 'form-group';
        this.getValues = () => this.refs.checkbox.getCheckedValues();
    }

    render() {
        if (this.props.error && this.propserror.length) { this.wrapperClass += ' ' + 'has-error'; }

        return (
            <div className={this.wrapperClass}>
                <div className="form-inline">
                    <label>{this.props.label}</label>
                    <div className="checkbox">

                        <CheckboxGroup ref="checkbox" onChange={ this.props.onChange } name={this.props.name} >
                            { this.props.values.map(({ code, title }) => (
                                <label key={code}>
                                    <input type="checkbox" value={code} /> {title}
                                </label>
                            )) }
                        </CheckboxGroup>

                        <div className="input">{this.props.error}</div>
                    </div>
                </div>
            </div>
        );
    }
}

MultiCheckbox.propTypes = {
    label: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    values: React.PropTypes.array,
    error: React.PropTypes.string,
};

export default MultiCheckbox;
