import React from 'react';
import { Grid } from '@material-ui/core';
import { InputField } from './../FormFields';

export default function Preparation(props) {
  const {
    formField: { prep }
  } = props;

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InputField
            name={prep.name}
            label={prep.label}
            fullWidth
            multiline
            rows={5}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
