import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import { TextField } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Formik } from 'formik';
import { Form } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { addCompany } from './../../../redux/actions/InterviewExpAction'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DialogForm({ handleClose, handleClickOpen, open, setOpen, ...props }) {

    const dispatch = useDispatch()

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>ADD NEW COMPANY</DialogTitle>
            <Formik
                initialValues={{ companyName: '' }}
                onSubmit={(values, actions) => {
                    console.log(values)
                    handleClose()
                    try {
                        dispatch(addCompany(values.companyName.toLowerCase()))
                        actions.resetForm({})
                        actions.setStatus({ success: true })
                        actions.setSubmitting(false)
                    } catch (error) {
                        actions.setStatus({ success: false })
                        actions.setSubmitting(false)
                    }
                }}
                validationSchema={Yup.object().shape({
                    companyName: Yup.string()
                        .min(2, "Too short !")
                        .max(25, "Too long !")
                        .required("Company Name is Required")
                })}
                render={({ isSubmitting, handleSubmit, errors, handleChange, touched, values }) => (
                    <Form id="addCompanyForm" onSubmit={handleSubmit} autoComplete="off">
                        <React.Fragment>
                            <DialogContent>
                                <TextField
                                    name="companyName"
                                    error={touched.companyName && Boolean(errors.companyName)}
                                    helperText={touched.companyName && errors.companyName}
                                    label="Company Name"
                                    value={values.companyName}
                                    onChange={handleChange}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Button
                                    disabled={isSubmitting}
                                    type="submit"
                                    disableElevation
                                    disableFocusRipple
                                    variant="contained"
                                    style={{
                                        background: 'linear-gradient(to right, rgb(4, 167, 77), #078633)',
                                        boxShadow: 'none',
                                        color: 'white',
                                        marginTop: 15,
                                        marginBottom: 5
                                    }}
                                >
                                    Submit
                                </Button>
                            </DialogContent>
                        </React.Fragment>
                    </Form>
                )}
            />
        </Dialog>
    );
}

export default DialogForm;