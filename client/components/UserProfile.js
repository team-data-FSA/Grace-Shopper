import React, { useState, useEffect } from 'react';
import { FormControl, Paper, Button, TextField } from '@material-ui/core';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../store/user';
import { useHistory } from 'react-router-dom';

const UserProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let userStore = useSelector((state) => state.user);
  let userAuth = useSelector((state) => state.auth);

  const [user, setUser] = useState(userStore);
  const [country, setCountry] = useState('');

  const onTextChange = (e, id) => {
    const newUser = { ...user };
    if (e.target) {
      newUser[e.target.id] = e.target.value;
    } else {
      newUser[id] = e;
    }
    setUser(newUser);
  };

  const handleSubmit = () => dispatch(updateUser(user, history));
  const handleReset = () => setUser(userStore);

  useEffect(() => {
    dispatch(fetchUser(userAuth.id));
    setCountry(userAuth.country);
  }, []);

  useEffect(() => {
    setUser(userStore);
  }, [userStore]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Paper
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Edit Profile</h2>
        <FormControl style={{ padding: '1rem', width: '15rem' }}>
          <TextField
            onChange={onTextChange}
            value={user.username}
            id={'username'}
            label={'Username'}
          />
          <TextField
            onChange={onTextChange}
            value={user.name}
            id={'name'}
            label={'Name'}
          />
          <TextField
            onChange={onTextChange}
            value={user.email}
            id={'email'}
            label={'Email'}
          />
          <TextField
            onChange={onTextChange}
            value={user.phoneNumber}
            id={'phoneNumber'}
            label={'Phone Number'}
          />
          <br />
          <h4>Preferred Shipping Address</h4>
          <TextField
            onChange={onTextChange}
            value={user.addressLine1}
            id={'addressLine1'}
            label={'Address Line 1'}
          />
          <TextField
            onChange={onTextChange}
            value={user.addressLine2}
            id={'addressLine2'}
            label={'Address Line 2'}
          />
          <TextField
            onChange={onTextChange}
            value={user.city}
            id={'city'}
            label={'City'}
          />
          <TextField
            onChange={onTextChange}
            value={user.zip}
            id={'zip'}
            label={'Zip Code'}
          />
          <CountryDropdown
            onChange={(val) => {
              setCountry(val);
              onTextChange(val, 'country');
            }}
            defaultOptionLabel={'Select Country'}
            value={user.country}
          />
          <RegionDropdown
            onChange={(val) => onTextChange(val, 'state')}
            country={country}
            defaultOptionLabel={'Select State/Region'}
            value={user.state}
          />

          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleReset}>Reset</Button>
        </FormControl>
      </Paper>
    </div>
  );
};

export default UserProfile;
