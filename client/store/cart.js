import { CardTravelRounded } from '@material-ui/icons';
import axios from 'axios';
import SingleAnimal from '../components/SingleAnimal';

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
  // localStorage.removeItem('cart');
  let cart = JSON.parse(localStorage.getItem('cart'));

  if (cart === null) {
    cart = { animals: [], cartCount: 0, total: 0 };
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
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
        // cart = {
        //   animals: [{ id: animalId, CartAnimal: { quantity: quantity } }],
        // };
        const animal = await axios.get(`/api/animals/${animalId}`);
        for (let i = 0; i < cart.animals.length; i++) {
          if (cart.animals[i].animal.id === animalId) {
            cart.animals[i].quantity += parseInt(quantity);
            cart.cartCount += parseInt(quantity);
            cart.total += parseInt(animal.data.price) * parseInt(quantity);
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(addCart(cart));
            console.log('cart', cart);
            return;
          }
        }
        cart.animals.push({
          animal: animal.data,
          quantity: parseInt(quantity),
        });
        cart.cartCount += parseInt(quantity);
        cart.total += parseInt(animal.data.price) * parseInt(quantity);
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
      let cart = {};
      if (userId === undefined) {
        cart = getLocalCart();
        cart = cart.animals.map((cartAnimal) => {
          if (cartAnimal.animal.id === animalId) {
            cart.cartCount =
              cart.cartCount - cartAnimal.quantity + parseInt(quantity);
            cart.total =
              cart.total -
              cartAnimal.quantity * cartAnimal.animal.price +
              parseInt(quantity) * cartAnimal.animal.price;
            cartAnimal.quantity = parseInt(quantity);
          }
          return cartAnimal;
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(_editCart(cart));
        console.log('cart', cart);
      } else {
        const { data } = await axios.put(
          `/api/cart/edit/${userId}/${animalId}/${quantity}`
        );
        const cart = data;
      }
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
