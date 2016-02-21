import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import AddLocationForm from './AddLocationForm';

const modalStyle = {
    overlay : {
        zIndex: 10
    },

    content : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80 + '%',
        width: 60 + '%',
        margin: 'auto'
    }
};

const AddLocationModal = (props) => {
    return (
        <Modal
          isOpen={props.opened}
          style={modalStyle}
          onRequestClose={props.closeHandler}>

          <AddLocationForm {...props} />
        </Modal>
    )
}

export default AddLocationModal;
