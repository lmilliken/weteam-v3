import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

class Profile extends React.Component {
  render() {
    const { classes, auth } = this.props;

    console.log('props: ', auth);
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item sm={3} xs={12}>
            <Paper className={classes.paper}>
              {/* <Avatar
                alt={this.props.auth.nameLast}
                src={this.props.auth.profileImage}
                className={classes.bigAvatar}
              /> */}
            </Paper>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withStyles(styles)(connect(mapStateToProps)(Profile));
