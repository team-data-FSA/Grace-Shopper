import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cart';
import {
  Typography, //text
  Button,
  TextField,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const AnimalListItem = ({ animal }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [qty, setQty] = useState(1);

  const handleChange = (event) => {
    setQty(event.target.value);
  };

  return (
    <div className='card' key={animal.id}>
      <Card>
        <Link
          to={`animals/${animal.id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <CardMedia
            component='img'
            alt={`${animal.name} picture`}
            image={animal.picture}
            height='400'
            className='media'
          />
          <CardContent>
            <Typography variant='h5' component='div'>
              {animal.name}
            </Typography>
            <Typography variant='body1' component='div'>
              {'$'}
              {animal.price}
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          <TextField
            variant='outlined'
            style={{ maxWidth: 80 }}
            label='Qty'
            type='number'
            placeholder='0-100'
            name='Qty'
            value={qty}
            onChange={handleChange}
          />
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={() => {
              // console.log("userId: ", auth.id);
              dispatch(addToCart(auth.id, animal.id, qty));
            }}
          >
            Adopt Me!
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default AnimalListItem;
