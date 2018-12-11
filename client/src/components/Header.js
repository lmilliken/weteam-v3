import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

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

class Header extends Component {
  // logout = () => {
  //   return (window.location.href = '/api/logout');
  // };

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        );
      default:
        return (
          // onClick={this.logout()}
          <Button
            color="inherit"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/api/logout';
            }}>
            Logout
          </Button>
        );
    }
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
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

//get the state{auth: reducers } from reducers/index
const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withStyles(styles)(connect(mapStateToProps)(Header));
