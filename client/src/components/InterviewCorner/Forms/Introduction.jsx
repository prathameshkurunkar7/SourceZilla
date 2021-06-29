import React from 'react';
import { Grid } from '@material-ui/core';
import { InputField, SelectField, DatePickerField, CheckboxField } from './../FormFields';

const statusArray = [{ value: null, label: 'None' }, { value: 'Selected', label: 'Selected' }, { value: 'Rejected', label: 'Rejected' }]

export default function Introduction(props) {
  const {
    formField: {
      role, passoutYear, branch, status, intro, interCollege
    }
  } = props;
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField placeholder="Ex. SDE" name={role.name} label={role.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerField
            name={passoutYear.name}
            label={passoutYear.label}
            format="yyyy"
            views={['year']}
            minDate={new Date()}
            maxDate={new Date('2050/12/31')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField placeholder="Ex. Computer Engg." name={branch.name} label={branch.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={status.name}
            label={status.label}
            data={statusArray}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField placeholder="Ex. Who are you?" multiline rows={5} name={intro.name} label={intro.label} fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
