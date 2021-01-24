import React, { useState, useEffect } from 'react';
import TaskModal from './taskModal';
import { deleteTask, getFirstUser, getUser } from '../utils/apiService';

const Tasks = (props) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const userId = params.get('id');

  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
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
  }, [userId, update]);

  const loadData = async () => {
    try {
      let userInfo = {};
      if (userId) {
        const result = await getUser(userId);
        userInfo = result;
      } else {
        const result = await getFirstUser();
        userInfo = result;

        console.log('userInfo>>>>', userInfo);
      }
      setName(userInfo.name);
      setId(userInfo._id);
      setTasks(userInfo.tasks);
    } catch (error) {}
  };

  return (
    <div className='task-dashboard'>
      <h2>{name}'s Todo</h2>
      <button
        className='add-task'
        onClick={() => {
          openModal();
        }}
      >
        {' '}
        Add New Task
      </button>
      <TaskModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        id={userId || id}
        taskProps={task}
        update={(update) => setUpdate(update)}
      />
      {loading ? (
        <div
          style={{
            marginTop: '14rem',
          }}
        >
          <p className='loader'></p>
        </div>
      ) : (
        <div className='tasks'>
          {tasks?.length ? (
            tasks.map((task) => (
              <div
                key={task._id}
                style={{
                  borderTop:
                    task.state === 'to do'
                      ? `#d4a0fa solid 5px`
                      : `#f6bf54 solid 5px`,
                }}
              >
                <i
                  className='fa fa-pencil-square-o'
                  aria-hidden='true'
                  onClick={() => {
                    openModal();
                    setTask(task);
                  }}
                ></i>
                <i
                  className='fa fa-trash-o'
                  aria-hidden='true'
                  onClick={async () => {
                    await deleteTask(task._id);
                    setUpdate(false);
                  }}
                ></i>

                <p className='description'>{task.description}</p>
                <p
                  className='state'
                  style={{
                    color: task.state === 'to do' ? '#d4a0fa' : '#f6bf54',
                    background: task.state === 'to do' ? '#ead0fd' : '#fef5e3',
                  }}
                >
                  {task.state}
                </p>
              </div>
            ))
          ) : (
            <p>User does not have any task</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
