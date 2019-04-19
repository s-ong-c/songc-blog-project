// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State } from 'store';
import storage from '../../lib/storage';
import { UserActions } from '../../store/actionCreators';
type Props = {
    user: ? {
        id: string,
        username: string,
        displayName: string,
    }
};
class Core extends Component<Props> {
    checkUser = async () => {
        const storedUser = storage.get('__songc_user__');
        if (!storedUser) {
            UserActions.process();
            return;
        }
        try {
            await UserActions.checkUser();
        } catch (e) {
            storage.remove('__songc_user__');
        }
    }
    initialize = async () => {
        this.checkUser();
      }
      componentDidMount() {
        this.initialize();
      }
    render() {
        return (
            <div />
        );
    }
}

export default connect(
    ({ user }: State) => ({
        user: user.user,
        
    }),
)(Core);