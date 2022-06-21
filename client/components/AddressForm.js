import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/user';

import {
  FormControlLabel,
  Grid,
  Typography,
  TextField,
  Checkbox,
  Button,
} from '@material-ui/core';
const emptyUser = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  zip: '',
};

export default function AddressForm() {
  let userStore = useSelector((state) => state.user);
  let userAuth = useSelector((state) => state.auth);
  console.log(userAuth);
  if (!userStore.id) {
    userStore = emptyUser;
  }
  const [user, setUser] = useState(userStore);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userAuth.id) {
      dispatch(fetchUser(userAuth.id));
    }
  }, []);

  useEffect(() => {
    setUser(userStore);
  }, [userStore]);

  const handleSubmit = () => {
    dispatch(addAddressToOrder(user));
  };

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='firstName'
            name='firstName'
            label='First name'
            fullWidth
            autoComplete='given-name'
            variant='standard'
            value={user.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='lastName'
            name='lastName'
            label='Last name'
            fullWidth
            autoComplete='family-name'
            variant='standard'
            value={user.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='address1'
            name='address1'
            label='Address line 1'
            value={user.addressLine1}
            fullWidth
            autoComplete='shipping address-line1'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='address2'
            name='address2'
            label='Address line 2'
            value={user.addressLine2}
            fullWidth
            autoComplete='shipping address-line2'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='city'
            name='city'
            label='City'
            value={user.city}
            fullWidth
            autoComplete='shipping address-level2'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='state'
            name='state'
            label='State/Province/Region'
            value={user.state}
            fullWidth
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='zip'
            name='zip'
            label='Zip / Postal code'
            value={user.zip}
            fullWidth
            autoComplete='shipping postal-code'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='country'
            name='country'
            label='Country'
            value={user.country}
            fullWidth
            autoComplete='shipping country'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color='secondary' name='saveAddress' value='yes' />
            }
            label='Use this address for payment details'
          />
        </Grid>
      </Grid>
      <Button onClick={handleSubmit}>Submit</Button>
    </React.Fragment>
  );
}
