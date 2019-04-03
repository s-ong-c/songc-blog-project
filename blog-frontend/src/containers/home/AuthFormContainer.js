// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import type { State} from 'store';
import AuthFrom from '../../components/home/AuthForm';
import { AuthActions } from '../../store/actionCreators';

type Props = {
    email : string,
    sentEmail : boolean,
}
class AuthFormContainer extends Component<Props> {
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
        const { onChange, onSendVerification } = this;
        const { email, sentEmail}  = this.props;
        return (
                <AuthFrom 
                    email ={email}
                    sentEmail= {sentEmail}
                    onChange={onChange}
                    onSendVerification={onSendVerification}
                />
        );
    }
}

export default connect(
    ({ auth }: State) => ({
        email: auth.email,
        sentEmail: auth.sentEmail,
    }),
    () => ({}),
)(AuthFormContainer);