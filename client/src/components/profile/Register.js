import React from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions';

import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { SubmissionError } from 'redux-form';

const styles = (theme) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
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

const renderTextField = ({
  input,
  label,
  type,
  meta: { touched, error },
  ...custom
}) => (
  <div>
    <TextField
      type={type}
      label={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
    {touched && error}
  </div>
);

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
);

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { completed: false };
    this.register = this.register.bind(this);
  }

  register = async (values) => {
    // check to see if user email already exists

    // const duplicateEmailCheck = await axios.post('/api/checkdupemail', {
    //   email: values.email
    // });

    // if (duplicateEmailCheck.data === true) {
    //   throw new SubmissionError({
    //     email: 'User email already exists.  Please try logging in.',
    //     _error: 'Login failed!'
    //   });
    // }

    axios
      .post(`/api/register`, {
        ...values
      })
      .then((response) => {
        this.setState({ completed: true });
      })
      .catch((error) => console.log(error));

    // const { register } = this.props;
    // register(values);
    //might need logic to make sure that this succeeds before redirecting them?
  };

  render() {
    const { classes } = this.props;

    if (this.state.completed === true) {
      return (
        <div className={classes.main}>
          {/* <CssBaseline /> */}
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Thank you for registering. Please check your email account to
              activate your account.
            </Typography>
          </Paper>
        </div>
      );
    } else {
      return (
        <div className={classes.main}>
          {/* <CssBaseline /> */}
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form
              className={classes.form}
              onSubmit={this.props.handleSubmit((values) =>
                this.register(values)
              )}>
              <Field
                name="firstName"
                component={renderTextField}
                label="First Name"
              />
              <Field
                name="email"
                component={renderTextField}
                label="Email"
                type="email"
              />
              <Field
                name="password"
                component={renderTextField}
                label="Password"
                type="password"
              />
              <Field
                name="terms"
                component={renderCheckbox}
                label="I agree to the terms and condition of use."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Register
              </Button>
            </form>
            <Typography>Or register with</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/auth/google';
              }}>
              Google
            </Button>
          </Paper>
        </div>
      );
    }
  }
}

// onClick={() => {
//   window.location.href = '/auth/google';
// }}>

const mapStateToProps = (state) => {
  // console.log('map state to props: {state} : ', state);
  return {
    registerForm: state.form.registerForm
  };
};

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { register }
  )(
    reduxForm({
      form: 'registerForm'
      // destroyOnUnmount: false
    })(Register)
  )
);
