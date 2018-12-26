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
import { TextField } from 'redux-form-material-ui';
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
  console.log('checkbox input: ', input);
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

const renderTextField = ({ input }) => {
  console.log('test input values: ', input);
  return <TextField id="standard-name" label="Name" margin="normal" />;
};

const CheckboxGroup = ({ label, required, name, options, input, meta }) => (
  <FormGroup controlId={name}>
    <FormControlLabel>{label}</FormControlLabel>
    {options.map((option, index) => (
      <div className="checkbox" key={index}>
        <label>
          <input
            type="checkbox"
            name={`${name}[${index}]`}
            value={option.name}
            checked={input.value.indexOf(option.name) !== -1}
            onChange={(event) => {
              const newValue = [input.value];
              if (event.target.checked) {
                newValue.push(option.name);
              } else {
                newValue.splice(newValue.indexOf(option.name), 1);
              }

              return input.onChange(newValue);
            }}
          />
          {option.name}
        </label>
      </div>
    ))}
  </FormGroup>
);

class EditExpertAreasForm extends React.Component {
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
    // console.log('props: ', this.props);
    const { classes, auth, expertAreas } = this.props;

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
        <form
          onSubmit={this.props.handleSubmit((values) =>
            console.log('values: ', values)
          )}>
          <FormControl component="fieldset" className={classes.formControl}>
            <IconButton onClick={this.handleClose}>
              <Icon>close</Icon>
            </IconButton>
            <Field name="testtextfield" component={renderTextField} />

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
  console.log('form info: ', state.form.editExpertAreas);
  return { auth: state.auth, expertAreas: state.expertAreas };
};

export default withStyles(styles)(
  connect(mapStateToProps)(
    reduxForm({
      form: 'editExpertAreas',
      destroyOnUnmount: false
    })(EditExpertAreasForm)
  )
);
