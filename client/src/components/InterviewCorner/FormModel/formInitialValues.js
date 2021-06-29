import Model from './ModelForm';
const {
  formField: {
    role, passoutYear,
    branch, status, intro, prep, appProcess, suggestions
  }
} = Model;

export default {
  [role.name]: '',
  [passoutYear.name]: '',
  [branch.name]: '',
  [status.name]: '',
  [intro.name]: '',
  [prep.name]: '',
  [appProcess.name]: '',
  [suggestions.name]: '',
};
