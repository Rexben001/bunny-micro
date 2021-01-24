import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'develpment'
    ? 'localhost:5001/v1/users'
    : `https://api-rex-users.herokuapp.com/api/v1/users`;
const URL_TASK =
  process.env.NODE_ENV === 'develpment'
    ? 'localhost:5003/v1/users/tasks'
    : `https://api-rex-user-tasks.herokuapp.com/api/v1/users/tasks`;
export const getAllUsers = async () => {
  try {
    const { data } = await axios.get(`${URL}/all`);
    return data;
  } catch (error) {
    return error.data;
  }
};

export const getUser = async (id) => {
  try {
    const [user, tasks] = await Promise.all([
      await axios.get(`${URL}/${id}`),
      await axios.get(`${URL_TASK}/all/${id}`),
    ]);

    const { result } = user.data;
    result.tasks = tasks.data.result;

    return result;
  } catch (error) {
    return error.data;
  }
};

export const addUser = async (name) => {
  try {
    const { data } = await axios.post(`${URL}/create`, { name });
    return data;
  } catch (error) {
    return error.data;
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}/${id}`);
    return data;
  } catch (error) {
    return error.data;
  }
};

export const updateUser = async (id, name) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, { name });
    return data;
  } catch (error) {
    return error.data;
  }
};

export const addTask = async (body) => {
  try {
    const { data } = await axios.post(`${URL_TASK}/create`, body);
    return data;
  } catch (error) {
    return error.data;
  }
};

export const deleteTask = async (id) => {
  try {
    const { data } = await axios.delete(`${URL_TASK}/${id}`);
    return data;
  } catch (error) {
    return error.data;
  }
};

export const updateTask = async (id, body) => {
  try {
    const { data } = await axios.put(`${URL_TASK}/${id}`, body);
    return data;
  } catch (error) {
    return error.data;
  }
};

export const getFirstUser = async () => {
  try {
    const { result } = await getAllUsers();
    const details = await getUser(result[0]._id);
    return details;
  } catch (error) {
    return error.data;
  }
};
