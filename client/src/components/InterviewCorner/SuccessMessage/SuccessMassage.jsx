import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function CheckoutSuccess() {

  const { goBack } = useHistory()

  useEffect(() => {
    setTimeout(() => {
      goBack()
    }, 2000)
  }, [])

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Thank you for sharing your experience
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        we will get back soon
      </Typography>
    </React.Fragment>
  );
}

export default CheckoutSuccess;
