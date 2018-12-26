import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import EditExpertAreasForm from './profile/EditExpertAreasForm';

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    // textAlign: 'center',
    color: theme.palette.text.secondary
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  modal: {
    // position: 'absolute',
    width: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    margin: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto'
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editExpertise: false,
      editProfileDesc: false
    };
    this.editExpertise = this.editExpertise.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    console.log('closing: ', this.state);
    this.setState({ editExpertise: false });
  }

  editExpertise() {
    console.log('editing');
    this.setState({ editExpertise: true });
  }
  render() {
    const { classes, auth } = this.props;
    console.log('props: ', this.props);
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item sm={3} xs={12}>
            <Paper className={classes.paper}>
              <Avatar
                alt={this.props.auth && this.props.auth.nameLast}
                src={this.props.auth && this.props.auth.profileImage}
                className={classes.bigAvatar}
              />
              <Typography variant="h6" color="inherit" noWrap>
                {this.props.auth && this.props.auth.nameFirst}{' '}
                {this.props.auth && this.props.auth.nameLast}
              </Typography>
            </Paper>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6" color="inherit" noWrap>
                Expert Areas
              </Typography>
              <IconButton onClick={this.editExpertise}>
                <Icon>edit</Icon>
              </IconButton>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.editExpertise}
                onClose={this.handleClose}>
                <div className={classes.modal}>
                  <EditExpertAreasForm close={this.handleClose} />
                </div>
              </Modal>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, expertAreas }) => {
  return { auth, expertAreas };
};

export default withStyles(styles)(connect(mapStateToProps)(Profile));
