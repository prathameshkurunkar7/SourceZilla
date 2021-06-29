import React from 'react';
import { Paper, CssBaseline, ThemeProvider, Typography } from '@material-ui/core';
import { useStyle, theme } from './styles';
import Navbar from './../../Navbar'

export default function MaterialLayout(props) {
  const { children } = props;
  const classes = useStyle();

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <div className={classes.root}>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant="h5" color="textSecondary" align="center" gutterBottom>
            Share Your Interview Experience
          </Typography>
          {children}
        </Paper>
      </div>
    </ThemeProvider>
  );
}
