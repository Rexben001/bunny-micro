import React, { useState } from 'react';
import Modal from 'react-modal';

import { addUser, updateUser } from '../utils/apiService';

Modal.setAppElement('#modalElement');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const UserModal = ({ modalIsOpen, closeModal, id, oldName, update }) => {
  const [user, setUser] = useState('');

  const changeHandler = (event) => {
    setUser(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    closeModal();
    if (id) {
      await updateUser(id, user);
    } else await addUser(user);
    update(true);
    setUser('');
  };

  return (
    <div className='modal'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h3>{id ? 'Update' : 'Add New'} User</h3>
        <form onSubmit={submitHandler}>
          <input type='text' onChange={changeHandler} value={user || oldName} />

          <button type='submit' className='add-modal'>
            {id ? 'Update User' : 'Add User'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserModal;
