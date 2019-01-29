import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchUser } from '../actions';

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DropDownSelect from './shared/DropDownSelect';

import { createRequest } from '../actions';

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
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    margin: theme.spacing.unit
  }
});

class Request extends React.Component {
  state = { email: '', password: '', error: '', redirectToReferrer: false };

  handleSubmit = (e) => {
    console.log({ e });
    const { createRequest } = this.props;
    createRequest(e);
  };

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
    // console.log('props here: ', props);
    // { input, label, meta: { touched, error }, ...custom }
    return (
      <TextField
        id="standard-full-width"
        label={label}
        // hintText={label}
        // floatingLabelText={label}
        // errorText={touched && error}
        {...input}
        {...custom}
      />
    );
  };

  render() {
    const { classes, expertAreas, requestStatuses } = this.props;
    // console.log({ expertAreas });
    // console.log('state: ', this.state);
    console.log('props in Request: ', this.props);

    let { from } = this.props.location.state || { from: { pathname: '/' } };

    //    console.log({ from });
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      //   console.log('redirecting to: ', from.pathname);
      return <Redirect to={from.pathname} />;
    }
    return (
      <div className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Request
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.props.handleSubmit((values) =>
              this.handleSubmit(values)
            )}>
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
              fullWidth //gets passed as part of {...custom} props
              rows="4"
              multiline
              variant="outlined"
              className={classes.textField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}>
              Create
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/dashboard';
              }}>
              Cancel
            </Button>
          </form>
        </Paper>
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
    requestStatuses: state.shared.requestStatuses,
    initialValues: { 'request-status': '5c4d31703ffe6944748330c0' }
  };
};
export default withStyles(styles)(
  connect(
    mapStateToProps,
    { createRequest }
  )(reduxForm({ form: 'request' })(Request))
);
