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
class AuthFormContainer extends Component<Props> {
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

    render() {
        const { onChange, onSendVerification, onEnterKeyPress} = this;
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