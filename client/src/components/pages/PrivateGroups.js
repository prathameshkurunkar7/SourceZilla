import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { profileDetails } from '../../redux/actions/profileAction'
import { getprivateGroups, createprivateGroup } from '../../redux/actions/privategroupAction'
import { Avatar, Button, Container, Dialog, IconButton, Paper, Grid, Card, CardContent, Typography, CardActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import store from '../../redux/store'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SendIcon from '@material-ui/icons/Send';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Loader from '../Loader'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ScrollToTop from 'react-scroll-up'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import { capitalizeFirstLetter } from '../../utils/utils';
import '../../css/PrivateGroups.css'

const useStyles = makeStyles((theme) => ({
    extendedIcon: {
        marginRight: theme.spacing(0),
    },
    card: {
        borderRadius: '20px',
        boxShadow: '0 2px 4px rgb(24 4 50 / 24%)',
        '&:hover': {
            boxShadow: '0 4px 6px rgb(24 4 50 / 24%)'
        },
        cursor: 'pointer'
    },
    cardIcons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    cardData: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    JoinButton: {
        background: 'linear-gradient( to right, rgb(4, 167, 77) 0%, #04795d 0%, #1db853 )',
        border: 0,
        borderRadius: 20,
        color: 'white',
        margin: theme.spacing(1)
    },
    JoinButtonDisabled: {
        border: 0,
        borderRadius: 20,
        color: 'white',
        margin: theme.spacing(1)
    }
}));

function PrivateGroups({ profileDetails, getprivateGroups, createprivateGroup, details, groups, auth, loading, passcode }) {
    const classes = useStyles();
    const [groupName, setgroupName] = useState('')
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false)

    const handleClose = () => {
        setOpen(false);
        setCopied(false)
    };

    useEffect(() => {
        getprivateGroups()

        if (passcode) {
            setOpen(true)
        }

        store.dispatch({ type: 'CLEAR_INDIVIDUAL_POSTS' })
        store.dispatch({ type: 'CLEAN_ERRORS' })
    }, [getprivateGroups, profileDetails, passcode])

    console.log(passcode)
    useEffect(() => {
        profileDetails()
        return () => {
            store.dispatch({ type: 'CLEAN_PASSCODE' })
        }
    }, [profileDetails])

    const handleCreateGroup = (e) => {
        e.preventDefault()

        createprivateGroup(groupName.toLowerCase())
        setgroupName('')
    }

    if (loading === true) {
        return (
            <Loader />
        )
    }

    return (
        <Layout>
            <Container maxWidth="xl" className="posts__container">
                <Paper elevation={1} className="createPost">
                    <div className="create">
                        <form onSubmit={handleCreateGroup} className="form">
                            <Avatar className="avatar__create" alt={`${details?.userName?.toUpperCase()}`} src={`/posts/file/${details.fileName}`} />
                            <input
                                onChange={(e) => setgroupName(e.target.value)}
                                type="text"
                                name="groupName"
                                value={groupName}
                                placeholder={`Want to create group ?, ${auth.user.userName} ?`}
                                className="create__input"
                            />
                            <IconButton disabled={!groupName} style={{ backgroundColor: 'white' }} type="submit" size="small" className="" >
                                <SendIcon className={classes.extendedIcon + ' sendicon'} />
                            </IconButton>
                        </form>
                    </div>
                </Paper>
                <Grid style={{ marginTop: '20px' }} justify="flex-start" container spacing={3}>
                    {groups.map((group, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={3} >
                                <Card className={classes.card} >
                                    <CardContent>
                                        <div className={classes.cardIcons}>
                                            <IconButton component={Link} to={`/groups/${group.groupName}/${group._id}/`} >
                                                <OpenInBrowserIcon style={{ color: '#19AD55' }} fontSize="medium" />
                                            </IconButton>
                                        </div>
                                        <div className={classes.cardInfo}>
                                            <Typography gutterBottom variant="h6" color="default">
                                                {capitalizeFirstLetter(group.groupName)}
                                            </Typography>
                                            <Typography color="textSecondary" gutterBottom variant="subtitle1">
                                                {group.groupAdmin}
                                            </Typography>
                                            <div className={classes.cardData}>
                                                <PeopleAltOutlinedIcon color="action" />
                                                <Typography style={{ paddingLeft: '6px' }} color="default" >
                                                    {group.groupMembers}
                                                </Typography>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardActions>
                                        {!details?.myPrivateGroups?.includes(group._id) ? (
                                            <Button
                                                component={Link}
                                                to={{
                                                    pathname: `/modal/${group.groupName}/${group._id}/join/`,
                                                    state: { modal: true }
                                                }}
                                                fullWidth
                                                size="medium"
                                                disableElevation
                                                className={classes.JoinButton}
                                                variant="contained">
                                                Join
                                            </Button>
                                        ) : (
                                            <Button
                                                component={Link}
                                                to={{
                                                    pathname: `/modal/${group.groupName}/${group._id}/join/`,
                                                    state: { modal: true }
                                                }}
                                                fullWidth
                                                disableElevation
                                                className={classes.JoinButtonDisabled}
                                                disabled
                                                size="medium"
                                                variant="contained">
                                                Join
                                            </Button>
                                        )
                                        }
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
            <Dialog style={{ padding: '20px' }} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <div className="passcode_container">
                    <h2 className="passcode">{passcode}</h2>
                    <CopyToClipboard text={passcode} onCopy={() => setCopied(true)}>
                        {
                            copied ? (
                                <button className="passcode_copy" >
                                    <FileCopyIcon style={{ color: '#0EAA49' }} />
                                </button>
                            ) : (
                                <button className="passcode_copy" >
                                    <FileCopyOutlinedIcon />
                                </button>
                            )
                        }
                    </CopyToClipboard>
                </div>
                {copied ? <span className="copy_message">copied</span> : null}
            </Dialog>
            <ScrollToTop
                style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    cursor: 'pointer',
                    transitionDuration: '0.2s',
                    transitionTimingFunction: 'linear',
                    transitionDelay: '0s',
                    backgroundColor: '#04A44B',
                    borderRadius: '50%'
                }}
                showUnder={160}
            >
                <IconButton>
                    <ArrowUpwardIcon style={{ color: 'white' }} />
                </IconButton>
            </ScrollToTop>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        groups: state.groups.groups,
        auth: state.auth,
        details: state.profile.details,
        loading: state.loading.loading,
        passcode: state.groups.passcode
    }
}

export default connect(mapStateToProps, { profileDetails, getprivateGroups, createprivateGroup })(withRouter(PrivateGroups))
