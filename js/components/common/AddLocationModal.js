import React from 'react';
import Modal from 'react-modal';
import AddLocationForm from './AddLocationForm';

const modalStyle = {
    overlay: {
        zIndex: 10,
    },

    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
        width: '60%',
        margin: 'auto',
    },
};

const AddLocationModal = (props) => (
    <Modal
      isOpen={props.opened}
      style={modalStyle}
      onRequestClose={props.closeHandler}
    >
         <AddLocationForm {...props} />
    </Modal>
);

AddLocationModal.propTypes = {
    opened: React.PropTypes.bool.isRequired,
    closeHandler: React.PropTypes.func.isRequired,
};

export default AddLocationModal;
