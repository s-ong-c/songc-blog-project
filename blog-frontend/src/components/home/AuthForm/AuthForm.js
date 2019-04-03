// @flow
import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import SocialLoginButton from '../SocialLoginButton/SocialLoginButton';
import './AuthForm.scss';

type Props = {
    onChange(e: Event): void,
    onSendVerification(): Promise<*>,
    email: string,
    sentEmail: boolean,
}
const AuthForm = ({ 
    onChange, 
    onSendVerification, 
    email,
    sentEmail,
    }: Props) => {
    return (
        <div className="auth-form">
        {
            sentEmail ? (
                <div className="sent-email">
                    <MdCheckCircle />
                    <div className="text">
                        회원가입 인증 링크가 이메일로 발송 되었습니다. <br />  
                        이메일의 링크를 통하여 회원가입을 계속하세요 !!!
                    </div>
                </div>
            ) : (
             <div className="input-with-button">
                <input placeholder="이메일을 입력해주세요" value={email} onChange={onChange} />
                <div className="button" onClick={onSendVerification}>시작하기</div>
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