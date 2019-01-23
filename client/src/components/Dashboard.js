import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: '2%'
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) !important',
    backgroundColor: 'white'
  }
});

class Dashboard extends Component {
  state = { showCreateRequest: false };

  showCreateRequest() {
    this.setState({ showCreateRequest: true });
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item lg={12}>
          <Paper>
            <Typography variant="h6" color="inherit" noWrap>
              Dashboard
            </Typography>
            <Button color="primary" onClick={this.showCreateRequest}>
              Create Request
            </Button>
          </Paper>
        </Grid>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={true}>
          <div className={classes.modal}>Modal</div>
        </Modal>
      </Grid>
    );
  }
}

export default withStyles(styles)(Dashboard);
