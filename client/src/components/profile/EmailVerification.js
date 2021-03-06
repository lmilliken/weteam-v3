import React from 'react';

import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

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
  }
});

class EmailVerification extends React.Component {
  state = { message: '' };
  sendEmailVerification = () => {
    console.log('resend email');
    axios
      .get('/auth/resendemailverficiation')
      .then((res) => {
        console.log(res);
        this.setState({ message: 'Account verification email sent!' });
      })
      .catch((err) => console.log('error: ', err));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        {/* <CssBaseline /> */}
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Thank you for registering. Please check your email account to
            activate your account.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.sendEmailVerification}
            className={classes.submit}>
            Send Email Again
          </Button>
          <Typography component="h1" variant="h5">
            {this.state.message}{' '}
          </Typography>
        </Paper>
      </div>
    );
  }
}

// onClick={() => {
//   window.location.href = '/auth/google';
// }}>

EmailVerification.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmailVerification);
