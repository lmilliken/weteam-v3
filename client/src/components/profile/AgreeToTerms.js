import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
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

class AgreeToTerms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: false };
    this.agreeToTerms = this.agreeToTerms.bind(this);
  }

  agreeToTerms() {
    console.log('button clicked');
    axios.post('/api/agreetoterms').then((res) => {
      console.log(res);
      this.setState({ redirectToReferrer: true });
    });
  }

  render() {
    console.log('state: ', this.state);
    console.log('props in Terms: ', this.props);

    let { from } = this.props.location.state || { from: { pathname: '/' } };

    console.log({ from });
    let { redirectToReferrer } = this.state;
    const { classes } = this.props;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div className={classes.main}>
        {/* <CssBaseline /> */}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Terms and Conditions
          </Typography>
          <form className={classes.form} />
          <Typography component="h5" variant="h5">
            Terms and Conditions
          </Typography>
          <Button
            onClick={this.agreeToTerms}
            variant="contained"
            color="primary"
            type="submit">
            I agree
          </Button>
        </Paper>
      </div>
    );
  }
}

// onClick={() => {
//   window.location.href = '/auth/google';
// }}>

AgreeToTerms.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AgreeToTerms);
