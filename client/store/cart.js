import axios from 'axios';

// Action constants
const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const EDIT_CART = 'EDIT_CART';

// Action creators
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

const addCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart,
  };
};

const _editCart = (cart) => {
  return {
    type: EDIT_CART,
    cart,
  };
};

const getLocalCart = () => {
  localStorage.removeItem('cart');
  let cart = JSON.parse(localStorage.getItem('cart'));

  if (cart === null) {
    cart = { animals: [] };
    localStorage.setItem('cart', '{{animals:[]}}');
  }
  return cart;
};

export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      console.log('fetching cart');
      let cart = {};
      if (userId === undefined) {
        cart = getLocalCart();
      } else {
        const { data } = await axios.get(`/api/cart/${userId}`);
        cart = data;
      }
      dispatch(setCart(cart));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = (userId, animalId, quantity) => {
  return async (dispatch) => {
    try {
      let cart = {};
      if (userId === undefined) {
        cart = getLocalCart();
        cart = {
          animals: [{ id: animalId, CartAnimal: { quantity: quantity } }],
        };
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('cart', cart);
      } else {
        const { data } = await axios.put(
          `/api/cart/add/${userId}/${animalId}/${quantity}`
        );
        cart = data;
      }
      dispatch(addCart(cart));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editCart = (userId, animalId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/cart/edit/${userId}/${animalId}/${quantity}`
      );
      const cart = data;
      dispatch(_editCart(cart));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_TO_CART:
      return action.cart;
    case EDIT_CART:
      return action.cart;
    default:
      return state;
  }
};
