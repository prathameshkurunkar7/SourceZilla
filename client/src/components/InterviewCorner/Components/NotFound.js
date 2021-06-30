import React from 'react'
import { Typography } from '@material-ui/core'
import NotFoundImage from './NotFound.png'
import { NavLink } from 'react-router-dom'

function NotFound({ companyName, companyId }) {
    return (
        <React.Fragment>
            <img style={{ objectFit: 'contain', width: 500 }} src={NotFoundImage} alt="not_found" />
            <Typography variant="h5" color="textSecondary" gutterBottom>
                There are no post related to {companyName} so far.
            </Typography>
            <Typography style={{ color: '#05A64C' }} component={NavLink} to={`/interviewcorner/${companyId}`} variant="h6" color="textSecondary" gutterBottom>
                Try create one
            </Typography>
        </React.Fragment>
    )
}

export default NotFound
