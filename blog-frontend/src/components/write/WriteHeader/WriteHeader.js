import React from 'react';
import './WriteHeader.scss';
import { MdArrowBack} from 'react-icons/md';
const WriteHeader = () => {
    return (
        <div className="WriteHeader">
            <MdArrowBack className="back-icon"/>
            <div className="title-area">
                <input placeholder="제목을 입력하세요"/>
            </div>
            <div className="submit-button">
                작성하기
            </div>
        </div>
    );
};

export default WriteHeader;