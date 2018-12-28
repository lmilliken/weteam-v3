import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { connect } from 'react-redux';
import * as actions from '../../actions';

const styles = (theme) => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  }
});

// const renderCheckbox = ({ input, label }) => (
//   <FormControlLabel
//     control={
//       <Checkbox
//         name="expertAreas2"
//         value={label}
//         onChange={(event) => {
//           if (event.target.checked) {
//             console.log('checked');
//           } else {
//             console.log('unchecked');
//           }
//         }}
//       />
//     }
//     label={label}
//   />
// );
//props.input = {input}, we are getting the props from redux form <Field>
const renderCheckboxes = ({ input, areas }) => {
  // console.log('checkbox input: ', input);
  return (
    <FormGroup>
      {areas.map((area, index) => (
        // <input
        //   type="checkbox"
        //   name={area}
        //   value={area}
        //   onChange={(event) => {
        //     const newValue = [...input.value];
        //     if (event.target.checked) {
        //       newValue.push(area);
        //     } else {
        //       newValue.splice(newValue.indexOf(area), 1);
        //     }

        //     return input.onChange(newValue);
        //   }}
        // />
        <FormControlLabel
          key={area}
          control={
            <Checkbox
              // {...input}
              key={area}
              label={area}
              name={area}
              value={area}
              onChange={(event) => {
                const newValue = [...input.value];
                if (event.target.checked) {
                  newValue.push(area);
                } else {
                  newValue.splice(newValue.indexOf(area), 1);
                }
                input.onBlur(newValue);
                return input.onChange(newValue);
              }}
            />
          }
          label={area}
        />
      ))}
    </FormGroup>
  );
};

class EditExpertAreasForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSave(e) {
    e.preventDefault();
    const { updateProfileExpertAreas } = this.props; //this redux action was included in props when we wired it up w/ connect()
    const { expertAreas } = this.props.editExpertAreas.values;
    updateProfileExpertAreas({ expertAreas });
  }

  handleClose() {
    this.props.close();
  }

  render() {
    // console.log('props: ', this.props);
    const { classes, expertAreas } = this.props;

    // const list = expertAreas.map((area) => (
    //   <Field key={area} component={renderCheckbox} label={area} />

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
    // ));

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSave}>
          <FormControl component="fieldset" className={classes.formControl}>
            <IconButton onClick={this.handleClose}>
              <Icon>close</Icon>
            </IconButton>

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
              onClick={this.handleClose}>
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
  // console.log('form info: ', state.form.editExpertAreas);
  return {
    auth: state.auth,
    expertAreas: state.expertAreas,
    editExpertAreas: state.form.editExpertAreas
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actions
  )(
    reduxForm({
      form: 'editExpertAreas'
      // destroyOnUnmount: false
    })(EditExpertAreasForm)
  )
);
