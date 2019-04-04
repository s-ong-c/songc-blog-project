// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import type { State} from 'store';
import AuthFrom from '../../components/home/AuthForm';
import { AuthActions } from '../../store/actionCreators';
import { pressedEnter} from '../../lib/common';

type Props = {
    email : string,
    sentEmail : boolean,
    sending: boolean,
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
            await AuthActions.sendVerificationEmail(email);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { onChange, onSendVerification, onEnterKeyPress} = this;
        const { email, sentEmail, sending}  = this.props;
        return (
                <AuthFrom 
                    email ={email}
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
        sending: pender.pending['auth/SEND_VERIFICATION_EMAIL'],
    }),
    () => ({}), 
)(AuthFormContainer);