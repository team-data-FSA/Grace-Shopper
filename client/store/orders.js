import axios from 'axios';
const TOKEN = 'token';
const GET_ORDER = 'GET_ORDER';
const GET_ORDERS = 'GET_ORDERS';
const ADD_ORDER = 'ADD_ORDER';

const getOrder = (order) => {
  return {
    type: GET_ORDER,
    order,
  };
};

const getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders,
  };
};

const addOrder = (order) => {
  return {
    type: ADD_ORDER,
    order,
  };
};

export const fetchOrder = (orderId, userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: order } = await axios.get(
          `/api/orders/${userId}/${orderId}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(getOrder(order));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchOrders = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: orders } = await axios.get(`/api/orders/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(getOrders(orders));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const newOrder = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: order } = await axios.post(`/api/orders/${userId}/add`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(addOrder(order));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    case GET_ORDERS:
      return action.orders;
    case ADD_ORDER:
      return action.order;
    default:
      return state;
  }
};
