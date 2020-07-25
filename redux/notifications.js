import * as ActionTypes from './ActionTypes';

export const notifications = (state  = { isLoading: true,
                                    errMess: null,
                                    notifications:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_NOTIFICATIONS:
        return {...state, isLoading: false, errMess: null, notifications: action.payload};

        case ActionTypes.ADD_NOTIFICATION:
        return {...state, isLoading: false, errMess: null};

        case ActionTypes.NOTIFICATION_LOADING:
            return {...state, isLoading: true, errMess: null, notifications: []}

        case ActionTypes.NOTIFICATION_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};