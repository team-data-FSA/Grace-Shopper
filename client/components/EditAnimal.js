import React, { useState, useEffect, useRef } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Paper,
  Button,
  TextField,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimal } from '../store/animal';

const emptyAnimal = {
  name: '',
  latinName: '',
  animalType: '',
  diet: '',
  habitat: '',
  location: '',
  lifeSpan: '',
  price: '',
  picture: '',
};

const EditAnimal = () => {
  const dispatch = useDispatch();
  let animalFromStore = useSelector((state) => state.animal);

  if (!animalFromStore.id) {
    animalFromStore = emptyAnimal;
  }

  const [animal, setAnimal] = useState(animalFromStore);

  const onTextChange = (e) => {
    const newAnimal = { ...animal };
    newAnimal[e.target.id] = e.target.value;
    setAnimal(newAnimal);
  };
  const handleSubmit = () => console.log(animal); // we need to add the thunk to update animal
  const handleReset = () => setAnimal(animalFromStore);
  const handleClear = () => setAnimal(emptyAnimal);
  const handleDelete = () => console.log('need to delete animal'); // add thunk for delete

  useEffect(() => {
    setAnimal(animalFromStore);
  }, [animalFromStore]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Paper
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Edit Animal</h2>
        <FormControl>
          <TextField
            onChange={onTextChange}
            value={animal.name}
            id={'name'}
            label={'Name'}
          />
          <TextField
            onChange={onTextChange}
            value={animal.latinName}
            id={'latinName'}
            label={'Latin Name'}
          />
          <TextField
            onChange={onTextChange}
            value={animal.diet}
            id={'diet'}
            label={'Diet'}
          />
          <TextField
            onChange={onTextChange}
            value={animal.habitat}
            id={'habitat'}
            label={'Habitat'}
          />
          <TextField
            onChange={onTextChange}
            value={animal.location}
            id={'location'}
            label={'Location'}
          />
          <TextField
            type={'number'}
            onChange={onTextChange}
            value={animal.lifeSpan}
            id={'lifeSpan'}
            label={'Life Span'}
          />
          <TextField
            type={'number'}
            onChange={onTextChange}
            value={animal.price}
            id={'price'}
            label={'price'}
          />
          <TextField
            onChange={onTextChange}
            value={animal.picture}
            id={'picture'}
            label={'Image Url'}
          />

          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleClear}>Clear</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </FormControl>
      </Paper>
    </div>
  );
};

export default EditAnimal;
