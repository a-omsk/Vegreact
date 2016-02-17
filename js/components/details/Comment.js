import React, { PropTypes } from 'react';
import moment from 'moment';
import Rater from 'react-rater';

const Comment = (props) => {
    return (
        <li style={{background: 'none'}} className='list-group-item'>
            <h4 className='list-author'>Joe Hill</h4>
            <div className='list-date'>{moment(props.date).format("YYYY MMMM DD HH:mm")}</div>
            <Rater style={{pointerEvents: 'none'}} total={props.rating} rating={props.rating} />
            <div className='list-body'>{props.text}</div>
        </li>
    )
};

export default Comment;
