import axios from 'axios';

// Action constant
const SET_ANIMALS = 'SET_ANIMALS';
const ADD_ANIMAL = 'ADD_ANIMAL';
const UPDATE_ANIMAL = 'UPDATE_ANIMAL';
const DELETE_ANIMAL = 'DELETE_ANIMAL';

// Action creator
const setAnimals = (animals) => {
  return {
    type: SET_ANIMALS,
    animals,
  };
};

const _addAnimal = (animal) => {
  return {
    type: ADD_ANIMAL,
    animal,
  };
};

const _updateAnimal = (animal) => {
  return {
    type: UPDATE_ANIMAL,
    animal,
  };
};

const _deleteAnimal = (animal) => {
  return {
    type: DELETE_ANIMAL,
    animal,
  };
};

// Thunk
export const fetchAnimals = () => {
  return async (dispatch) => {
    try {
      const { data: allAnimals } = await axios.get('/api/animals');
      dispatch(setAnimals(allAnimals));
    } catch (error) {
      console.log(error);
    }
  };
};

// Adding New Animal Thunk
export const addAnimal = (animal, auth, history) => {
  // Parameters( animal, history )
  return async (dispatch) => {
    try {
      console.log('addanimals', animal, auth);
      const { data } = await axios.post('/api/animals/add', animal, {
        headers: auth,
      });
      dispatch(_addAnimal(data));
      history.push('/animals');
    } catch (error) {
      console.log(error);
    }
  };
};

// Updating Edited Animal Thunk
export const updateAnimal = (animal, auth, history) => {
  // Parameters( animal, history )
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/animals/${animal.id}`, animal, {
        headers: auth,
      });
      dispatch(_updateAnimal(data));
      history.push(`/animals/${animal.id}`);
    } catch (error) {
      console.log(error);
    }
  };
};

// Deleting Animal Thunk
export const deleteAnimal = (id, auth, history) => {
  // Parameters( animal Id, history )
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/animals/${id}`, {
        headers: auth,
      });
      dispatch(_deleteAnimal(data));
      history.push('/animals');
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
    case ADD_ANIMAL:
      return [...state, action.animal];
    case UPDATE_ANIMAL:
      return state.map((animal) => {
        return animal.id === action.animal.id ? action.animal : animal;
      });
    case DELETE_ANIMAL:
      return state.filter((animal) => animal.id !== action.animal.id);
    default:
      return state;
  }
};
