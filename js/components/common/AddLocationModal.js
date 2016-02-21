import React, { PropTypes } from 'react';
import Modal from 'react-modal';

const modalStyle = {
    overlay : {
        zIndex: 10
    },

    content : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40 + '%',
        width: 40 + '%',
        margin: 'auto'
    }
};

class AddLocationModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Modal
              isOpen={this.props.opened}
              style={modalStyle}
              onRequestClose={this.props.closeHandler}>

              <div>Auth modal</div>
            </Modal>
        )
    }
}

export default AddLocationModal;
