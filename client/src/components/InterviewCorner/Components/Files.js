import React, { useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import AttachmentIcon from '@material-ui/icons/Attachment';
import File from './File'

function Files({ files }) {
    return (
        <React.Fragment>
            {files && files.length !== 0 && (
                <>
                    <Box style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <AttachmentIcon fontSize="large" style={{ marginRight: 10, transform: 'rotate(-40deg)' }} />
                        <Typography align="left" color="textPrimary" variant="h6" gutterBottom>
                            ATTACHMENTS
                        </Typography>
                    </Box>
                    <Grid container spacing={1}>
                        {files && files.length !== 0 && files.map((file, index) => <File file={file} key={index} />)}
                    </Grid>
                </>
            )}
        </React.Fragment>
    )
}

export default Files
