import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

const Filters = ({ setFilter, filter }) => {
  const [animlTypes, setTypes] = useState([{ name: 'loading', quantity: 0 }]);
  const { animals } = useSelector((state) => state);
  const [search, setSearch] = useState('');

  const history = useHistory();

  useEffect(() => {
    let types = {};
    animals.forEach((animal) => {
      if (types[animal.animalType]) {
        types[animal.animalType] += 1;
      } else {
        types[animal.animalType] = 1;
      }
    });
    if (types !== {}) {
      setTypes(
        Object.keys(types).map((key) => {
          return { name: key, quantity: types[key] };
        })
      );
    }
  }, [animals]);

  const addFilter = (e) => {
    let newQuery = '';
    const newFilter = { ...filter };
    if (e) {
      const value = e.target.value;
      const checked = e.target.checked;
      const index = filter.animalType.indexOf(value);

      let newAllFilters = [...filter.animalType];
      if (index === -1 && checked) {
        newAllFilters.push(value);
      } else {
        newAllFilters.splice(index, 1);
      }

      newAllFilters.forEach((filter) => {
        newQuery += `&animalType=${filter}`;
      });
      newFilter.animalType = [...newAllFilters];
    }

    newQuery = '?' + newQuery.slice(1);
    history.push(newQuery);
    setFilter(newFilter);
  };
  const checkCheck = (name) => {
    if (filter.animalType.length > 0) {
      return filter.animalType.includes(name);
    }
  };

  const onTextChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log('search', search);
    const newFilter = { ...filter };
    newFilter.name = search;
    setFilter(newFilter);
  }, [search]);

  return (
    <div>
      {animlTypes.map((type) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <input
              type='checkbox'
              id={type.name}
              value={type.name}
              onClick={addFilter}
              checked={checkCheck(type.name)}
            ></input>
            <label for={type.name}>
              {type.name} ({type.quantity})
            </label>
          </div>
        );
      })}
      <TextField
        onChange={onTextChange}
        value={search}
        id={'search'}
        label={'Search'}
      />
      <Button onClick={() => setSearch('')}>Clear</Button>
    </div>
  );
};

export default Filters;
