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

export const getLocalCart = () => {
  // localStorage.removeItem('cart');
  let cart = JSON.parse(localStorage.getItem('cart'));

  if (cart === null) {
    cart = { animals: [], cartCount: 0, total: 0 };
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

export const moveLocalCartToDb = async (userId, dispatch) => {
  const cart = getLocalCart();
  cart.animals.forEach(async (cartAnimal) => {
    const { data } = await axios.put(
      `/api/cart/add/${userId}/${cartAnimal.animal.id}/${cartAnimal.quantity}`
    );
    dispatch(addCart(data));
  });
  localStorage.removeItem('cart');
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

const cartCountTotal = (cart) => {
  let cartCount = 0;
  let total = 0;

  if (cart.animals) {
    for (let i = 0; i < cart.animals.length; i++) {
      cartCount += cart.animals[i].quantity;
      total += cart.animals[i].quantity * cart.animals[i].animal.price;
    }
  }
  cart.cartCount = cartCount;
  cart.total = total;
  return cart;
};

export const addToCart = (userId, animalId, quantity) => {
  return async (dispatch) => {
    try {
      let cart = {};
      if (userId === undefined) {
        cart = getLocalCart();
        quantity = parseInt(quantity);
        const animal = await axios.get(`/api/animals/${animalId}`);
        let animalIndex = null;
        for (let i = 0; i < cart.animals.length; i++) {
          if (cart.animals[i].animal.id === animalId) {
            animalIndex = i;
          }
        }
        if (animalIndex !== null) {
          cart.animals[animalIndex].quantity += quantity;
        } else {
          cart.animals.push({
            animal: animal.data,
            quantity: quantity,
          });
        }
        cart = cartCountTotal(cart);

        localStorage.setItem('cart', JSON.stringify(cart));
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
        cart.animals = cart.animals
          .map((cartAnimal) => {
            if (cartAnimal.animal.id === animalId) {
              cartAnimal.quantity = parseInt(quantity);
            }
            return cartAnimal;
          })
          .filter((cartAnimal) => cartAnimal.quantity > 0);
        cart = cartCountTotal(cart);
        localStorage.setItem('cart', JSON.stringify(cart));

        dispatch(_editCart(cart));
      } else {
        const { data } = await axios.put(
          `/api/cart/edit/${userId}/${animalId}/${quantity}`
        );
        cart = data;
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
