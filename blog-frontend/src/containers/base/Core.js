// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import type { State } from 'store';
import { UserActions } from '../../store/actionCreators';
import type { UserData } from '../../store/modules/user';
import storage from '../../lib/storage';
import FullscreenLoaderContainer from './FullscreenLoaderContainer';

type Props = {
    user: ?UserData
  }
class Core extends Component<Props> {
    checkUser = async () => {
        const storedUser = storage.get('__songc_user__');
        if (!storedUser) {
            UserActions.process();
            return;
        }
        UserActions.setUser(storedUser);
        try {
            await UserActions.checkUser();
        } catch (e) {
            console.log(e);
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
          <Fragment>
            <FullscreenLoaderContainer />
          </Fragment>
        );
      }
    }
export default connect(
    ({ user }: State) => ({
      user: user.user,
    }),
    () => ({}),
  )(Core);