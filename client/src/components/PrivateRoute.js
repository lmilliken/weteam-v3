import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Login from './Login';

//component: Component renames the incoming component property (component={Profile}) to be a capital C so we can redender it as an object in JSX
//..rest spreads the rest of the arguments (?)
// const PrivateRoute = ({ component: Component, auth, ...rest }) => {
class PrivateRoute extends React.Component {
  //   debugger;
  state = {};
  renderContent() {
    console.log('props in PrivateRoute renderContent(): ', this.props);
    return <Redirect to="/login" />;
    // switch (this.props.auth) {
    //   case null:
    //     return <Redirect to="/login" />;
    //   case false:
    //     return <Redirect to="/login" />;
    //   default:
    //     return <Redirect to="/login" />;
    // }
  }
  render() {
    //    const props = this.props;
    console.log('props in Private Route', this.props);

    const { component: Component, path, auth, ...rest } = this.props;

    switch (auth) {
      case null:
        return <Route path={path} component={Login} />;
      case false:
        return <Route path={path} component={Login} />;
      default:
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    }
    //  console.log('PrivateRoutes auth props: ', auth);
    // return (
    //   //      <Redirect to="/login" />
    //   <Route
    //     {...rest}
    //     render={(props) => {
    //       console.log('props inside of render: ', props);

    //       if (!auth) {
    //         return <Redirect to="/login" />;
    //       }

    //       return <Component {...props} />;
    //     }}
    //   />

    //   <Route
    //   {...rest}
    //   render={(props) => {
    //     if (!auth) {
    //       return <Redirect to="/login" />;
    //     }

    //     return <Component {...props} />;
    //   }}
    // />
    // );
  }
}

//grabbing state.auth and assigning it as a prop, we get state from connect()
//debugger;
const mapStateToProps = (state) => {
  // console.log('map state to props: {state} : ', state);
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(PrivateRoute);
