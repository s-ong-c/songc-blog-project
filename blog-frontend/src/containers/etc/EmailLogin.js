// @flow
import React, { Component } from 'react';
import { type Match, type Location, type RouterHistory  } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import type { State }  from 'store';
import type { AuthResult } from '../../store/modules/auth';
import { AuthActions, UserActions } from '../../store/actionCreators';
import storage, { keys} from '../../lib/storage';

type Props = {
    location: Location,
    history: RouterHistory,
    authResult: AuthResult,
};

class EmailLogin extends Component<Props> {
    initialize = async () => {
        const { search } = this.props.location;
        const { code } = queryString.parse(search);
        try {
           await AuthActions.codeLogin(code);
           const { authResult } = this.props;
          
           if (!authResult) return;
           const {user, token} = authResult;
           
           UserActions.setUser(user);
           storage.set(keys.user, user);
        } catch (e) {
            // TODO: initialize ERROR 
            console.log(e);
        }
        const { history }  = this.props;
        history.push('/');
    }
    componentDidMount() {
        this.initialize();
    }
    render() {
        return (
           null
        );
    }
}

export default connect(
    ({ auth}: State) => ({
        authResult: auth.authResult,
    }),
    () => ({}),
)(EmailLogin);