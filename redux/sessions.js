import * as ActionTypes from './ActionTypes';

export const sessions = (state  = { isLoading: true,
                                        errMess: null,
                                        sessions:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SESSIONNAME:
        return {...state, isLoading: false, errMess: null, sessions: action.payload};

        case ActionTypes.SESSIONNAME_LOADING:
            return {...state, isLoading: true, errMess: null, sessions: []}

        case ActionTypes.SESSIONNAME_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};