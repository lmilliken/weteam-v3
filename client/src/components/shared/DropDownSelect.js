import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class DropDownSelect extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  renderSelectOptions = (item) => (
    <MenuItem key={item._id} value={item._id}>
      {item.name}
    </MenuItem>
  );

  render() {
    console.log('props: ', this.props);
    const { input, label, name, classes } = this.props;
    console.log({ input });
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Select {...input}>
          {/* <MenuItem value="">Select</MenuItem> */}
          {this.props.items.map(this.renderSelectOptions)}
        </Select>
      </FormControl>
    );
  }
}

// function DropDownSelect(person) {
//   return (
//     <option key={person} value={person}>{person}</option>
//   );
// }

export default withStyles(styles)(DropDownSelect);
