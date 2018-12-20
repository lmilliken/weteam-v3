import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
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

const renderCheckbox = ({ input, label }) => (
  <FormControlLabel
    control={<Checkbox name="expertAreas2" value={label} />}
    label={label}
  />
);

class EditExpertAreas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gilad: true,
      jason: false,
      antoine: false
    };

    this.handleClose = this.handleClose.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSave = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  handleClose() {
    this.props.close();
  }

  render() {
    console.log('props: ', this.props);
    const { classes, auth, expertAreas } = this.props;

    const list = expertAreas.map((area) => (
      <Field
        key={area}
        name="expertAreas"
        component={renderCheckbox}
        label={area}
        value={area}
      />
      // <FormControlLabel
      //   key={list}
      //   control={
      //     <Checkbox
      //       key={list}
      //       onChange={this.handleChange('gilad')}
      //       value={area}
      //     />
      //   }
      //   label={area}
      // />
    ));

    return (
      <div className={classes.root}>
        <form
          onSubmit={this.props.handleSubmit(() =>
            console.log('props: ', this.props)
          )}>
          <FormControl component="fieldset" className={classes.formControl}>
            <IconButton onClick={this.handleClose}>
              <Icon>close</Icon>
            </IconButton>
            <FormGroup>{list}</FormGroup>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.handleClose}>
              Cancel
            </Button>
          </FormControl>
        </form>
      </div>
    );
  }
}

EditExpertAreas.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  console.log({ state });
  return { auth: state.auth, expertAreas: state.expertAreas };
};

export default withStyles(styles)(
  connect(mapStateToProps)(
    reduxForm({
      form: 'editExpertAreas',
      destroyOnUnmount: false
    })(EditExpertAreas)
  )
);
