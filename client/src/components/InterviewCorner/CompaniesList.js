import { Grid, Typography, Card, CardContent, Container, makeStyles, Button, Box, IconButton, Fade } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import SearchBar from "material-ui-search-bar";
import { getAllCompanies, searchCompany, reportCompany } from './../../redux/actions/InterviewExpAction'
import Dialog from './Components/Dialog'
import Wrapper from './Components/Wrapper'
import FlagIcon from '@material-ui/icons/Flag';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';

const useStyles = makeStyles((theme) => ({
    cardItem: {
        boxShadow: '0 2px 4px rgb(24 4 50 / 24%)',
        '&:hover': {
            boxShadow: '0 8px 16px rgb(24 4 50 / 20%)',
            transition: 'box-shadow .2s ease-in'
        }
    },
    button: {
        background: 'linear-gradient(to right, rgb(4, 167, 77), #078633)',
        boxShadow: 'none',
        color: 'white',
        marginBottom: 20
    },
    searchBar: {
        marginBottom: theme.spacing(2)
    }
}))

function InterviewCorner({ getAllCompanies, companies, userId }) {
    const classes = useStyles();
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')

    useEffect(() => {
        getAllCompanies()
    }, [getAllCompanies])

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Wrapper>
            <Container>
                <Box className={classes.searchBar}>
                    <SearchBar
                        onChange={(newValue) => setSearch(newValue)}
                        onRequestSearch={() => dispatch(searchCompany(search))}
                        onCancelSearch={() => {
                            dispatch(searchCompany(""))
                            setSearch("")
                        }}
                        value={search}
                        placeholder="Search Company...."
                    />
                </Box>
                <Button
                    onClick={handleClickOpen}
                    disableElevation
                    disableFocusRipple
                    variant="contained"
                    className={classes.button}
                >
                    ADD NEW COMPANY
                </Button>
                <Grid container spacing={3}>
                    {companies.length > 0 && companies.map(({ companyName, _id, spamFlag, reports }, index) => {
                        return (
                            spamFlag === false &&
                            <Grid key={index} item lg={2} md={2} sm={3} xs={6} >
                                <Fade in timeout={300} >
                                    <Card elevation={0} className={classes.cardItem}>
                                        <CardContent >
                                            <Box>
                                                {reports.includes(userId) ? (
                                                    <IconButton onClick={() => dispatch(reportCompany(_id, userId))} style={{ padding: 0 }}>
                                                        <FlagIcon fontSize="small" style={{ color: '#04A54B' }} />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton onClick={() => dispatch(reportCompany(_id, userId))} style={{ padding: 0 }}>
                                                        <FlagOutlinedIcon fontSize="small" color="action" />
                                                    </IconButton>
                                                )}
                                            </Box>
                                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Typography component={NavLink} to={`/interviews/${companyName}/${_id}`} color="textSecondary" variant="body1">
                                                    {companyName.toUpperCase()}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Fade>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
            <Dialog setOpen={setOpen} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
        </Wrapper>
    )
}

const mapStateToProps = (state) => {
    const keyword = state.intExp.keyword;
    return {
        companies: state.intExp.companies
            .filter(company =>
                company.companyName.toLowerCase().trim().startsWith(keyword.toLowerCase())
            ),
        userId: state.auth.user.userId
    }
}

export default connect(mapStateToProps, { getAllCompanies })(InterviewCorner)
