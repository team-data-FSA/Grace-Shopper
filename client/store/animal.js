import axios from "axios";

// Action constant
const SET_ANIMAL = "SET_ANIMAL";

// Action creator
const setAnimal = (animal) => {
  return {
    type: SET_ANIMAL,
    animal,
  };
};

// Thunk
export const fetchAnimal = (animalId) => {
  return async (dispatch) => {
    try {
      const { data: animal } = await axios.get(`/api/animals/${animalId}`);
      dispatch(setAnimal(animal));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ANIMAL:
      return action.animal;
    default:
      return state;
  }
};
