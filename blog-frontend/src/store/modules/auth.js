// @flow
import { Record, fromJS, type Map } from 'immutable';
import { pender} from 'redux-pender';
import createAction from 'redux-actions/lib/createAction';
import handleActions from 'redux-actions/lib/handleActions';
import * as AuthAPI from '../../lib/api/auth';
import * as socialAuth from '../../lib/socialAuth';

const SET_EMAIL_INPUT = 'auth/SET_EMIAL_INPUT';
const SEND_AUTH_EMAIL = 'auth/SEND_AUTH_EMAIL';
const CHANGE_REGISTER_FORM = 'auth/CHANGE_REGISTER_FORM';
const GET_CODE = 'auth/GET_CODE';
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const CODE_LOGIN = 'auth/CODE_LOGIN';
const SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN';

export type AuthActionCreators = {
    setEmailInput(value: string): any,
    sendAuthEmail(email: string): any,
    changeRegisterForm({ name: string, value: string }): any,
    getCode(code: string): any,
    localRegister(payload: AuthAPI.LocalRegisterPayload): any,
    codeLogin(code: string): any,
    socialLogin(provider: string): any,
}
export const actionCreators = {
    setEmailInput: createAction(SET_EMAIL_INPUT),
    sendAuthEmail: createAction(SEND_AUTH_EMAIL, AuthAPI.sendAuthEmail),
    getCode: createAction(GET_CODE, AuthAPI.getCode),
    changeRegisterForm: createAction(CHANGE_REGISTER_FORM),
    localRegister: createAction(LOCAL_REGISTER, AuthAPI.localRegister),
    codeLogin: createAction(CODE_LOGIN, AuthAPI.codeLogin),
    socialLogin: createAction(SOCIAL_LOGIN, provider => socialAuth[provider](),provider => provider),
};

export type SocialAuthResult = ?{
    provider: string,
    accessToken: string
};

export type AuthResult = ?{
    user: {
      id: string,
      username: string,
      displayName: string,
      thumbnail: string,
    },
    token: string
  };

export type Auth = {
    email: string,
    sentEmail: boolean,
    isUser: boolean,
    registerForm: {
        displayName: string,
        email: string,
        username: string,
        shortbio: string,
    },
    registerToken: string,
    authResult: AuthResult,
    socialAuthResult: SocialAuthResult,
  };
  
const UserSubRecord = Record({
    id: '',
    username: '',
    displayName: '',
    thumbnail: '',
});

const AuthResultSubRecord = Record({
    user: UserSubRecord(),
    token: '',
});

const SocialAuthResultSubRecord = Record({
    provider: '',
    accessToken: '',
});

const AuthRecord = Record(({
    email: '',
    sentEmail: false,
    isUser: false,
    registerForm: Record({
        displayName: '',
        email: '',
        username: '',
        shortBio: '',
    })(),
    registerToken: '',
    authResult: null,
    SocialAuthResultSubRecord: null,
    }:Auth));

const initialState: Auth = AuthRecord();

export default handleActions({
    [SET_EMAIL_INPUT]: (state, { payload: value }) => {
        return state.set('email', value);
    },
    ...pender({
        type: SEND_AUTH_EMAIL,
        onSuccess: (state, {payload: { data}}) => {
            return state.set('sentEmail', true)
                .set('isUser', data.isUser);
        },
    }),
    [CHANGE_REGISTER_FORM]: (state, { payload: { name, value } }) => {
        return state.setIn(['registerForm', name], value);
    },
    ...pender({
        type: GET_CODE,
        onSuccess: (state, { payload: { data} }) => {
            const { email, registerToken } = data;
            return state.setIn(['registerForm', 'email'], email)
                .set('registerToken', registerToken);
        },
    }),
    ...pender({
        type: LOCAL_REGISTER,
        onSuccess: (state, { payload: { data } }) => {
            const { user, token } = data;
            return state.set('authResult', AuthResultSubRecord({
                user: UserSubRecord(user),
                token,
            }));
        },
    }),
    ...pender({
        type: CODE_LOGIN,
        onSuccess: (state, { payload: { data } }) => {
            const { user, token } = data;
            return state.set('authResult', AuthResultSubRecord({
                user: UserSubRecord(user),
                token,
            }));
        },
    }),
    ...pender({
        type: SOCIAL_LOGIN,
        onSuccess: (state, { payload: response, meta: provider }) => {
            if (!response) return state;
            const { access_token: accessToken } = response.authResponse;
            return state.set('socialAuthResult', SocialAuthResultSubRecord({
                accessToken,
                provider,
            }));
        },
    }),
}, initialState);