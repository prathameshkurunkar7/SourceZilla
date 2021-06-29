import React from 'react';
import { Grid } from '@material-ui/core';
import { InputField, MultifileUploads } from './../FormFields';

export default function Suggestions(props) {
    const {
        formField: { suggestions }
    } = props;

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <InputField
                        name={suggestions.name}
                        label={suggestions.label}
                        fullWidth
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MultifileUploads
                        name="files"
                        label="Dropzone"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
