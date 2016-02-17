import React, { PropTypes } from 'react'

class CommentForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }

        this.toggleVisibility = () => {
            this.setState({visible: !this.state.visible});
        }
    }

    render () {
        let content;

        if (this.state.visible) {
            content = (
                <form>
                    <div className="form-group">
                        <input className='comment-author' type="text" />
                    </div>
                    <div className="form-group">
                        <div className='comment-rating'></div>
                    </div>
                    <div className="form-group">
                        <textarea className='comment-body-area' />
                    </div>
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
