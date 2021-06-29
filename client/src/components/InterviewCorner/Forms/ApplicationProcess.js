import React from 'react';
import { Grid } from '@material-ui/core';
import { InputField } from './../FormFields';

export default function ApplicationProcess(props) {
    const {
        formField: { appProcess }
    } = props;

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <InputField
                        name={appProcess.name}
                        label={appProcess.label}
                        fullWidth
                        multiline
                        rows={5}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
