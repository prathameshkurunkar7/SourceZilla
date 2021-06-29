import React from 'react'
import { Typography, Avatar, Card, CardContent, Box, makeStyles, Fade } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    profileLinear: {
        display: 'flex',
        alignItems: 'flex-start',
        flexGrow: 1
    },
    avatarWrapper: {
        padding: theme.spacing(1, 3, 1, 1)
    },
    card: {
        boxShadow: '0 2px 4px rgb(24 4 50 / 24%)',
        userSelect: 'none'
    }
}))

function ProfileCard({ interview }) {
    const classes = useStyles()
    return (
        <Card elevation={0} className={classes.card}>
            <CardContent>
                <Typography color="textPrimary" variant="h6" gutterBottom>
                    PROFILE
                </Typography>
                <Box className={classes.profileLinear}>
                    <Box className={classes.avatarWrapper}>
                        <Fade in timeout={1500}>
                            <Avatar alt={interview.UserName} src={`/experience/file/${interview.profileImage}/`} className={classes.avatar} />
                        </Fade>
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography color="textPrimary" variant="h6" gutterBottom>
                            {interview.UserName}
                        </Typography>
                        <Typography color="textPrimary" variant="button" display="block" gutterBottom>
                            EDUCATION
                        </Typography>
                        <Typography style={{ fontWeight: 600, fontSize: 12 }} color="textSecondary" variant="subtitle2" gutterBottom>
                            INTERNATIONAL INSTITUTE OF INFORAMTION TECHNOLOGY | {interview?.contentUserInfo?.passoutYear}
                        </Typography>
                        <Typography color="textPrimary" variant="caption" gutterBottom >
                            {interview?.contentUserInfo?.branch}
                        </Typography>
                        <Typography color="textPrimary" variant="button" display="block">
                            INTRODUCTION
                        </Typography>
                        <Typography style={{ fontWeight: 500, fontSize: 14 }} color="textSecondary" variant="subtitle2" gutterBottom >
                            {interview?.contentUserInfo?.introduction}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProfileCard
