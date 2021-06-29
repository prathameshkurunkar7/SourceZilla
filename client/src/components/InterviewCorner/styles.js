import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  button: {
    marginTop: theme.spacing(3),
  },
  wrapper: {
    // margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.3em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
    '*::-webkit-scrollbar-thumb': {
      borderRadius: 20,
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0, 0, 0, 0.5)'
    }
  }
}));
