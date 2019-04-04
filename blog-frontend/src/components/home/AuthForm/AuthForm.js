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
    email: string,
    sentEmail: boolean,
    sending: boolean,
}
const AuthForm = ({ 
    onChange, 
    onSendVerification, 
    onEnterKeyPress,
    email,
    sentEmail,
    sending,
    }: Props) => {
    return (
        <div className="auth-form">
        {
            sentEmail ? (
                <div className="sent-email">
                    <MdCheckCircle />
                    <div className="text">
                        회원가입 인증 링크가 이메일로 발송 되었습니다. <br />  
                        이메일의 링크를 통하여 회원가입을 계속하세요
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
            <SocialLoginButton type="github" />
            <SocialLoginButton type="google" />
            <SocialLoginButton type="facebook" />
          </div>
        </div>
    );
};

export default AuthForm;