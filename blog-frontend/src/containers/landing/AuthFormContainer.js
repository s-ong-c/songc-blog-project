// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import type { State} from 'store';
import AuthFrom from '../../components/landing/AuthForm';
import { AuthActions } from '../../store/actionCreators';
import { pressedEnter} from '../../lib/common';

type Props = {
    email : string,
    sentEmail : boolean,
    sending: boolean,
    isUser: boolean,
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

    onGithubLogin = () => {
        window.name = 'songcApp';
        const url = 'https://github.com/login/oauth/authorize?client_id=2620104e34dccc118b5e&redirect_url=http://localhost3000/callback';
        const githubLogin = popup(url, 'githubLogin',400 , 730);
    }

    render() {
        const { onChange, onSendVerification, onEnterKeyPress, onGithubLogin} = this;
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
                    onGithubLogin={onGithubLogin}
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
    }),
    () => ({}), 
)(AuthFormContainer);