// @flow
import React from 'react';
import cx from 'classnames';
import { FaGoogle,FaGithub,FaFacebook} from 'react-icons/fa';
import './SocialLoginButton.scss';


type Props = {
    type: 'facebook' | 'google' | 'github',
    onSocialLogin(provider: string): void,
};

const providers = {
    github: {
        icon: FaGithub,
    },
    facebook: {
        icon: FaFacebook,
    },
    google: {
        icon: FaGoogle,
    },
};

const SocialLoginButton = (props: Props) => {
    const { type, onSocialLogin } = props;
    const { icon: Icon } = providers[type];
    return (
        <div className={cx('social-login-button',type)} onClick={() => onSocialLogin(type)}>
            <div className="icon">
                <Icon />
            </div>
            <div className="text">
            {type} <span className="login">로그인</span>
            </div>
        </div>
    );
};

SocialLoginButton.defaultProps = {
    type: 'github',
  };

export default SocialLoginButton;