import Axios from 'axios'
import { toast } from 'react-toastify'
import { AdminOptions } from '../../utils/utils'

export const getAllCompanies = () => {
    return (dispatch) => {
        Axios.get('/interviewCorner/')
            .then(({ data: { companies } }) => {
                dispatch({
                    type: 'GET_ALL_COMPANIES',
                    payload: { companies }
                })
            })
            .catch((error) => console.log(error))
    }
}

export const addCompany = (companyName) => {
    return (dispatch) => {
        Axios.post('/interviewCorner/add/', { companyName })
            .then(({ data: { company, message } }) => {
                console.log(message)
                dispatch({
                    type: 'ADD_COMPANY',
                    payload: { company }
                })
            })
            .catch((error) => {
                console.log(error.message)
                toast.success('Company already existed!', AdminOptions)
            })
    }
}

export const getAllinterviews = (companyID, page) => {
    return (dispatch) => {
        Axios.get(`/experience/all/${companyID}/${page}`)
            .then(({ data: { experiences, currPage, numOfPages } }) => {
                dispatch({
                    type: 'GET_ALL_INTERVIEWS',
                    payload: { experiences, currPage, numOfPages }
                })
            })
            .catch((error) => console.log(error))
    }
}

export const getInterview = (interviewId) => {
    return (dispatch) => {
        console.log(interviewId)
        Axios.get(`/experience/getExperience/${interviewId}`)
            .then(({ data: { experienceDetails } }) => {
                dispatch({
                    type: 'GET_INTERVIEW',
                    payload: { interview: experienceDetails }
                })
            })
            .catch((error) => console.log(error))
    }
}

export const addComment = (commentBody, experienceId) => {
    return (dispatch) => {
        Axios.post(`/experience/comment`, { commentBody, experienceId })
            .then(({ data: { comment } }) => {
                console.log(comment)
                dispatch({
                    type: 'ADD_COMMENT',
                    payload: { comment, experienceId }
                })
            })
            .catch((error) => console.log(error))
    }
}

export const deleteComment = (commentId, experienceId) => {
    return (dispatch) => {
        console.log(experienceId, commentId)
        Axios.delete(`/experience/comment/${experienceId}/${commentId}`)
            .then(({ data: { message } }) => {
                console.log(message)
                dispatch({
                    type: 'DELETE_COMMENT',
                    payload: { commentId }
                })
                toast.success(message, AdminOptions)
            })
            .catch((error) => console.log(error))
    }
}

export const upvoteInterview = (experienceId, userId) => {
    return (dispatch) => {
        Axios.patch(`/experience/upvote/`, { experienceId })
            .then(({ data: { message } }) => {
                console.log(message)
                dispatch({
                    type: 'UPVOTE_INTERVIEW',
                    payload: { userId }
                })
            })
            .catch((error) => console.log(error))
    }
}

export const downvoteInterview = (experienceId, userId) => {
    return (dispatch) => {
        Axios.patch(`/experience/downvote/`, { experienceId })
            .then(({ data: { message } }) => {
                console.log(message)
                dispatch({
                    type: 'DOWNVOTE_INTERVIEW',
                    payload: { userId }
                })
            })
            .catch((error) => console.log(error))
    }
}

export const shareExperience = (formdata) => {
    return (dispatch) => {
        console.log(formdata)
        Axios.post(`/experience/create/`, formdata)
            .then(({ data }) => {
                console.log(data)
            })
            .catch((error) => console.log(error))
    }
}

export const reportCompany = (companyId, userId) => {
    return (dispatch) => {
        Axios.post(`/interviewCorner/report/`, { companyId })
            .then(({ data: { message } }) => {
                console.log(message)
                dispatch({
                    type: 'REPORT_COMPANY',
                    payload: { companyId, userId }
                })
                toast.success(message, AdminOptions)
            })
            .catch((error) => console.log(error))
    }
}

export const reportExperience = (experienceId, userId) => {
    return (dispatch) => {
        Axios.post(`/experience/report/`, { experienceId })
            .then(({ data: { message } }) => {
                console.log(message)
                dispatch({
                    type: 'REPORT_EXPERIENCE',
                    payload: { userId }
                })
                toast.success(message, AdminOptions)
            })
            .catch((error) => console.log(error))
    }
}


export const sortby = (method) => {
    return (dispatch) => dispatch({ type: 'SORT_BY', payload: { sortby: method } })
}
export const searchCompany = (keyword) => {
    return (dispatch) => dispatch({ type: 'SEARCH_COMPANY', payload: { keyword } })
}