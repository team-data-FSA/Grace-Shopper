import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';

const Filters = () => {
  const [animlTypes, setTypes] = useState([{ name: 'loading', quantity: 0 }]);
  const { animals } = useSelector((state) => state);
  const [filters, setFilters] = useState([]);

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

  useEffect(() => {
    console.log('animaltypes', animlTypes);
  }, [animlTypes]);
  return (
    <div>
      <Select labelId='filters' multiple>
        {animlTypes.map((type) => (
          <MenuItem key={type.name} value={type.name}>
            <Checkbox checked={true} />
            <ListItemText primary={type.name} />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default Filters;
