import React, { PropTypes } from 'react';
import Rater from 'react-rater';
import Input from '../common/Input';

class CommentForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            feedback: {
                author: 'Гость',
                body: '',
                rating: 0
            },
            visible: false,
            errors : {}
        };

        this.toggleVisibility = () => {
            this.setState({visible: !this.state.visible});
        };

        this.onChange = (event) => {
            const {name, value} = event.target;

            this.state.feedback[name] = value;
            this.setState({feedback: this.state.feedback});
        };

        this.handleRate = (value, selected) => {
            console.log(`handled ${selected}`);
        }
    }

    render () {
        let content;

        if (this.state.visible) {
            content = (
                <form>
                    <Input
                        inputType="input"
                        name="author"
                        placeholder="Ваше имя"
                        onChange={this.onChange}
                        value={this.state.feedback.author}
                        error={this.state.errors.author}
                    />

                    <Input
                        inputType="textarea"
                        name="body"
                        placeholder="Напишите Ваш отзыв…"
                        onChange={this.onChange}
                        value={this.state.feedback.body}
                        error={this.state.errors.body}
                    />

                    <Rater onRate={this.handleRate.bind(this)} />
                    <button className='btn-default btn'>Отправить</button>
                </form>)
        } else {
            content = (
                <button className='btn-default btn' onClick={this.toggleVisibility.bind(this)}>
                    Оставить комментарий
                </button>)
        }

        return <div>{content}</div>;
    }
}

export default CommentForm;
