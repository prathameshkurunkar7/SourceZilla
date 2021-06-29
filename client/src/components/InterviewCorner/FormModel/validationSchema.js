import * as Yup from 'yup';
import ModelForm from './ModelForm';
import moment from 'moment'
const {
  formField: {
    role, passoutYear,
    branch, status, intro, prep, appProcess, suggestions, roundInfo, roundTips, roundName
  }
} = ModelForm;

export default [
  Yup.object().shape({
    [role.name]: Yup.string().required(`${role.requiredErrorMsg}`),
    [passoutYear.name]: Yup.string()
      .nullable()
      .required(`${passoutYear.requiredErrorMsg}`)
      .test('passoutYear', passoutYear.invalidErrorMsg, val => {
        if (val) {
          const startDate = new Date();
          const endDate = new Date(2050, 12, 31);
          if (moment(val, moment.ISO_8601).isValid()) {
            return moment(val).isBetween(startDate, endDate);
          }
          return false;
        }
        return false;
      }),
    [branch.name]: Yup.string().required(`${branch.requiredErrorMsg}`),
    [status.name]: Yup.string().nullable().required(`${status.requiredErrorMsg}`),
    [intro.name]: Yup.string()
      .required(`${intro.requiredErrorMsg}`)
      .test('len', `${intro.lengthErrorMsg}`, val => val && val.length < 300),
  }),
  Yup.object().shape({
    [prep.name]: Yup.string().required(`${prep.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [appProcess.name]: Yup.string().required(`${appProcess.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    rounds: Yup.array().of(
      Yup.object().shape({
        roundName: Yup.string().required(`${roundName.requiredErrorMsg}`),
        roundInfo: Yup.string().required(`${roundInfo.requiredErrorMsg}`),
        roundTips: Yup.string().required(`${roundTips.requiredErrorMsg}`)
      }),
    ),
  }),
  Yup.object().shape({
    [suggestions.name]: Yup.string().required(`${suggestions.requiredErrorMsg}`),
  }),
];
