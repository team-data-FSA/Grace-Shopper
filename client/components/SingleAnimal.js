import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnimal } from '../store/animal';
import { addToCart } from '../store/cart';
// The following are for Material-UI components
import {
  Typography, //text
  Button,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@material-ui/core';

const SingleAnimal = (props) => {
  // pull state from redux
  const { animal, auth } = useSelector((state) => {
    return state;
  });

  // dispatch actions
  const dispatch = useDispatch();

  // component did mount
  useEffect(() => {
    dispatch(fetchAnimal(props.match.params.id));
  }, []);

  // Creating a qty state for number of animals to be adopted
  const [qty, setQty] = useState(1);

  const handleChange = (event) => {
    setQty(event.target.value);
  };

  return (
    <div className='container'>
      <Card>
        <CardMedia
          component='img'
          alt={`${animal.name} picture`}
          image={animal.picture}
          height='500'
          width='80'
          className='media'
        />
        <CardContent>
          <Typography variant='h5' component='div'>
            {animal.name}
          </Typography>
          <Typography variant='body1' component='div'>
            Latin Name: {animal.latinName}
          </Typography>
          <Typography variant='body1' component='div'>
            Type: {animal.animalType}
          </Typography>
          <Typography variant='body1' component='div'>
            Diet: {animal.diet}
          </Typography>
          <Typography variant='body1' component='div'>
            Habitat: {animal.habitat}
          </Typography>
          <Typography variant='body1' component='div'>
            Location: {animal.location}
          </Typography>
          <Typography variant='body1' component='div'>
            LifeSpan: {animal.lifeSpan} years!
          </Typography>
          <Typography variant='body1' component='div'>
            Price: ${animal.price}
          </Typography>
        </CardContent>
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

export default SingleAnimal;

// Prior to hooks

// import React from 'react';
// import { connect } from 'react-redux';
// import { fetchAnimal } from '../store/animal';

// //The following are for Material-UI components
// import {
//   Typography, //text
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
// } from '@material-ui/core';

// class SingleAnimal extends React.Component {
//   componentDidMount() {
//     this.props.getAnimal(this.props.match.params.id);
//   }

//   render() {
//     const { animal } = this.props;

//     return (
//       <div className='container'>
//         <Card>
//           <CardMedia
//             component='img'
//             alt={`${animal.name} picture`}
//             image={animal.picture}
//             height='500'
//             width='80'
//             className='media'
//           />
//           <CardContent>
//             <Typography variant='h5' component='div'>
//               {animal.name}
//             </Typography>
//             <Typography variant='body1' component='div'>
//               Latin Name: {animal.latinName}
//             </Typography>
//             <Typography variant='body1' component='div'>
//               Type: {animal.animalType}
//             </Typography>
//             <Typography variant='body1' component='div'>
//               Diet: {animal.diet}
//             </Typography>
//             <Typography variant='body1' component='div'>
//               Habitat: {animal.habitat}
//             </Typography>
//             <Typography variant='body1' component='div'>
//               Location: {animal.location}
//             </Typography>
//             <Typography variant='body1' component='div'>
//               LifeSpan: {animal.lifeSpan} years!
//             </Typography>
//             <Typography variant='body1' component='div'>
//               Price: ${animal.price}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button
//               variant='contained'
//               color='primary'
//               size='small'
//               onClick={() => {
//                 // console.log("button is clicked but nothing happens");
//               }}
//             >
//               Adopt Me!
//             </Button>
//           </CardActions>
//         </Card>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   animal: state.animal,
// });
// const mapDispatchToProps = (dispatch) => ({
//   getAnimal: (id) => dispatch(fetchAnimal(id)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(SingleAnimal);
