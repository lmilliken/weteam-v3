import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Header extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };

  handleChange = (event) => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderContent() {
    //console.log('props in Header renderContent(): ', this.props);
    const open = Boolean(this.state.anchorEl);
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Fragment>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="secondary" component={Link} to="/register">
              Sign Up
            </Button>
          </Fragment>
        );
      default:
        return (
          // onClick={this.logout()}
          <Fragment>
            <Button
              color="inherit"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/api/logout';
              }}>
              Logout
            </Button>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={this.handleClose}>
              <MenuItem
                component={Link}
                to="/profile"
                onClick={this.handleClose}>
                Profile
              </MenuItem>
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            </Menu>
          </Fragment>
        );
    }
  }

  render() {
    const { classes } = this.props;

    //   console.log('Header: auth prop: ', this.props.auth);
    // console.log('Header rendering...');
    // console.log('Header props: ', this.props);
    // logout = () => {
    //   return (window.location.href = '/api/logout');
    // };

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Button color="inherit" component={Link} to="/">
              <Typography variant="h6" color="inherit" noWrap>
                We-Team
              </Typography>
            </Button>
            {this.renderContent()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => {
  // console.log('hearder auth: ', auth);
  return { auth };
};

export default withStyles(styles)(connect(mapStateToProps)(Header));
