// @flow
import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import LabelInput from '../../common/LabelInput';
import './RegisterForm.scss';

const RegisterForm = () => {
    return (
        <div className="register-form">
          <div className="form-head">
          <h2>기본 회원정보 등록</h2>
          </div>
          <div className="form-contents">
             <LabelInput required label="이름" placeholder="이름을 입력하세요 " />
             <LabelInput required label="이메일" value="somony9292@gmail.com" disabled  />
             <LabelInput required label="아이디" placeholder="아이디를 입력하세요!" />
             <LabelInput label="한줄소개" placeholder="한줄 소개를 입력하세요" />
             <div className="agreement">
                 다음 버튼을 누르면 <span>서비스 이용약관 </span>과  <span> 개인정보취급방침</span>에 동의하는 것을 인정합니다.
             </div>
             <div className="button-wrapper">
                <div className="icon-button">
                    <span>다음</span>
                    <MdArrowForward />
                </div>
            </div>
        </div>
     </div>
    );
};

export default RegisterForm;