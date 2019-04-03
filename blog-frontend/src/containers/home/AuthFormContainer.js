// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import type { State} from 'store';
import AuthFrom from '../../components/home/AuthForm';
import { AuthActions } from '../../store/actionCreators';

class AuthFormContainer extends Component {
    render() {
        return (
            <div>
                <AuthFrom />
            </div>
        );
    }
}

export default connect(
    (state: State) => ({
        email: state.auth.email,
    }),
    dispatch => ({}),
)(AuthFormContainer);