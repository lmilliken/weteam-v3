import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import { connect } from 'react-redux';
const styles = (theme) => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  }
});

class EditExpertAreas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gilad: true,
      jason: false,
      antoine: false
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  handleClose() {
    this.props.close();
  }

  render() {
    console.log('props: ', this.props);
    const { classes, auth, expertAreas } = this.props;

    const list = expertAreas.map((area) => (
      <FormControlLabel
        key={list}
        control={
          <Checkbox
            key={list}
            onChange={this.handleChange('gilad')}
            value={area}
          />
        }
        label={area}
      />
    ));

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <IconButton onClick={this.handleClose}>
            <Icon>close</Icon>
          </IconButton>
          <FormGroup>{list}</FormGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClose}>
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.handleClose}>
            Cancel
          </Button>
        </FormControl>
      </div>
    );
  }
}

EditExpertAreas.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, expertAreas }) => {
  return { auth, expertAreas };
};

export default withStyles(styles)(connect(mapStateToProps)(EditExpertAreas));
