import { Container, Grid, Typography, Box, IconButton, Tooltip } from '@material-ui/core'
import React, { useEffect } from 'react'
import Wrapper from './Components/Wrapper'
import ProfileCard from './Components/profileCard'
import PrepCard from './Components/PrepCard'
import ApplnProcess from './Components/AppplnProcess'
import InterviewProcess from './Components/InterviewProcess'
import CommentBox from './Components/CommentBox'
import SuggestionBox from './Components/SuggestionBox'
import ShareExpCard from './Components/ShareExpCard'
import Files from './Components/Files'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import FlagIcon from '@material-ui/icons/Flag';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import { getInterview, upvoteInterview, downvoteInterview, reportExperience } from './../../redux/actions/InterviewExpAction'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

function InterviewShow(props) {

    const dispatch = useDispatch();
    const interview = useSelector((state) => state.intExp.interview)
    const userId = useSelector((state) => state.auth.user.userId)
    const { match: { params: { interviewId, companyId } } } = props

    useEffect(() => {
        dispatch(getInterview(interviewId))

        return () => {
            dispatch({
                type: 'GET_INTERVIEW',
                payload: { interview: [] }
            })
        }
    }, [dispatch, interviewId])

    return (
        <Wrapper>
            <Container>
                {interview.length !== 0 ? (
                    <Grid container justify="flex-start" spacing={2}>
                        <Grid item lg={6} md={12}>
                            <Typography variant="h5" gutterBottom>
                                {String(props.match.params.companyName).toUpperCase()} Interview Experience for {interview?.contentUserInfo?.role}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Posted: {moment(interview?.createdAt).format("DD MMM YYYY")}
                            </Typography>
                            <Typography style={{ display: 'flex', alignItems: 'center', fontWeight: 700, margin: '8px 0', color: interview?.contentUserInfo?.status === 'Selected' ? "#04A44B" : "#FE8585" }} color="textPrimary" variant="subtitle1" display="block" gutterBottom>
                                {interview?.contentUserInfo?.status === 'Selected' ?
                                    <CheckCircleIcon fontSize="small" style={{ marginRight: 6 }} /> :
                                    <CancelIcon fontSize="small" style={{ marginRight: 6 }} />
                                }
                                {interview?.contentUserInfo?.status}
                            </Typography>
                        </Grid>
                        <Grid item lg={8} md={7} xs={12}>
                            <Grid container spacing={3}>
                                <Grid item lg={12} xs={12}>
                                    <ProfileCard interview={interview} />
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <PrepCard interview={interview} />
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <ApplnProcess interview={interview} />
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <InterviewProcess rounds={interview.contentRound} />
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <SuggestionBox interview={interview} />
                                </Grid>
                                <Grid item lg={12} xs={12}  >
                                    <Box style={{ display: 'flex' }}>
                                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton disableRipple disableFocusRipple disableTouchRipple onClick={() => dispatch(upvoteInterview(interview._id, userId))}>
                                                <ThumbUpAltIcon
                                                    style={{ color: interview?.upvotes?.includes(userId) ? '#04A44B' : '' }}
                                                    fontSize="medium"
                                                />
                                            </IconButton>
                                            <Typography style={{ marginLeft: 10 }} align="left" variant="body2" gutterBottom>
                                                {interview?.upvotes?.length || 0}
                                            </Typography>
                                        </Box>
                                        <Box style={{ display: 'flex', alignItems: 'center', marginLeft: 15 }}>
                                            <IconButton disableRipple onClick={() => dispatch(downvoteInterview(interview._id, userId))}>
                                                <ThumbDownAltIcon
                                                    style={{ color: interview?.downvotes?.includes(userId) ? '#04A44B' : '' }}
                                                    fontSize="medium"
                                                />
                                            </IconButton>
                                            <Typography style={{ marginLeft: 10 }} align="left" variant="body2" gutterBottom>
                                                {interview?.downvotes?.length || 0}
                                            </Typography>
                                        </Box>
                                        <Box style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                                            <Tooltip title="Report">
                                                <IconButton onClick={() => dispatch(reportExperience(interview._id, userId))} disableRipple >
                                                    {interview?.reports?.includes(userId) ? (
                                                        <FlagIcon
                                                            style={{ color: interview?.reports?.includes(userId) ? '#04A44B' : '' }}
                                                            fontSize="medium"
                                                        />
                                                    ) : (
                                                        <FlagOutlinedIcon
                                                            color="action"
                                                            fontSize="medium"
                                                        />
                                                    )}
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <ShareExpCard companyId={companyId} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={4} md={5} xs={12}>
                            <Grid container spacing={3}>
                                <Grid item lg={12} xs={12}>
                                    <CommentBox experienceId={interviewId} comments={interview.comments} />
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <Files files={interview?.files} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : <h1>Loading...</h1>}
            </Container>
        </Wrapper>
    )
}

export default InterviewShow
