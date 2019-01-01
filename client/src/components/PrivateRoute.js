import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

//component: Component renames the incoming component property (component={Profile}) to be a capital C so we can redender it as an object in JSX
//..rest spreads the rest of the arguments (?)
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  console.log('PrivateRoutes auth props: ', auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth) {
          return <Redirect to="/login" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

//grabbing state.auth and assigning it as a prop, we get state from connect()
const mapStateToProps = ({ auth }) => {
  //   console.log('map state to props: {state} : ', state);
  return {
    auth
  };
};
export default connect(mapStateToProps)(PrivateRoute);
