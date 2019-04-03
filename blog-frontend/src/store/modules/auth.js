// @flow
import { createAction, handleActions , type ActionType } from 'redux-actions';
import {Record, fromJS } from 'immutable';

const SET_EMAIL_INPUT = 'auth/SET_EMIAL_INPUT';

export const actionCreators = {
    setEmailInput: createAction(SET_EMAIL_INPUT, (value: string) => value),
};

export type AuthActionCreators = {
    setEmailInput(value: string): any,
}

export type Auth = {
    email: string,
    sentEmail: boolean
  };

const AuthRecord = Record(({
    email: '',
}:Auth));

const initialState = AuthRecord();

export default handleActions({
    [SET_EMAIL_INPUT]: (state: AuthRecord, { payload: value }) => {
        return state.set('email', value);
    },
}, initialState);