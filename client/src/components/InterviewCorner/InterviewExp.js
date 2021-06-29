import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@material-ui/core';
import Button from './FormFields/ButtonControl'
import { Formik, Form } from 'formik';
import MLayout from './Layout/MaterialLayout'

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Introduction from './Forms/Introduction';
import Preparation from './Forms/Preparation';
import ApplicationProcess from './Forms/ApplicationProcess';
import Suggestions from './Forms/Suggestions';
import ReviewDetails from './ReviewDetails/ReviewDetails';
import SuccessMessage from './SuccessMessage/SuccessMassage';
import InterviewRounds from './Forms/Rounds'

import validationSchema from './FormModel/validationSchema';
import checkoutFormModel from './FormModel/ModelForm';
import formInitialValues from './FormModel/formInitialValues';

import { shareExperience } from '../../redux/actions/InterviewExpAction'

import useStyles from './styles';
import { useDispatch } from 'react-redux';

const steps = ['Introduction', 'Preparation', 'Application Process', 'Interview Rounds', 'Suggestions'];
const { formId, formField } = checkoutFormModel;

const emptyRound = { roundName: '', roundInfo: '', roundTips: '' }
const FinalInitialValues = { ...formInitialValues, rounds: [emptyRound], files: [] }
console.log(FinalInitialValues)

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <Introduction formField={formField} />;
    case 1:
      return <Preparation formField={formField} />;
    case 2:
      return <ApplicationProcess formField={formField} />;
    case 3:
      return <InterviewRounds formField={formField} />;
    case 4:
      return <Suggestions formField={formField} />;
    case 5:
      return <ReviewDetails />;
    default:
      return <div>Not Found</div>;
  }
}

export default function CheckoutPage(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    const formatedData = {
      contentUserInfo: {
        status: values.status,
        role: values.role,
        passoutYear: values.passoutYear,
        branch: values.branch,
        introduction: values.intro
      },
      contentPrep: values.prep,
      contentApplication: values.appProcess,
      contentSuggestion: values.suggestions,
      contentRounds: values.rounds.map(round => {
        return {
          roundName: round.roundName,
          description: round.roundInfo,
          tips: round.roundTips
        }
      }),
      companyId: props.match.params.companyId,
      myFiles: values.files
    }
    console.log(formatedData)
    let formData = new FormData();
    formData.append('contentPrep', formatedData.contentPrep)
    formData.append('contentUserInfo', JSON.stringify(formatedData.contentUserInfo))
    formData.append('contentApplication', formatedData.contentApplication)
    formData.append('contentSuggestion', formatedData.contentSuggestion)
    formData.append('contentRound', JSON.stringify(formatedData.contentRounds))
    formData.append('companyId', formatedData.companyId)
    formatedData.myFiles.map((file) => formData.append('myFiles', file))

    console.log(formData)

    dispatch(shareExperience(formData))

    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
  }

  const dispatch = useDispatch()

  function _handleSubmit(values, actions) {
    console.log(values)
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <MLayout className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} className={classes.stepper}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <SuccessMessage />
        ) : (
          <Formik
            initialValues={FinalInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId} autoComplete="off" >
                {_renderStepContent(activeStep)}

                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button
                      style={{ marginRight: 10 }}
                      onClick={_handleBack}
                      className={classes.button}
                      color="default"
                      variant="contained"
                      startIcon={<NavigateBeforeIcon />}
                    >
                      Back
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<NavigateNextIcon />}
                    >
                      {isLastStep ? 'Submit' : 'Next'}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </MLayout>
  );
}
