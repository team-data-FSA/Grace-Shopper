import React, { useState, useEffect } from 'react';
import { FormControl, Paper, Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimal } from '../store/animal';
import { addAnimal, deleteAnimal } from '../store/animals';
import { useHistory } from 'react-router-dom';

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

const AddAnimal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setError] = useState({ name: false, price: false });

  const [animal, setAnimal] = useState(emptyAnimal);

  // useEffect(() => {
  //   console.log('error changed', errors);
  // }, [errors]);

  const formValidation = (animal) => {
    let errs = { name: false, price: false };
    let flag = true;
    if (animal.price === '') {
      errs.price = true;
      flag = false;
    }
    if (animal.name === '') {
      errs.name = true;
      flag = false;
    }
    setError(errs);

    return flag;
  };

  const onTextChange = (e) => {
    const newAnimal = { ...animal };
    newAnimal[e.target.id] = e.target.value;
    setAnimal(newAnimal);
  };
  const handleSubmit = () => {
    if (formValidation(animal)) {
      dispatch(addAnimal(animal, history));
    }
  };
  const handleClear = () => setAnimal(emptyAnimal);

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
        <FormControl style={{ padding: '1rem' }}>
          <TextField
            onChange={onTextChange}
            value={animal.name}
            required
            error={errors.name}
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
            value={animal.animalType}
            id={'animalType'}
            label={'Type'}
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
            required
            error={errors.price}
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
          <Button onClick={handleClear}>Clear</Button>
        </FormControl>
      </Paper>
    </div>
  );
};

export default AddAnimal;
