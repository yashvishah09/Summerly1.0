import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ component: Component, auth: { isAuthenticated, loading }, ...rest }) {
  return (
    <div>
      <Route {...rest} render={(props) => (!isAuthenticated && !loading ? <Redirect to='/signin' /> : <Component {...props} />)} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
