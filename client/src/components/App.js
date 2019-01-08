import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

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

const SurveyNew = () => {
  return <h2>SurveyNew</h2>;
};

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchExpertAreas();
  }

  render() {
    return (
      <div className="container">
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
            <Route path="/surveys/new" component={SurveyNew} />
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

export default connect(
  null,
  actions
)(App); //this makes all of the actions assigned to App as props so you can call them with this.props. fetchUser()
