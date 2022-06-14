import axios from "axios";

// Action constant
const SET_ANIMALS = "SET_ANIMALS";

// Action creator
const setAnimals = (animals) => {
  return {
    type: SET_ANIMALS,
    animals,
  };
};

// Thunk
export const fetchAnimals = () => {
  return async (dispatch) => {
    try {
      const { data: allAnimals } = await axios.get("/api/animals");
      dispatch(setAnimals(allAnimals));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ANIMALS:
      return action.animals;
    default:
      return state;
  }
};
