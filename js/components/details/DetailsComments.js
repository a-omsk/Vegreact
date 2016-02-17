import React, { PropTypes } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';

const DetailsComments = (props) => {
    const comments = props.comments || [];

    let content;

    if (comments.length) {
        content = (
            <div>
                <div className='location-comments'>
                    <h4 className='location-comments-header'>Отзывы</h4>
                    <CommentForm />
                </div>
                <ul className='comments-list list-group'>
                    {comments.map(comment => <Comment
                        key={comment.id}
                        rating={comment.rating}
                        text={comment.body}
                        date={comment.updated_at}
                        />)
                    }
                </ul>
            </div>
        )
    } else {
        content = <div>Будьте первым, кто оставит комментарий к этому заведению</div>;
    }

    return (
        <div>{content}</div>
    )
}

export default DetailsComments
