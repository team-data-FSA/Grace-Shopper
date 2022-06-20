import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import { fetchUsers } from '../store/users';

const Users = () => {
  const { users, auth } = useSelector((state) => {
    console.log({ state });
    return state;
  });
  console.log(users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <Typography variant='h3' component='div'>
        List of registered users.
      </Typography>
      <ul className='container'>
        {users &&
          users.map((user) => (
            <div className='card' key={user.id}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='div'>
                    name: {user.username}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Users;
