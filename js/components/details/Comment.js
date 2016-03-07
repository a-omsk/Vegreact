import React from 'react';
import moment from 'moment';
import Rater from 'react-rater';

const Comment = ({ date, rating, text }) => (
    <li style={{ background: 'none' }} className="list-group-item">
        <h4 className="list-author">Joe Hill</h4>
        <div className="list-date">{moment(date).format('YYYY MMMM DD HH:mm')}</div>
        <Rater style={{ pointerEvents: 'none' }} total={rating} rating={rating} />
        <div className="list-body">{text}</div>
    </li>
);

export default Comment;
