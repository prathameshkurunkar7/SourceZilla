import { combineReducers } from 'redux';
import errorreducer from './erroorreducer';
import authreducer from '././authreducer'
import postsreducer from '././postsreducer'
import profilereducer from '././profilereducer'
import privateGroupReducer from '././privateGroupReducer'
import loadingreducer from '././loadingreducer'
import interviewexpreducer from './interviewExpreducer'

const appReducer = combineReducers({
    errors: errorreducer,
    auth: authreducer,
    posts: postsreducer,
    profile: profilereducer,
    groups: privateGroupReducer,
    loading: loadingreducer,
    intExp: interviewexpreducer
});

const rootreducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS')
        state = undefined;

    return appReducer(state, action);
}

export default rootreducer;