import axios from 'axios';
import { fetchCart } from './cart';

const getItems = (userId)=> {
  return async (dispatch) => {
    const data = dispatch(fetchCart(userId));
  }
}
