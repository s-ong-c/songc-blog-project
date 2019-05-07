// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import type { State} from 'store';
import { withRouter,  type RouterHistory  } from 'react-router-dom';
import AuthFrom from '../../components/landing/AuthForm';
import { AuthActions, UserActions, BaseActions } from '../../store/actionCreators';
import { pressedEnter} from '../../lib/common';
import type { SocialAuthResult, VerifySocialResult, AuthResult } from '../../store/modules/auth';
import storage, { keys} from '../../lib/storage';

type Props = {
    email : string,
    sentEmail : boolean,
    sending: boolean,
    isUser: boolean,
    socialAuthResult: SocialAuthResult,
    verifySocialResult: VerifySocialResult,
    authResult: AuthResult,
    history: RouterHistory,
}
function popup(url, title, w, h) {
    const y = (window.top.outerHeight / 2) + (window.top.screenY - (h / 2));
    const x = (window.top.outerWidth / 2) + (window.top.screenX - (w / 2));
    return window.open(url, title, `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=${w},height=${h},top=${y},left=${x}`);
}

class AuthFormContainer extends Component<Props> {
    githubLogin: any = null;
    onEnterKeyPress = pressedEnter(() => {
        this.onSendVerification();
     })


    onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
        const { value } = e.target;
        AuthActions.setEmailInput(value);
    }
    onSendVerification = async (): Promise<*> => {
        const { email} = this.props;
        try {
            await AuthActions.sendAuthEmail(email);
        } catch (e) {
            console.log(e);
        }
    }

    onSocialLogin = async (provider: string) => {
        BaseActions.setFullscreenLoader(true);
        try {
            await AuthActions.socialLogin(provider);
        } catch (e) {
            // TODO : handle 소셜 로그인 에러
            BaseActions.setFullscreenLoader(false);
            return;
        }

        try {
            const { socialAuthResult } = this.props;
            if (!socialAuthResult) return;
            const { accessToken } = socialAuthResult;
            await AuthActions.verifySocial({ accessToken, provider});

            const { verifySocialResult } = this.props;
            if (!verifySocialResult) return;
            const { exists } = verifySocialResult;
            console.log(exists);
            if (exists) {
                // 로그인
                await AuthActions.socialSongcLogin({ accessToken, provider });
                const { authResult } = this.props;
                if (!authResult) return;
                const { user } = authResult;
                UserActions.setUser(user);
                storage.set(keys.user, user);
            } else {
                // 회원가입
                const { email, name } = verifySocialResult;
                if (!email) {
                  // TODO  
                }
                AuthActions.autoCompleteRegisterForm({ email, name});
                this.props.history.push('/register');
            }
        } catch (e) {
            // TODO verify Error
        }
        BaseActions.setFullscreenLoader(false);
    }

    render() {
        const { onChange, onSendVerification, onEnterKeyPress, onSocialLogin} = this;
        const { email, sentEmail, sending, isUser}  = this.props;
        return (
                <AuthFrom 
                    email ={email}
                    isUser={isUser}
                    sending = {sending}
                    sentEmail= {sentEmail}
                    onChange={onChange}
                    onSendVerification={onSendVerification}
                    onEnterKeyPress={onEnterKeyPress}
                    onSocialLogin={onSocialLogin}
                />
        );
    }
}

export default connect(
    ({ auth, pender }: State) => ({
        email: auth.email,
        sentEmail: auth.sentEmail,
        isUser: auth.isUser,
        sending: pender.pending['auth/SEND_AUTH_EMAIL'],
        socialAuthResult: auth.socialAuthResult,
        verifySocialResult: auth.verifySocialResult,
        authResult: auth.authResult,
    }),
    () => ({}), 
)(withRouter(AuthFormContainer));