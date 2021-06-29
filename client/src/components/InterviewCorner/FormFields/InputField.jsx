import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

export default function InputField(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);

  // console.log(field, meta)

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }

  return (
    <TextField
      type="text"
      InputLabelProps={{
        shrink: true,
      }}
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}
      multiline
      {...field}
      {...rest}
    />
  );
}