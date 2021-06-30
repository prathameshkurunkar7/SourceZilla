const initialState = {
    companies: [],
    interviews: null,
    currPage: 0,
    numOfPages: 0,
    interview: null,
    keyword: '',
    sortby: '',
    isLoading: false
}

const interviewExpreducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_STATE':
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        case 'GET_ALL_COMPANIES':
            return {
                ...state,
                companies: action.payload.companies
            }
        case 'ADD_COMPANY':
            return {
                ...state,
                companies: [
                    action.payload.company,
                    ...state.companies
                ]
            }
        case 'GET_ALL_INTERVIEWS':
            return {
                ...state,
                interviews: action.payload.experiences,
                currPage: action.payload.currPage,
                numOfPages: action.payload.numOfPages,
            }
        case 'SEARCH_COMPANY':
            return {
                ...state,
                keyword: action.payload.keyword
            }
        case 'GET_INTERVIEW':
            return {
                ...state,
                interview: action.payload.interview
            }
        case 'ADD_COMMENT':
            return {
                ...state,
                interview: {
                    ...state.interview,
                    comments: [
                        action.payload.comment,
                        ...state.interview.comments,
                    ]
                }
            }
        case 'DELETE_COMMENT':
            return {
                ...state,
                interview: {
                    ...state.interview,
                    comments: state.interview.comments.filter(comment => comment._id !== action.payload.commentId)
                }
            }
        case 'UPVOTE_INTERVIEW':
            return {
                ...state,
                interview: {
                    ...state.interview,
                    upvotes: state.interview.upvotes.includes(action.payload.userId) ?
                        state.interview.upvotes.filter(upvote => upvote !== action.payload.userId) : [
                            ...state.interview.upvotes,
                            action.payload.userId
                        ],
                    downvotes: state.interview.downvotes.filter(downvote => downvote !== action.payload.userId)
                }
            }
        case 'DOWNVOTE_INTERVIEW':
            return {
                ...state,
                interview: {
                    ...state.interview,
                    downvotes: state.interview.downvotes.includes(action.payload.userId) ?
                        state.interview.downvotes.filter(downvote => downvote !== action.payload.userId) : [
                            ...state.interview.downvotes,
                            action.payload.userId
                        ],
                    upvotes: state.interview.upvotes.filter(upvote => upvote !== action.payload.userId)
                }
            }

        case 'REPORT_COMPANY':
            return {
                ...state,
                companies: state.companies.map((company) => {
                    if (company._id === action.payload.companyId) {
                        return {
                            ...company,
                            reports: [...company.reports, action.payload.userId]
                        }
                    }
                    return company
                })
            }
        case 'REPORT_EXPERIENCE':
            return {
                ...state,
                interview: {
                    ...state.interview,
                    reports: [...state.interview.reports, action.payload.userId]
                }
            }
        case 'SORT_BY':
            return {
                ...state,
                sortby: action.payload.sortby
            }
        default:
            return state;
    }
}

export default interviewExpreducer