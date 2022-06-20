import axios from 'axios';
const TOKEN = 'token';
const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';

// Action creator
const getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: user } = await axios.get(`/api/users/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(getUser(user));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUser = (user, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.put(`/api/users/${user.id}`, user, {
          headers: {
            authorization: token,
          },
        });
        dispatch(_updateUser(data));
        history.push('/animals');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
};
