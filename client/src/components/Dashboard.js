import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Modal, Icon, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

import ModalCreateRequest from './dashboard/ModalCreateRequest';

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
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `fade(${theme.palette.common.white}, 0.15),
    '&:hover': {
      backgroundColor: fade(${theme.palette.common.white}, 0.25)
    }`,
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 6,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateRequest: false
    };
  }

  showCreateRequest = () => {
    this.setState({ showCreateRequest: true });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item lg={12}>
            <Typography variant="h6" color="inherit" noWrap>
              Dashboard
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/request/new';
              }}>
              Create Request
            </Button>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>

            <TextField
              id="outlined-email-input"
              label="Keywords"
              className={classes.textField}
              type="text"
              name="search"
              autoComplete="email"
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
