import axios from 'axios';

// Action constants
const SET_CART_DETAILS = 'SET_CART_DETAILS';

// Action creators
const setCartDetails = (cartDetails) => {
  return {
    type: SET_CART_DETAILS,
    cartDetails,
  };
};

export const fetchCartDetails = (cartObj) => {
  return async (dispatch) => {
    try {
      let outputCart = [];
      let counter = 0;
      for (let animals in cartObj) {
        let { data: currAnimal } = await axios.get(`/api/animals/${animals}`);
        outputCart[counter] = {
          animal: currAnimal,
          quantity: cartObj[animals],
        };
        counter++;
      }
      dispatch(setCartDetails(outputCart));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_DETAILS:
      return action.cartDetails;
    default:
      return state;
  }
};
