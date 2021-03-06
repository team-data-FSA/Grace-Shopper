import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import AllAnimals from './components/AllAnimals';
import SingleAnimal from './components/SingleAnimal';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import Users from './components/Users';
import UserProfile from './components/UserProfile';
import OrdersList from './components/OrdersList';
import OrderCheckout from './components/OrderCheckout';
import AddAnimal from './components/AddAnimal';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path='/animals' exact component={AllAnimals} />
            <Route path='/animals/:id' exact component={SingleAnimal} />
            <Route path='/users' component={Users} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/confirmation' component={Confirmation} />
            <Route path='/profile' component={UserProfile} />
            <Route path='/add' component={AddAnimal} />
            <Route path='/orders' component={OrdersList} />
            <Route path='/order-checkout' component={OrderCheckout} />
            <Redirect to='/animals' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/animals' exact component={AllAnimals} />
            <Route path='/animals/:id' exact component={SingleAnimal} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/confirmation' component={Confirmation} />
            {/* <Route path='/' exact component={Login} /> */}
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/order-checkout' component={OrderCheckout} />
            <Redirect to='/animals' />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
