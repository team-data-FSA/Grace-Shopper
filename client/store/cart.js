import axios from 'axios';

// Action constants
const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';

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

const getLocalCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) {
    cart = [];
    localStorage.setItem('cart', '[]');
  }
  return cart;
};

export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      let cart = [];
      if (userId === undefined) {
        cart = getLocalCart();
      } else {
        const { data: userData } = await axios.get(`/api/users/${userId}`); // Require token here?
        cart = userData.cart;
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
      let cart = [];
      if (userId === undefined) {
        cart = getLocalCart();
        2;

        for (let i = 0; i < quantity; i++) {
          cart.push(animalId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        const { data: userData } = await axios.get(`/api/users/${userId}`);
        cart = userData.cart;

        for (let i = 0; i < quantity; i++) {
          cart.push(animalId);
        }

        // Update user's cart
        await axios.put(`/api/users/${userId}`, { cart: cart });
      }
      console.log('cart:', cart);
      dispatch(addCart(cart));
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
    default:
      return state;
  }
};
