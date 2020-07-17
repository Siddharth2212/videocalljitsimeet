import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { sessions } from './sessions';
import { profiles } from './profiles';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            sessions,
            profiles
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}