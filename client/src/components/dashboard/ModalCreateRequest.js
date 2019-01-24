import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { FormControl, Button } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions';
import { TextField, Typography } from '@material-ui/core';
import Test from '../../components/Test';
const styles = (theme) => ({
  root: { padding: '20px' },
  formControl: {
    margin: theme.spacing.unit * 2
  },
  container: {
    // display: 'flex',
    // flexWrap: 'wrap'
  },
  textbox: {
    paddingBottom: '20px'
  },
  button: {
    margin: theme.spacing.unit
  }
});

const renderTextInput = ({ input }) => {
  //  console.log('checkbox input: ', input);

  return (
    <TextField
      rows="4"
      id="outlined-multiline-flexible"
      variant="outlined"
      multiline
      fullWidth
      {...input}
    />
  );
};

class ModalCreateRequest extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSave(values) {
    const { updateProfile } = this.props; //this redux action was included in props when we wired it up w/ connect()
    // console.log({ about });
    updateProfile(values);
    this.props.close();
  }

  render() {
    // console.log('props: ', this.props);
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form
          onSubmit={this.props.handleSubmit((values) =>
            this.handleSave(values)
          )}
          className={classes.container}>
          <Typography variant="h6">About Me</Typography>
          <Field name="about" component={renderTextInput} />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit">
            Save
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={this.props.close}>
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

ModalCreateRequest.propTypes = {
  classes: PropTypes.object.isRequired
};

// const mapStateToProps = (state) => {
//   //console.log('map state to props: {state} : ', state);
//   return {
//     auth: state.auth,
//     initialValues: { about: state.auth.about }
//   };
// };
export default withStyles(styles)(
  connect(
    null,
    { updateProfile }
  )(
    reduxForm({
      form: 'editProfileForm'
    })(ModalCreateRequest)
  )
);
