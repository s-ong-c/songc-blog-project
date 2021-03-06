// @flow
import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import cx from 'classnames';
import Spinner from '../../../components/common/Spinner';
import SocialLoginButton from '../SocialLoginButton/SocialLoginButton';
import './AuthForm.scss';

type Props = {
    onChange(e: Event): void,
    onSendVerification(): Promise<*>,
    onEnterKeyPress(e: KeyboardEvent): void,
    onSocialLogin(provider: string): any,
    email: string,
    sentEmail: boolean,
    sending: boolean,
    isUser: boolean,
}
const AuthForm = ({ 
    onChange, 
    onSendVerification, 
    onEnterKeyPress,
    email,
    sentEmail,
    sending,
    onSocialLogin,
    isUser,
    }: Props) => {
    return (
        <div className="auth-form">
        {
            sentEmail ? (
                <div className="sent-email">
                    <MdCheckCircle />
                    <div className="text">
                        {isUser ? '로그인' : '회원가입'} 인증 링크가 이메일로 발송 되었습니다. <br />  
                        이메일의 링크를 통하여 {isUser ? '로그인' : '회원가입'} 계속하세요
                    </div>
                </div>
            ) : (
             <div className={cx('input-with-button', {sending})}>
                <input placeholder="이메일을 입력해주세요" value={email} onChange={onChange} disabled={sending} onKeyPress={onEnterKeyPress} />
                <div className="button" onClick={onSendVerification}>
                    {sending ? <Spinner size="3rem" /> : '시작하기'}
                </div>
              </div>
            )
        }

          <div className="separator">
            <div className="or">OR</div>
          </div>
          <div className="social-button">
            <SocialLoginButton type="github" onSocialLogin={onSocialLogin} />
            <SocialLoginButton type="google" onSocialLogin={onSocialLogin} />
            <SocialLoginButton type="facebook" onSocialLogin={onSocialLogin} />
          </div>
        </div>
    );
};

export default AuthForm;