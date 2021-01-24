import React, { useEffect, useState } from 'react';
import UserModal from './userModal';
import { getAllUsers, deleteUser } from '../utils/apiService';

const Users = (props) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let userId = params.get('id');

  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const [oldName, setOldName] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    loadData();
    setUpdate(false);
    setLoading(false);
  }, [update]);

  const loadData = async () => {
    const users = await getAllUsers();
    setUsers(users?.result);
  };

  return (
    <div className='user-dashboard'>
      <button onClick={openModal} className='add-user'>
        {' '}
        Add New User
      </button>
      <UserModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        id={id}
        oldName={oldName}
        update={(update) => setUpdate(update)}
      />
      {loading ? (
        <div className='loader loader-user'></div>
      ) : (
        <div className='users-top'>
          {users?.length ? (
            users.map(({ name, _id }) => (
              <div
                className='users'
                style={{
                  boxShadow: userId === _id ? `5px 5px 5px #7f98be` : 'none',
                }}
                key={_id}
                onClick={() => {
                  props.history.push(`/?id=${_id}`);
                }}
              >
                <p>{name}</p>
                <i
                  className='fa fa-pencil-square-o'
                  aria-hidden='true'
                  onClick={() => {
                    openModal();
                    setId(_id);
                    setOldName(name);
                  }}
                ></i>
                <i
                  className='fa fa-trash-o'
                  aria-hidden='true'
                  onClick={async () => {
                    await deleteUser(_id);
                    if (_id === userId)
                      setTimeout(props.history.push('/'), 1000);
                  }}
                ></i>
              </div>
            ))
          ) : (
            <p>No users</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
