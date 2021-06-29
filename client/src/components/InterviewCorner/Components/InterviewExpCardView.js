import React from 'react'
import {
    Card,
    CardContent,
    makeStyles,
    Typography,
    CardActions,
    Divider,
    Box,
    Avatar
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import SmsIcon from '@material-ui/icons/Sms';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: '0 2px 4px rgb(24 4 50 / 24%)',
        borderRadius: '4px',
        '&:hover': {
            boxShadow: '0 4px 6px rgb(24 4 50 / 24%)'
        }
    },
    title: {},
    userName: {
        color: '#696969'
    },
    actionArea: {
        padding: theme.spacing(1, 2),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    divider: {
        margin: theme.spacing(0, 2)
    },
    box: {
        display: 'flex',
    },
    contentLiner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentLinerLeft: {
        display: 'flex',
        alignItems: 'flex-start'
    },
    avatarSider: {
        marginLeft: 15
    },
    commentText: {
        paddingLeft: theme.spacing(1)
    }
}))

function InterviewExpCardView({ interview, companyName, companyId }) {
    const classes = useStyles()
    const { user: { userId } } = useSelector(state => state.auth)
    return (
        <Card className={classes.card} elevation={2}>
            <Box style={{ display: 'flex' }} component={NavLink} to={`/interview/${companyName}/${companyId}/${interview._id}/`}>
                <Box style={{ color: 'black', display: 'flex', alignItems: 'center', flexDirection: 'column', backgroundColor: 'rgba(43,41,161,.05)', padding: 15 }}>
                    <ThumbUpAltIcon
                        style={{ color: interview?.upvotes?.includes(userId) ? '#04A44B' : 'grey', marginBottom: 10 }}
                        fontSize="medium"
                    />
                    <Typography align="center" variant="body2" gutterBottom>
                        {interview.upvotes.length || 0}
                    </Typography>
                    <Typography align="center" variant="caption" display="block" gutterBottom>
                        Upvote
                    </Typography>
                </Box>
                <Box style={{ width: '100%' }}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" variant="button" display="block" gutterBottom>
                            {interview.contentUserInfo.role} | Fresher | {interview.contentUserInfo.passoutYear}
                        </Typography >
                        <Box className={classes.contentLiner}>
                            <Box className={classes.contentLinerLeft}>
                                <Avatar
                                    alt={interview.userName.toLocaleUpperCase()}
                                    src={`/experience/file/${interview.profileImageName}`}
                                />
                                <Box className={classes.avatarSider}>
                                    <Typography className={classes.userName} color="textPrimary" variant="subtitle2" display="block">
                                        {interview.userName}
                                    </Typography>
                                    <Typography color="textSecondary" variant="subtitle2" display="block">
                                        {interview.contentUserInfo.introduction || `Geeky guy`}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: interview.contentUserInfo.status === 'Selected' ? "#04A44B" : "#FE8585" }} color="textPrimary" variant="subtitle2" display="block" gutterBottom>
                                    {interview.contentUserInfo.status === 'Selected' ? (
                                        <CheckCircleIcon fontSize="small" style={{ marginRight: 6 }} />
                                    ) : (
                                        <CancelIcon fontSize="small" style={{ marginRight: 6 }} />
                                    )}
                                    {interview.contentUserInfo.status}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                    <Divider className={classes.divider} />
                    <CardActions className={classes.actionArea} >
                        <Box className={classes.box}>
                            <Box style={{ display: 'flex' }}>
                                <VisibilityIcon fontSize="small" color="disabled" />
                                <Typography className={classes.commentText} variant="caption" display="block" color="textSecondary">
                                    {interview.views.length || 0} views
                                </Typography>
                            </Box>
                            <Box style={{ display: 'flex', paddingLeft: 15 }}>
                                <SmsIcon fontSize="small" color="disabled" />
                                <Typography className={classes.commentText} variant="caption" display="block" color="textSecondary">
                                    {interview.comments.length || 0} comments
                                </Typography>
                            </Box>
                        </Box>
                        <Box className={classes.box}>
                            <Typography className={classes.commentText} variant="caption" display="block" color="textSecondary">
                                Published on {moment(interview.createdAt).format('ll')}
                            </Typography>
                        </Box>
                    </CardActions>
                </Box>
            </Box>
        </Card>
    )
}

export default InterviewExpCardView
