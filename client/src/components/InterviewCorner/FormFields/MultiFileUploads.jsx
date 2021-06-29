import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone'
import { useField } from 'formik';

const useStyles = makeStyles(theme => createStyles({
    previewChip: {
        minWidth: 160,
        maxWidth: 210,
    },
    previewContainer: {
        marginTop: theme.spacing(1)
    }
}));

function MultiFileUploads({ label, ...props }) {
    const classes = useStyles();
    // console.log(props)
    // console.log("Hello")
    const [field, meta, helpers] = useField(props);
    // console.log(field, meta, helpers)
    return (
        <React.Fragment>
            <DropzoneArea
                onChange={(files) => helpers.setValue(files)}
                onDelete={(file) => console.log(file)}
                showPreviews={true}
                acceptedFiles={['image/*', 'application/*']}
                showPreviewsInDropzone={false}
                useChipsForPreview
                previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                previewGridClasses={{ container: classes.previewContainer }}
                previewChipProps={{ classes: { root: classes.previewChip } }}
                previewText=""
                filesLimit={5}
            />
        </React.Fragment>
    )
}

export default MultiFileUploads
