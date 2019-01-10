import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const axios = require('axios');

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

// class Signin extends React.Component {
//   state = {
//     redirectToReferrer: false
//   };

//   signin = () => {
//     this.props.signin();
//   };
// }

class Login extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  state = { email: '', password: '', error: '' };
  signin = (e) => {
    e.preventDefault();
    console.log('sign in clicked', this.state);
    axios
      .post('/auth/login')
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => console.log(err));
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        {/* <CssBaseline /> */}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.signin}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.email}
                onChange={this.handleEmail}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handlePassword}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
