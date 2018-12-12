// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import { AppBar } from '@material-ui/core';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// // import MenuIcon from '@material-ui/icons/Menu';

// const styles = {
//   root: {
//     flexGrow: 1
//   },
//   grow: {
//     flexGrow: 1
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20
//   }
// };

// class Header extends Component {
//   // logout = () => {
//   //   return (window.location.href = '/api/logout');
//   // };

//   renderContent() {
//     switch (this.props.auth) {
//       case null:
//         return;
//       case false:
//         return (
//           <Button color="inherit" component={Link} to="/login">
//             Login
//           </Button>
//         );
//       default:
//         return (
//           // onClick={this.logout()}
//           <Button
//             color="inherit"
//             onClick={(e) => {
//               e.preventDefault();
//               window.location.href = '/api/logout';
//             }}>
//             Logout
//           </Button>
//         );
//     }
//   }

//   render() {
//     return (
//       <div className={this.props.classes.root}>
//         <AppBar position="static">
//           <Toolbar>
//             <Button color="inherit" component={Link} to="/">
//               <Typography variant="h6" color="inherit" noWrap>
//                 We-Team
//               </Typography>
//             </Button>

//             {this.renderContent()}
//           </Toolbar>
//         </AppBar>
//       </div>
//     );
//   }
// }

// Header.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// //get the state{auth: reducers } from reducers/index
// const mapStateToProps = ({ auth }) => {
//   return { auth };
// };

// export default withStyles(styles)(connect(mapStateToProps)(Header));

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
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
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

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
              {this.renderContent()}
            </Button>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
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
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            )}
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
  return { auth };
};

export default withStyles(styles)(connect(mapStateToProps)(Header));
