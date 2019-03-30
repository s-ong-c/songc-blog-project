import React from 'react';
import './HomeTemplate.scss';
import Responsive from '../../common/Responsive';

const HomeTemplate = () => {
    return (
        <div className="home-template">
            <Responsive className="block">
                <div className="left-text">
                 <div>
                        <h1>SONGC는 대체 <br />어디서 글을 작성 해야하나...</h1>
                        <div className="description">
                            <p>이제부턴 SONGCSONGC!</p>
                            <p>길 잃은 글 쓰고픈 개발자들을 취향저격할 글쓰기 플랫폼이 바로 요기에! <br />
                            마크다운, 코드 하이라이팅 등... 그만 고민하고 지금 시작하자.
                            </p>
                        </div>
                 </div>
                </div>
                <div className="right-form">
                    <div className="black-box">
                        제이름은 송민석 입니다.
                    </div>
                 <div className="register-button">
                    지금 시작하기
                 </div>
                </div>
            </Responsive>
        </div>
    );
};

export default HomeTemplate;