import * as ActionTypes from './ActionTypes';

export const profiles = (state  = { isLoading: true,
                                    errMess: null,
                                    profiles:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROFILES:
        return {...state, isLoading: false, errMess: null, profiles: action.payload};

        case ActionTypes.ADD_PROFILE:
        return {...state, isLoading: false, errMess: null};

        case ActionTypes.PROFILE_LOADING:
            return {...state, isLoading: true, errMess: null, profiles: []}

        case ActionTypes.PROFILE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};