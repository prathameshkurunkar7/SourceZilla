import React from 'react'
import '../../css/Categories.css'
import '../../css/Posts.css'
import Layout from '../Layout'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories, createCategory, follow, unFollow, reportCategory, popularCategories, latestCategories, oldestCategories } from '../../redux/actions/postsActions'
import { profileDetails } from '../../redux/actions/profileAction'
import { Avatar, Button, Container, Fab, FormControl, IconButton, Paper, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import FlagIcon from '@material-ui/icons/Flag';
import SendIcon from '@material-ui/icons/Send';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import store from '../../redux/store'
import Loader from '../Loader'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ScrollToTop from 'react-scroll-up'
import { capitalizeFirstLetter } from '../../utils/utils'

const useStyles = makeStyles((theme) => ({
    extendedIcon: {
        marginRight: theme.spacing(0),
    },
    leave_button: {
        marginTop: 20
    },
    formControl: {
        marginTop: '20px',
        minWidth: 200,
    },
}));

function Categories(props) {
    const classes = useStyles();
    const { getCategories, profileDetails, popularCategories, latestCategories, oldestCategories } = props

    const [select, setSelect] = useState('all')

    useEffect(() => {
        getCategories()      //get all categories
        profileDetails()

        store.dispatch({ type: 'CLEAN_POSTS' })
    }, [getCategories, profileDetails])

    const [cat, setCat] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            categoryName: cat.toLowerCase()
        }
        props.createCategory(data)
        console.log(cat)
        setCat('')
    }

    const follow = (id) => {
        // console.log(id)
        const data = {
            categoryId: id
        }
        props.follow(data)
    }

    const Unfollow = (id) => {
        // console.log(id)
        const data = {
            categoryId: id
        }
        props.unFollow(data)
    }

    const handleReportCategory = (id) => {
        props.reportCategory(id, props.auth.user.userId)
    }
    console.log(select)

    const handleSelectChange = (e) => {
        setSelect(e.target.value)

    }

    useEffect(() => {
        if (select === 'popular') {
            popularCategories()
        }
        if (select === 'latest') {
            latestCategories()
        }
        if (select === 'oldest') {
            oldestCategories()
        }
        if (select === "all") {
            getCategories()
        }
    }, [select, getCategories, popularCategories, latestCategories, oldestCategories])

    if (props.loading === true) {
        return (
            <Loader />
        )
    }

    return (
        <Layout>
            <Container maxWidth="xl" className="posts__container">
                <Paper elevation={1} className="createPost">
                    <div className="create">
                        <form onSubmit={handleSubmit} className="form">
                            <Avatar
                                className="avatar__create"
                                alt={`${props?.details?.userName?.toUpperCase()}`}
                                src={props.details.fileName && `/posts/file/${props?.details?.fileName}`}
                            />
                            <input
                                onChange={(e) => setCat(e.target.value)}
                                type="text"
                                name="categoryName"
                                value={cat}
                                placeholder={`Want to create category ?, ${props.auth.user.userName} ?`}
                                className="create__input"
                            />
                            <IconButton disabled={!cat} style={{ backgroundColor: 'white' }} type="submit" size="small" className="" >
                                <SendIcon className={classes.extendedIcon + ' sendicon'} />
                            </IconButton>
                        </form>
                    </div>
                </Paper>
                <div className="upper_category_box">
                    <div className="upper_category_box_left">
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                                native
                                autoWidth={true}
                                value={select}
                                onChange={handleSelectChange}
                            >
                                <option value="all">All</option>
                                <option value="popular">Popular</option>
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="upper_category_box_right">
                        <Fab className={classes.leave_button + ' leave_group_icon'} size="medium" color="secondary" variant="extended" onClick={() => props.history.push('/followedcategories/')}>
                            <ExitToAppIcon className={classes.extendedIcon} />
                            <span style={{ marginLeft: '10px' }} >My Followed Categories</span>
                        </Fab>
                    </div>
                </div>
                <div className="categories">
                    <div className="grid__container_for_categories">
                        {props.categories.map((category, index) => {
                            return (
                                category.spamFlag === false &&
                                <div key={index} className="content" >
                                    <div className="overlay">
                                        <Link to={`/categories/${category.categoryName}/${category._id}/`}>
                                            <button className="Stylishbtn style">{capitalizeFirstLetter(category.categoryName)}</button>
                                        </Link>
                                        <div className="followers_length">
                                            <PeopleAltOutlinedIcon className="people_icon" />
                                            {category.followers.length}
                                        </div>
                                    </div>
                                    <div className="category_card_follow_unfollow_buttons">
                                        {
                                            category.followers.includes(props.auth.user.userId) ? (
                                                <Button className="follow_btn" fullWidth onClick={() => Unfollow(category._id)} style={{ marginTop: '10px' }} size="small" variant="contained" color="secondary" >
                                                    UnFollow
                                                </Button>
                                            ) : (
                                                    <Button className="Unfollow_btn" fullWidth onClick={() => follow(category._id)} style={{ marginTop: '10px' }} size="small" variant="contained" color="primary" >
                                                        Follow
                                                    </Button>
                                                )
                                        }
                                    </div>
                                    <div className="category_card_report_button">
                                        {
                                            category.reports.includes(props.auth.user.userId) ? (
                                                <IconButton style={{ color: '#0FAB4A' }} onClick={() => handleReportCategory(category._id)} size="medium" variant="contained" color="default" >
                                                    <FlagIcon />
                                                </IconButton>
                                            ) : (
                                                    <IconButton style={{ color: '#0FAB4A' }} onClick={() => handleReportCategory(category._id)} size="medium" variant="contained" color="default" >
                                                        <FlagOutlinedIcon />
                                                    </IconButton>
                                                )
                                        }
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </Container>
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
        categories: state.posts.categories,
        auth: state.auth,
        details: state.profile.details,
        loading: state.loading.loading
    }
}

export default connect(mapStateToProps, {
    profileDetails,
    follow,
    unFollow,
    getCategories,
    createCategory,
    reportCategory,
    popularCategories,
    latestCategories,
    oldestCategories
})(Categories)
