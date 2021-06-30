import React, { useEffect, Suspense } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getAllinterviews, sortby } from './../../redux/actions/InterviewExpAction'
import Wrapper from './Components/Wrapper'
import CardView from './Components/InterviewExpCardView'
import {
    Container,
    Grid,
    Typography,
    Button,
    Box,
    FormControl,
    InputLabel,
    CircularProgress
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paginate from './Components/Pagination'

function InterviewExpsByCompanyID({ interviews, isLoading, ...props }) {

    const params = new URLSearchParams(props.location.search);
    const page = params.get('page') || 1;

    const dispatch = useDispatch()
    const { match: { params: { companyId, companyName } } } = props

    useEffect(() => {
        dispatch(getAllinterviews(companyId, page))
        return () => {
            dispatch({ type: 'GET_ALL_INTERVIEWS', payload: { experiences: [], numOfPages: 0 } })
        }
    }, [dispatch, companyId, page])

    console.log(isLoading)

    return (
        <Wrapper>
            <Container>
                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography color="textPrimary" variant="h4" gutterBottom>
                            {String(companyName).toUpperCase()}
                        </Typography>
                    </Box>
                    <Button
                        style={{ background: 'linear-gradient(to right, rgb(4, 167, 77), #078633)', color: 'white' }}
                        disableElevation
                        component={NavLink}
                        to={`/interviewcorner/${companyId}`}
                        variant="contained"
                    >
                        Share Your Experience
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    <Grid item lg={9} md={10} xs={12}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom >
                                {String('💰 Interview Experiences').toUpperCase()}
                            </Typography>
                            {(interviews && interviews.length !== 0) && (
                                <FormControl variant="outlined" style={{ minWidth: 135 }} >
                                    <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="Sort By"
                                        onChange={(e) => dispatch(sortby(e.target.value))}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="views">Views</MenuItem>
                                        <MenuItem value="upvotes">Upvotes</MenuItem>
                                        <MenuItem value="comments">Comments</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    {interviews && interviews.length !== 0 && interviews.map((interview, index) => {
                        return (
                            !interview.spamFlag &&
                            <Grid key={index} item lg={9} md={10} xs={12} >
                                <CardView companyId={companyId} companyName={companyName} interview={interview} />
                            </Grid>
                        )
                    })}
                    <Grid item lg={9} md={10} xs={12}>
                        {interviews && interviews.length !== 0 &&
                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                <Paginate companyName={companyName} companyId={companyId} page={page} />
                            </Box>}
                    </Grid>
                </Grid>
            </Container>
        </Wrapper>
    )
}

const mapStateToProps = (state) => {
    const method = state.intExp.sortby
    const interviews = state.intExp.interviews
    let updatedInterviews;
    if (method === 'comments') {
        updatedInterviews = interviews.slice().sort((a, b) => b.commentsCount - a.commentsCount)
    } else if (method === 'upvotes') {
        updatedInterviews = interviews.slice().sort((a, b) => b.upvotesCount - a.upvotesCount)
    } else if (method === 'views') {
        updatedInterviews = interviews.slice().sort((a, b) => b.viewsCount - a.viewsCount)
    } else {
        updatedInterviews = interviews
    }

    return {
        interviews: updatedInterviews,
        isLoading: state.intExp.isLoading
    }
}

export default connect(mapStateToProps)(InterviewExpsByCompanyID)
