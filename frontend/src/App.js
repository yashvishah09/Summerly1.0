import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Home/Header';
import './App.css';
import Home from './components/Home/Home';
import AddListing from './components/Listings/AddListing';
import CreateAccount from './components/CreateAccount/CreateAccount';
import SignIn from './components/SignIn/SignIn';
import Alert from './components/layouts/Alert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Dashboard from './components/Dashboard/Dashboard';
import EditProfile from './components/Dashboard/EditProfile';
import Listings from './components/Listings/Listings';
import ShowListing from './components/Listings/ShowListing';
import EditListing from './components/Listings/EditListing';

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Router>
          <Header />
          <Alert />
          <div className='app'>
            <Switch>
              <Route path='/' exact component={Home} />
              <PrivateRoute path='/addlisting' exact component={AddListing} />
              <Route path='/signup' exact component={CreateAccount} />
              <Route path='/signin' exact component={SignIn} />
              <Route path='/forgotpassword' exact component={ForgetPassword} />
              <Route path='/editprofile' exact component={EditProfile} />
              <PrivateRoute path='/dashboard' exact component={Dashboard} />
              <Route path='/listings' exact component={Listings} />
              <Route path='/listings/:id' exact component={ShowListing} />
              <Route path='/updatelistings/:id' exact component={EditListing} />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
