import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchAnimals } from '../store/animals';
import { addToCart } from '../store/cart';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography, //text
  Button,
  TextField,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core';

import AnimalListItem from './AnimalListItem';
import Filters from './Filters';

const AllAnimals = () => {
  // pull state from Redux we also have access to auth
  const { animals: allAnimals, auth } = useSelector((state) => {
    return state;
  });
  const [filter, setFilter] = useState({ animalType: {}, name: '' });
  const [animals, setAnimals] = useState([]);
  const [limit, setLimit] = useState(10);

  const { search } = useLocation();

  let query = React.useMemo(() => new URLSearchParams(search), [search]);

  // dispatch actions
  const dispatch = useDispatch();

  // component did mount
  useEffect(() => {
    dispatch(fetchAnimals());
    setFilter({
      animalType: query.getAll('animalType'),
      name: query.get('name'),
    });
  }, []);

  useEffect(() => {
    doFilter();
    setLimit(10);
  }, [filter]);

  const doFilter = () => {
    let filterdAnimals = allAnimals;
    if (filter.name) {
      filterdAnimals = filterdAnimals.filter((animal) =>
        animal.name.toUpperCase().includes(filter.name.toUpperCase())
      );
    }
    if (filter.animalType.length > 0) {
      filterdAnimals = filterdAnimals.filter((animal) =>
        filter.animalType.includes(animal.animalType)
      );
    }
    setAnimals(filterdAnimals);
  };

  useEffect(() => {
    doFilter();
  }, [allAnimals]);

  let count = 0;

  return (
    <div>
      {/* <MultipleSelectChip /> */}
      <Filters query={query} setFilter={setFilter} filter={filter} />
      <Typography variant='h3' component='div' style={{ color: '#383B53', fontFamily: 'cursive'}} >
        Welcome to our exotic shelter.
      </Typography>
      <ul className='container'>
        {animals.length > 0 ? (
          animals.map((animal) => {
            if (count++ < limit) {
              return <AnimalListItem animal={animal} key={animal.id} />;
            }
          })
        ) : (
          <div>Uh Oh, No Exotic Pets!</div> //this catches while the animals load may not be optimal solution
        )}
        {limit >= animals.length ? (
          ''
        ) : (
          <div
            style={{
              width: '100vw',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={() => {
                setLimit(limit + 10);
              }}
            >
              View More
            </Button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default AllAnimals;
