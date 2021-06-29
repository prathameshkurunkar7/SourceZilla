import React from 'react'
import { Typography, Card, CardContent, Box, makeStyles, Divider } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: '0 2px 4px rgb(24 4 50 / 24%)',
    },
    prepLiner: {
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: theme.spacing(2)
    },
    ideaIcon: {
        padding: theme.spacing(0, 2, 2, 1)
    },
    verticalDivider: {
        backgroundColor: '#424242',
        width: 2.5
    }
}))
function SuggestionBox({ interview }) {
    const classes = useStyles();
    return (
        <Card elevation={0} className={classes.card}>
            <CardContent>
                <Typography color="textPrimary" variant="h6" gutterBottom>
                    SUGGESTIONS
                </Typography>
                <Box className={classes.prepLiner}>
                    <img className={classes.ideaIcon} src="https://s3-ap-southeast-1.amazonaws.com/codestudio.codingninjas.com/codestudio/assets/icons/bulb.svg" alt="" />
                    <Divider className={classes.verticalDivider} orientation="vertical" flexItem={true} />
                    <Typography color="textSecondary" display="block" style={{ paddingLeft: 20, fontSize: 15 }} variant="body1" gutterBottom>
                        {interview.contentSuggestion}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default SuggestionBox
