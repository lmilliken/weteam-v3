import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withStyles } from '@material-ui/core/styles';

import PrivateRoute from './PrivateRoute';
import Header from './Header';
import Landing from './Landing';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Register from './profile/Register';
import AgreeToTerms from './profile/AgreeToTerms';
import EmailVerification from './profile/EmailVerification';
// import Test from './Test';

const styles = (theme) => ({
  root: {
    display: 'grid'
    // color: 'pink'
  }
});

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchExpertAreas();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />

            <Route
              exact
              path="/emailverification"
              component={EmailVerification}
            />
            <Route exact path="/terms" component={AgreeToTerms} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// const mapStateToProps = ({ auth }) => {
//   return { auth };
// };

// export default withStyles(styles)(connect(mapStateToProps)

export default withStyles(styles)(
  connect(
    null,
    actions
  )(App)
); //this makes all of the actions assigned to App as props so you can call them with this.props. fetchUser()
