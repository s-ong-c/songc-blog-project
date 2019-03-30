import React from 'react';
import './HomeTemplate.scss';
import Responsive from '../../common/Responsive';

const HomeTemplate = () => {
    return (
        <div className="home-template">
            <Responsive className="block">
                <div className="left-text">
                 <div>
                        <h1>언제 front end 를 잘할수 있을까</h1>
                        <div className="description">
                            <p>계속 계속 하면는</p>
                            <p>길 잃은 개발자를 위한 템플릿</p>
                        </div>
                 </div>
                </div>
                <div className="right-form">
                    <div className="black-box">
                        제이름은 송민석 입니다.
                    </div>
                </div>
            </Responsive>
        </div>
    );
};

export default HomeTemplate;