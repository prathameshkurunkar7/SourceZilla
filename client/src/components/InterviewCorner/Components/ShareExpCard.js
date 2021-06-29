import React from 'react'
import { Card, makeStyles, CardContent, Typography, Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: '0 2px 4px rgb(24 4 50 / 24%)',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        background: 'linear-gradient(to right, rgb(4, 167, 77), #078633)',
        color: 'white'
    }
}))


function ShareExpCard({ companyId }) {
    const classes = useStyles()

    return (
        <Card elevation={0} className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography>
                    Have an interview experience that you want to contribute?
                </Typography>
                <Button
                    className={classes.button}
                    disableElevation
                    component={NavLink}
                    to={`/interviewcorner/${companyId}`}
                    variant="contained"
                >
                    Share Your Experience
                </Button>
            </CardContent>
        </Card>
    )
}

export default ShareExpCard
