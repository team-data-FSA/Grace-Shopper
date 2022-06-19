import axios from 'axios';

// Action constant
const TOKEN = 'token'
const GET_USERS = 'GET_USERS';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

// Action creator
const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const _deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

// Thunk
export const fetchUsers = () => {
  return async (dispatch) => {
    try{
      const token = window.localStorage.getItem(TOKEN);
      if(token) {
        const { data: allUsers } = await axios.get('/api/users', { headers: {
          authorization: token
        }})
        dispatch(getUsers(allUsers));
      }
    } catch(err) {
      console.log(err);
    }
  };
};

// Updating Edited User Thunk
export const updateUser = (user, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${user.id}`, user);
      dispatch(_updateUser(data));
      history.push('/users');
    } catch (error) {
      console.log(error);
    }
  };
};

// Deleting User Thunk
export const deleteAnimal = (id, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/users/${id}`);
      dispatch(_deleteUser(data));
      history.push('/users');
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case UPDATE_USER:
      return state.map((user) => {
        return user.id === action.user.id ? action.user : user;
      });
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
};
