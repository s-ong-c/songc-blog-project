// @flow
import { Record, fromJS, type Map } from 'immutable';
import { pender } from 'redux-pender';
import handleActions from 'redux-actions/lib/handleActions';
import createAction from 'redux-actions/lib/createAction';
import * as AuthAPI from '../../lib/api/auth';

const CHECK_USER = 'user/CHECK_USER';
const SET_USER = 'user/SET_USER';
const PROCESS = 'user/PROCESS';

export type UserActionCreators = {
    checkUser(): any,
    setUser({
        id: string,
        username: string,
        displayName: string,
    }): any,
    process(): any,
};

export const actionCreators = {
    checkUser: createAction(CHECK_USER, AuthAPI.check),
    setUser: createAction(SET_USER),
    process: createAction(PROCESS),
};

export type UserData = {
    id: string,
    username: string,
    displayName: string,
    thumbnail: string,
};

export type User = {
    user: ?UserData,
    processed: boolean,
};

const UserSubRecord = Record({
    id: '',
    username: '',
    displayName: '',
    thumbnail: null,
});

const UserRecord = Record({
    user: null,
    processed: false,
});
const initialState: Map<string, *> = UserRecord();

export default handleActions({
    [SET_USER]: (state,{ payload: user}) => {
       return state.set('user',UserSubRecord(user));
    },
    ...pender({
        type: CHECK_USER,
        onSuccess: (state, { payload: { data} }) => {
            return state.set('user',UserSubRecord(data.user))
                .set('processed',true);
        },
        onError: state => state.set('user', null).set('processed',true),
    }),
    [PROCESS]: state => state.set('processed', true),
}, initialState);