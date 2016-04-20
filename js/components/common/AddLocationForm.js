import React from 'react';
import LocationStore from '../../stores/LocationStore';
import Rater from 'react-rater';
import MultiCheckbox from './MultiCheckbox';
import Input from './Input';
import Select from './Select';
import reduce from 'lodash/reduce';

const inlineInputStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

class AddLocationForm extends React.Component {
    constructor(props) {
        super(props);

        const {
            coordinates,
            title = '',
            type = 'cafe',
            address = LocationStore.currentAddress,
            specification = [],
            businessTime = '',
            price = '',
            rating = 0,
            description = '',
        } = props;

        this.specifications = [
            { code: 'vegan', title: 'Веганская' },
            { code: 'vegetarian', title: 'Вегетарианская' },
        ];

        this.options = [
            { code: 'cafe', title: 'Кафе' },
            { code: 'eatery', title: 'Столовая' },
            { code: 'restaurant', title: 'Ресторан' },
            { code: 'coffee', title: 'Кофейня' },
            { code: 'other', title: 'Другое' },
        ];

        this.state = {
            location: {
                coordinates,
                title,
                type,
                address,
                specification,
                businessTime,
                price,
                rating,
                description,
            },
            errors: {},
        };

        this.onChange = ({ target: { name, value } }) => {
            this.state.location[name] = value;
            this.setState({ location: this.state.location });
        };

        this.onSpecsChange = () => {
            this.state.location.specification = this.refs.specs.getValues();
            this.setState({ location: this.state.location });
        };

        this.handleRate = (newRating, lastRating) => {
            this.state.location.rating = newRating;

            if (lastRating !== void 0) {
                this.setState({ location: this.state.location });
            }
        };

        this.validate = () => {
            const { location } = this.state;
            const errors = reduce(location, (result, field, key) => {
                if (!field || !field.length) { result[key] = 'Это поле обязательно к заполнению'; }
                return result;
            }, {});

            this.setState({ errors });
            return !Object.keys(errors).length;
        };

        this.submit = () => {
            if (this.validate && this.props.submitAction) {
                this.props.submitAction(this.state.location);
            }
        };
    }

    render() {
        return (
            <div className="location-form">
                <form className="add-location-form">

                    <div className="form-group">
                        <div
                          onClick={this.props.closeHandler}
                          className="btn btn-default button--close-edit-form"
                        >Закрыть
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Название заведения</label>
                        <Input
                          inputType="text"
                          name="title"
                          placeholder="введите название"
                          onChange={this.onChange}
                          value={this.state.title}
                          error={this.state.errors.title}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Адрес</label>
                        <Input
                          inputType="text"
                          name="address"
                          placeholder="ул. Мира, 101"
                          onChange={this.onChange}
                          value={this.state.location.address}
                          error={this.state.errors.address}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Тип заведения</label>
                        <Select
                          name="type"
                          onChange={this.onChange}
                          options={this.options}
                          value={this.state.location.type}
                          error={this.state.errors.type}
                        />
                    </div>

                    <div style={inlineInputStyle} className="form-inline">
                        <div className="form-group">
                            <label style={{ marginRight: '10px' }} htmlFor="address">Адрес</label>
                            <Input
                              inputType="text"
                              name="businessTime"
                              placeholder="c 09:00 до 18:00"
                              onChange={this.onChange}
                              value={this.state.location.businessTime}
                              error={this.state.errors.businessTime}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ marginRight: '10px' }} htmlFor="address">Средний чек</label>
                            <Input
                              inputType="text"
                              name="price"
                              placeholder="выше среднего"
                              onChange={this.onChange}
                              value={this.state.location.price}
                              error={this.state.errors.price}
                              addOn={'₽'}
                            />
                        </div>
                    </div>

                    <div style={inlineInputStyle} className="form-inline form--special-group">
                        <MultiCheckbox
                          label="Представлена еда:"
                          name="specification"
                          ref="specs"
                          value={this.state.location.specification}
                          values={this.specifications}
                          onChange={this.onSpecsChange}
                          error={this.state.errors.specification}
                        />

                        <div className="form-group form-rating-group">
                            <div className="form-inline">
                                <label> Оцените заведение: </label>
                                <Rater rating={this.state.location.rating} onRate={this.handleRate} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group form--description-group">
                        <Input
                          inputType="textarea"
                          name="description"
                          placeholder="В меню присутствует…"
                          onChange={this.onChange}
                          value={this.state.location.description}
                          error={this.state.errors.description}
                        />
                    </div>

                    <div className="col-sm-offset-2 edit-form-submit col-sm-10">
                        <div onClick={this.submit} className="btn-default btn location-form-submit">Сохранить</div>
                    </div>
                </form>
            </div>
        );
    }
}

AddLocationForm.propTypes = {
    closeHandler: React.PropTypes.func.isRequired,
    submitAction: React.PropTypes.func.isRequired,
    coordinates: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
    title: React.PropTypes.string,
    type: React.PropTypes.string,
    address: React.PropTypes.string,
    specification: React.PropTypes.array,
    businessTime: React.PropTypes.string,
    price: React.PropTypes.string,
    rating: React.PropTypes.number,
    description: React.PropTypes.string,
};

export default AddLocationForm;
