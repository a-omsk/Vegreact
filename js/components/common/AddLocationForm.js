import React, { PropTypes } from 'react'

class AddLocationForm extends React.Component {
    render () {
        return (
            <div className="location-form">
                <form className='add-location-form'>
                    <div className="form-group">
                        <button className="btn btn-default button--close-edit-form">Закрыть</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor='form-name'>Название заведения</label>
                        <input id="form-name" className='form-control form-name' placeholder='введите название' type='text' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor='form-address'>Адрес</label>
                        <input id="form-address" className='form-control' type='text' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor='form-type'>Тип заведения</label>
                        <select id="form-type" className='form-control' defaultValue="Кафе" required>
                            <option value='cafe'>Кафе</option>
                            <option value='eatery'>Столовая</option>
                            <option value='restaurant'>Ресторан</option>
                            <option value='coffee'>Кофейня</option>
                            <option value='other'>Другое</option>
                        </select>
                    </div>
                    <div className="form-inline">
                        <div className="form-group">
                            <label className="form-label--time" htmlFor="form-time">Время работы</label>
                            <input id="form-time" className='form-control form-time' placeholder='время работы'
                                   required
                                   type='text' />
                        </div>
                        <div className="form-group form--avg-check">
                            <div className="form-inline">
                                <label className="form-label--price" htmlFor="form-price">Средний чек</label>

                                <div className="form-group">
                                    <slider className="slider-price" min="valueRange.min"
                                            step="valueRange.step"
                                            max="valueRange.max"></slider>
                                    <div className="input-group">
                                        <input id='form-price' className='form-control form-price' placeholder='средний чек'
                                               required
                                               type='text' />

                                        <div className="input-group-addon">₽</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="form-inline form--special-group">
                            <div className="form-group">
                                <div className="form-inline">
                                    <label>Представлена еда:</label>

                                    <div className="checkbox">
                                        <label>
                                            <input type='checkbox' />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-rating-group">
                                <div className="form-inline">
                                    <label> Оцените заведение: </label>

                                    <div className="form-group">
                                        <div className="form-rating"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="form-group form--description-group">
                    <textarea className='form-control form-description' placeholder='что в меню?'
                              required cols='10'
                              rows='5'></textarea>
                    </div>
                    <div className="col-sm-offset-2 edit-form-submit col-sm-10">
                        <input className='btn-default btn location-form-submit' type='submit' value='Сохранить' />
                    </div>
                </form>
            </div>
        )
    }
}

export default AddLocationForm;
