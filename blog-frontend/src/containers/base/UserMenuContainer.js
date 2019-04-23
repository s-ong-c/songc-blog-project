// @flow
import React, { Component } from 'react';
import withClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import type { State } from 'store';
import UserMenu from '../../components/base/UserMenu';
import { BaseActions } from '../../store/actionCreators';

type Props = {
    visible: boolean
  };

class UserMenuContainer extends Component<Props> {
    onClickOutside = (e) => {
        BaseActions.hideUserMenu();
      }

    render() {
        const { visible } = this.props;
        const { onClickOutside } = this;
        if (!visible) return null;

        return (
            <UserMenu onClickOutside={onClickOutside} eventTypes={['click', 'touchend']} />
        );
    }
}

export default connect(
    ({ base }: State) => ({
      visible: base.userMenu,
    }),
    () => ({}),
  )(UserMenuContainer);