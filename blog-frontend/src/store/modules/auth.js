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
const VERIFY_SOCIAL = 'auth/VERIFY_SOCIAL';
const SOCIAL_REGISTER = 'auth/SOCIAL_REGISTER';
const SOCIAL_SONGC_LOGIN = 'auth/SOSOCIAL_SONGC_LOGIN';
const AUTOCOMPLETE_REGISTER_FORM = 'auth/AUTOCOMPLETE_REGISTER_FORM';

type AutocompleteFormPayload = {
    email: ?string,
    name: ?string
  };
  const autoCompleteRegisterForm = createAction(AUTOCOMPLETE_REGISTER_FORM,
    (payload: AutocompleteFormPayload) => payload);

export type AuthActionCreators = {
    setEmailInput(value: string): any,
    sendAuthEmail(email: string): any,
    changeRegisterForm({ name: string, value: string }): any,
    getCode(code: string): any,
    localRegister(payload: AuthAPI.LocalRegisterPayload): any,
    codeLogin(code: string): any,
    socialLogin(provider: string): any,
    verifySocial(payload: AuthAPI.VerifySocialPayload): any,
    socialRegister(payload: AuthAPI.SocialRegisterPayload): any,
    socialSongcLogin(payload: AuthAPI.SocialLoginPayload): any,
    autoCompleteRegisterForm(payload: AutocompleteFormPayload): any,
}
export const actionCreators = {
    setEmailInput: createAction(SET_EMAIL_INPUT),
    sendAuthEmail: createAction(SEND_AUTH_EMAIL, AuthAPI.sendAuthEmail),
    getCode: createAction(GET_CODE, AuthAPI.getCode),
    changeRegisterForm: createAction(CHANGE_REGISTER_FORM),
    localRegister: createAction(LOCAL_REGISTER, AuthAPI.localRegister),
    codeLogin: createAction(CODE_LOGIN, AuthAPI.codeLogin),
    socialLogin: createAction(SOCIAL_LOGIN, provider => socialAuth[provider](),provider => provider),
    verifySocial: createAction(VERIFY_SOCIAL, AuthAPI.verifySocial),
    socialRegister: createAction(SOCIAL_REGISTER,AuthAPI.socialRegister),
    socialSongcLogin: createAction(SOCIAL_SONGC_LOGIN, AuthAPI.socialLogin),
    autoCompleteRegisterForm: createAction(AUTOCOMPLETE_REGISTER_FORM),
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

  export type VerifySocialResult = ?{
    id: string,
    thumbnail: ?string,
    email: ?string,
    name: ?string,
    exists: boolean,
  };

export type Auth = {
    email: string,
    sentEmail: boolean,
    isUser: boolean,
    registerForm: {
      displayName: string,
      email: string,
      username: string,
      shortBio: string
    },
    isSocial: false,
    registerToken: string,
    authResult: AuthResult,
    socialAuthResult: SocialAuthResult,
    verifySocialResult: VerifySocialResult,
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

const VerifySocialResultSubrecord = Record({
    id: '',
    thumbnail: '',
    email: '',
    name: '',
    exists: false,
  });
  const RegisterFormSubrecord = Record({
    displayName: '',
    email: '',
    username: '',
    shortBio: '',
  });
  

  const AuthRecord = Record(({
    email: '',
    sentEmail: false,
    isUser: false,
    registerForm: RegisterFormSubrecord(),
    isSocial: false,
    registerToken: '',
    authResult: null,
    socialAuthResult: null,
    verifySocialResult: null,
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
    ...pender({
        type: VERIFY_SOCIAL,
        onSuccess: (state, { payload: response }) => {
          const { profile, exists } = response.data;
          const { id, thumbnail, email, name } = profile;
          return state.set('verifySocialResult', VerifySocialResultSubrecord({
            id, thumbnail, email, name, exists,
          }));
        },
      }),
      ...pender({
          type: SOCIAL_SONGC_LOGIN,
          onSuccess: (state, { payload: { data } }) => {
            const { user, token } = data;
            return state.set('authResult', AuthResultSubRecord({
                user: UserSubRecord(user),
                token,
            }));
        },
      }),
      [AUTOCOMPLETE_REGISTER_FORM]: (state, { payload }: { payload: AutocompleteFormPayload }) => {
        const { email, name } = payload;
        const registerForm = RegisterFormSubrecord({ displayName: name, email });
        return state.withMutations(
          s => s.set('registerForm', registerForm).set('isSocial', true),
        );
      },
      ...pender({
        type: SOCIAL_REGISTER,
        onSuccess: (state, { payload: { data } }) => {
          const { user, token } = data;
          return state.set('authResult', AuthResultSubRecord({
            user: UserSubRecord(user),
            token,
          }));
        },
      }),
}, initialState);