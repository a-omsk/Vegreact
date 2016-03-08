import React from 'react';
import LocationStore from '../../stores/LocationStore';
import Rater from 'react-rater';
import CheckboxGroup from 'react-checkbox-group';
import Input from './Input';
import Select from './Select';

const inlineInputStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

class AddLocationForm extends React.Component {
    constructor(props) {
        super(props);

        const {
            title = '',
            type = 'cafe',
            address = LocationStore.currentAddress,
            specification = [],
            businessTime = '',
            price = '',
            rating = 0,
            description = '',
        } = props;

        const options = [
            { code: 'cafe', title: 'Кафе' },
            { code: 'eatery', title: 'Столовая' },
            { code: 'restaurant', title: 'Ресторан' },
            { code: 'coffee', title: 'Кофейня' },
            { code: 'other', title: 'Другое' },
        ];

        this.state = {
            location: {
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
            options,
        };

        this.onChange = ({ target: { name, value } }) => {
            this.state.location[name] = value;
            this.setState({ location: this.state.location });
        };

        this.onSpecsChange = () => {
            this.state.location.specification = this.refs.specs.getCheckedValues();
            this.setState({ location: this.state.location });
        };

        this.handleRate = (newRating, lastRating) => {
            this.state.location.rating = newRating;

            if (lastRating !== void 0) {
                this.setState({ location: this.state.location });
            }
        };
    }

    render() {
        return (
            <div className="location-form">
                <form className="add-location-form">

                    <div className="form-group">
                        <div
                          onClick={this.props.onRequestClose}
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
                          options={this.state.options}
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
                        <div className="form-inline form--special-group">

                            <div className="form-group">
                                <div className="form-inline">
                                    <label>Представлена еда:</label>
                                    <div className="checkbox">
                                        <CheckboxGroup ref="specs" onChange={this.onSpecsChange} name="specification" value={this.state.location.specification}>
                                            <label>
                                                <input type="checkbox" value="vegetarian" /> Вегетарианская
                                            </label>
                                            <label>
                                                <input type="checkbox" value="vegan" /> Веганская
                                            </label>
                                        </CheckboxGroup>
                                    </div>
                                </div>
                            </div>

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
                        <input className="btn-default btn location-form-submit" type="submit" value="Сохранить" />
                    </div>
                </form>
            </div>
        );
    }
}

export default AddLocationForm;
