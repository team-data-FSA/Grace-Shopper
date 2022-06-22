import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchAnimals } from '../store/animals';
import { addToCart } from '../store/cart';
import { useSelector, useDispatch } from 'react-redux';
//The following are for Material-UI components
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
import MultipleSelectChip from './FilterTest';

const AllAnimals = () => {
  // pull state from Redux we also have access to auth
  const { animals: allAnimals, auth } = useSelector((state) => {
    return state;
  });
  const [filter, setFilter] = useState({ animalType: {}, name: '' });
  const [animals, setAnimals] = useState([]);
  const [limit, setLimit] = useState(10);
  //const [allFilters, setAllFilters] = useState([]);

  // useEffect(() => {
  //   console.log('all filters', allFilters);
  //   setFilter({ animalType: allFilters });
  // }, [allFilters]);

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
    console.log('filter changed', filter);
    doFilter();
    setLimit(10);
  }, [filter]);

  const doFilter = () => {
    let filterdAnimals = allAnimals;
    if (filter.name) {
      console.log('name');
      filterdAnimals = filterdAnimals.filter((animal) =>
        animal.name.toUpperCase().includes(filter.name.toUpperCase())
      );
    }
    if (filter.animalType.length > 0) {
      console.log('type', filter);
      filterdAnimals = filterdAnimals.filter((animal) =>
        filter.animalType.includes(animal.animalType)
      );
    }
    setAnimals(filterdAnimals);
  };

  useEffect(() => {
    doFilter();
  }, [allAnimals]);

  useEffect(() => {
    console.log('animals changed', animals);
  }, [animals]);
  let count = 0;

  return (
    <div>
      {/* <MultipleSelectChip /> */}
      <Filters query={query} setFilter={setFilter} filter={filter} />
      <Typography variant='h3' component='div'>
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
          <div>Loading Exotic Pets!</div> //this catches while the animals load may not be optimal solution
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

// Prior to React Hooks

// import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { fetchAnimals } from '../store/animals';

// //The following are for Material-UI components
// import {
//   Typography, //text
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
// } from '@material-ui/core';

// class AllAnimals extends React.Component {
//   componentDidMount() {
//     this.props.getAnimals();
//   }
//   render() {
//     return (
//       <div>
//         <Typography variant='h3' component='div'>
//           Welcome to our exotic shelter.
//         </Typography>
//         <ul className='container'>
//           {this.props.animals.length > 0 ? (
//             this.props.animals.map((animal) => (
//               <div className='card' key={animal.id}>
//                 <Card>
//                   <Link
//                     to={`animals/${animal.id}`}
//                     style={{ textDecoration: 'none', color: 'black' }}
//                   >
//                     <CardMedia
//                       component='img'
//                       alt={`${animal.name} picture`}
//                       image={animal.picture}
//                       height='400'
//                       className='media'
//                     />
//                     <CardContent>
//                       <Typography variant='h5' component='div'>
//                         {animal.name}
//                       </Typography>
//                       <Typography variant='body1' component='div'>
//                         {'$'}
//                         {animal.price}
//                       </Typography>
//                     </CardContent>
//                   </Link>
//                   <CardActions>
//                     <Button
//                       variant='contained'
//                       color='primary'
//                       size='small'
//                       onClick={() => {
//                         // console.log("button is clicked but nothing happens");
//                       }}
//                     >
//                       Adopt Me!
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </div>
//             ))
//           ) : (
//             <div>Loading Exotic Pets!</div> //this catches while the animals load may not be optimal solution
//           )}
//         </ul>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   animals: state.animals,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getAnimals: () => dispatch(fetchAnimals()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(AllAnimals);
