import React from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions';
import { reduxForm, Field } from 'redux-form';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
const styles = (theme) => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  }
});

const renderCheckboxes = ({ input, areas }) => {
  // console.log('checkbox input: ', input);
  // console.log('checkbox areas: ', areas);
  // console.log('checkbox auth: ', auth);
  // input.value = auth.expertAreas;

  return (
    <FormGroup>
      {areas.map((area) => (
        <FormControlLabel
          key={area._id}
          control={
            <Checkbox
              // {...input}
              // key={area}
              label={area.name}
              name={area.name}
              value={area._id}
              checked={input.value.indexOf(area._id) !== -1}
              onChange={(event) => {
                const newValue = [...input.value];
                if (event.target.checked) {
                  newValue.push(area._id);
                } else {
                  newValue.splice(newValue.indexOf(area._id), 1);
                }
                input.onBlur(newValue);
                return input.onChange(newValue);
              }}
            />
          }
          label={area.name}
        />
      ))}
    </FormGroup>
  );
};

class EditExpertAreasForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(values) {
    // console.log({ values });
    // e.preventDefault();
    // // console.log('props: ', this.props);
    const { updateProfile } = this.props; //this redux action was included in props when we wired it up w/ connect()
    // const expertAreas = this.props.editExpertAreas;
    updateProfile(values);
    this.props.close();
  }

  render() {
    // console.log('props: ', this.props);
    const { classes, expertAreas, handleSubmit } = this.props;

    return (
      <div className={classes.root}>
        <form
          onSubmit={handleSubmit((values) => {
            this.handleSave(values);
          })}>
          <FormControl component="fieldset" className={classes.formControl}>
            <Typography>Expert Areas</Typography>
            <Field
              name="expertAreas"
              areas={expertAreas}
              component={renderCheckboxes}
            />

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

EditExpertAreasForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  // console.log('form info: ', state.auth);
  return {
    initialValues: { expertAreas: state.auth.expertAreas },
    expertAreas: state.expertAreas
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { updateProfile }
  )(
    reduxForm({
      form: 'editProfileForm'
    })(EditExpertAreasForm)
  )
);
