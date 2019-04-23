import React from 'react';
import withClickOutside from 'react-onclickoutside';
import './UserMenu.scss';

type Props = {
    onClickOutside(e: any): void
};

const UserMenu = () => {
    return (
        <div className="user-menu-wrapper">
            <div className="user-menu-positioner">
                <div className="user-menu">
                    <div className="me">
                        <div className="username">
                            @songc
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withClickOutside(UserMenu, {
    handleClickOutside(instance) {
      return instance.props.onClickOutside;
    },
  });