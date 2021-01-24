import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';

import { addTask, updateTask } from '../utils/apiService';

Modal.setAppElement('#modalElement');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minHeight: '200px',
    borderRadius: '5px',
  },
};

const TaskModal = ({ modalIsOpen, closeModal, id, taskProps, update }) => {
  const options = [
    {
      value: 'to do',
      label: 'To do',
    },
    {
      value: 'done',
      label: 'Done',
    },
  ];
  const [task, setTask] = useState({
    description: '',
    state: '',
  });

  useEffect(() => {
    if (taskProps) {
      const { description, state } = taskProps;
      setTask((prev) => ({
        ...prev,
        description,
        state: options.filter(({ value }) => value === state)[0],
      }));
    }
  }, [taskProps]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const selectHandler = (state) => {
    setTask((prev) => ({ ...prev, state }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    closeModal();
    const data = {
      ...task,
      user_id: id,
      state: task.state.value || 'to do',
    };
    if (taskProps) {
      await updateTask(taskProps._id, data);
    } else {
      await addTask(data);
    }
    update(true);
    setTask({
      description: '',
      state: '',
    });
  };

  return (
    <div className='modal-task'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h3>{taskProps ? 'Update' : 'Add New'} Task</h3>
        <form onSubmit={submitHandler}>
          <label>Description</label>
          <textarea
            onChange={changeHandler}
            name='description'
            value={task.description}
          />
          <div className='dropdown'>
            <label>State</label>
            <Select
              value={task.state}
              onChange={selectHandler}
              options={options}
            />
          </div>
          <button type='submit' className='add-modal-2'>
            {taskProps ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default TaskModal;
