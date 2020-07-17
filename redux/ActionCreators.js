import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addSessionName = (name) => (dispatch) => {
    dispatch(addSessionPayload(name))
};

export const sessionNameLoading = () => ({
    type: ActionTypes.SESSIONNAME_LOADING
});

export const addSessionPayload = (name) => ({
    type: ActionTypes.ADD_SESSIONNAME,
    payload: name
});

export const fetchProfiles = (phone) => (dispatch) => {
    
    dispatch(profileLoading());

    return fetch(baseUrl + 'fetchprofiles?phone='+phone)
    .then(response => {
        return response;
    })
    .then(response => response.json())
    .then(profiles => {
        if(profiles==-1){
            dispatch(profileFailed("error"))
        }
        else{
            dispatch(addProfiles(profiles))
        }
    })
    .catch(error => {
        dispatch(profileFailed(error.message))
    });
};


export const addProfiles = (profiles) => ({
    type: ActionTypes.ADD_PROFILES,
    payload: profiles
});

export const profileLoading = () => ({
    type: ActionTypes.PROFILE_LOADING
});

export const profileFailed = (errmess) => ({
    type: ActionTypes.PROFILE_FAILED,
    payload: errmess
});

export const addProfile = (phone, name) => (dispatch) => {
    return fetch(baseUrl + 'addprofile?phone='+phone+'&name='+name)
    .then(response => {
        return response;
    })
    .then(response => response.json())
    .then(profile => {
        if(profile==-1){
            dispatch(profileFailed("error"))
        }
        else{
            dispatch(add_Profile(profile))
        }
    })
    .catch(error => dispatch(profileFailed(error)));
};

export const add_Profile = (leaders) => ({
    type: ActionTypes.ADD_PROFILE,
    payload: leaders
});