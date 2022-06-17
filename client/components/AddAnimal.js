import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Paper,
  Button,
  TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

const addAnimal = () => {};

const emptyAnimal = {
  name: 'a',
  latinName: '',
  animalType: '',
  diet: '',
  habitat: '',
  location: '',
  lifeSpan: '',
  price: 0,
  picture: '',
};

const AddAnimal = () => {
  const dispatch = useDispatch();

  const [animal, setAnimal] = useState({});

  const onTextChange = (e) => {
    animal[e.target.id] = e.target.value;
    setAnimal(animal);
  };
  const handleSubmit = () => console.log(animal);
  const handleReset = () => setAnimal('');

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Paper
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Add Animal</h2>

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
      </Paper>
    </div>
  );
};

export default AddAnimal;
