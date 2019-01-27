import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchUser } from '../actions';

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import DropDownSelect from './shared/DropDownSelect';

const axios = require('axios');

const styles = (theme) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3
    // [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
    //   width: 400,
    //   marginLeft: 'auto',
    //   marginRight: 'auto'
    // }
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

// class Signin extends React.Component {
//   state = {
//     redirectToReferrer: false
//   };

//   signin = () => {
//     this.props.signin();
//   };
// }

class Request extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  state = { email: '', password: '', error: '', redirectToReferrer: false };
  signin = (e) => {
    e.preventDefault();
    console.log('sign in clicked', this.state);
    axios
      .post('/auth/login', this.state)
      .then(async (res) => {
        console.log({ res });
        await this.props.fetchUser();
        this.setState({ redirectToReferrer: true });
      })
      .catch((err) => this.setState({ error: 'Invalid Credentials' }));
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  renderTextField = (props) => {
    console.log('props here: ', props);
    // { input, label, meta: { touched, error }, ...custom }
    return (
      <TextField
        id="standard-full-width"
        // label={label}
        // // hintText={label}
        // // floatingLabelText={label}
        // // errorText={touched && error}
        // {...input}
        // {...custom}
      />
    );
  };

  renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => (
    <Select
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  );

  getExpertAreaMenuItems = () => {
    console.log('props in getExpertAreaMenuItems', this.props);
    const { expertAreas } = this.props;
    console.log('I am called');
    if (expertAreas) {
      return expertAreas.map((area) => (
        <MenuItem value={area.id}>{area.name}</MenuItem>
      ));
    } else {
      return null;
    }
  };

  render() {
    const { classes, expertAreas, requestStatuses } = this.props;
    // console.log({ expertAreas });
    // console.log('state: ', this.state);
    //console.log('props in Request: ', this.props);

    let { from } = this.props.location.state || { from: { pathname: '/' } };

    //    console.log({ from });
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      //   console.log('redirecting to: ', from.pathname);
      return <Redirect to={from.pathname} />;
    }
    return (
      <div className={classes.main}>
        {/* <CssBaseline /> */}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Request
          </Typography>
          <form className={classes.form} onSubmit={this.signin}>
            <Field
              name="title"
              component={this.renderTextField}
              label="Title"
              fullWidth //gets passed as part of {...custom} props
            />
            {expertAreas && (
              <Field
                name="request-type"
                // component="select"
                label="Type of Request"
                component={DropDownSelect}
                className="form-control"
                items={expertAreas}
              />
            )}

            {requestStatuses && (
              <Field
                name="request-status"
                // component="select"
                label="Status"
                component={DropDownSelect}
                className="form-control"
                items={requestStatuses}
              />
            )}
            <Field
              name="description"
              // component="select"
              label="Description"
              component={this.renderTextField}
              className="form-control"
              fullWidth //gets passed as part of {...custom} props
              // rows="4"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Sign in
            </Button>
          </form>
          <Typography>Or signin with</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/auth/google';
            }}>
            Google
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/auth/google';
            }}>
            Facebook
          </Button>
        </Paper>

        <Typography component={Link} to="/register">
          Don't have a login? Signup.
        </Typography>
      </div>
    );
  }
}

// onClick={() => {
//   window.location.href = '/auth/google';
// }}>

Request.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  //console.log('state: ', state);
  return {
    expertAreas: state.expertAreas,
    requestStatuses: state.shared.requestStatuses
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(reduxForm({ form: 'request' })(Request))
);
