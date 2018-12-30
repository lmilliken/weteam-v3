import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import { TextField } from '@material-ui/core';
import { updateProfile } from '../../actions';

const styles = (theme) => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

const renderTextInput = ({ input }) => {
  // console.log('checkbox input: ', input);

  return <TextField rows="4" fullWidth {...input} />;
};

class EditAboutForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSave(e) {
    e.preventDefault();
    // console.log('props: ', this.props);
    const { updateProfile } = this.props;
    const about = this.props.editAbout; //this is from mapStateToProps
    updateProfile({ about }); //this redux action was included in props when we wired it up w/ connect()
    // console.log({ about });
    this.props.close();
  }

  render() {
    // console.log('props: ', this.props);
    const { classes, about } = this.props;

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSave} className={classes.container}>
          <FormControl component="fieldset" className={classes.formControl}>
            <IconButton onClick={this.props.close}>
              <Icon>close</Icon>
            </IconButton>

            <Field name="about" component={renderTextInput} />
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.props.close}>
              Cancel
            </Button>
          </FormControl>
        </form>
      </div>
    );
  }
}

EditAboutForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  // console.log('map state to props: {state} : ', state);
  return {
    auth: state.auth,
    initialValues: { about: state.auth.about },
    editAbout:
      state.form.editProfileForm && state.form.editProfileForm.values.about
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actions
  )(
    reduxForm({
      form: 'editProfileForm'
      // destroyOnUnmount: false
    })(EditAboutForm)
  )
);
