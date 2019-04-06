// @flow
import React, { Component } from 'react';
import BackgroundColor from '../../../components/common/BackgroundColor';
import Responsive from '../../common/Responsive';
import './RegisterTemplate.scss';

type Props = {};
class RegisterTemplate extends Component<Props> {
    render() {
        return (
            <div className="register-template">
                <BackgroundColor color="#495057"/>
                <Responsive className="mock-header">
                    <div className="brand">
                        SONGC
                    </div>
                    <div className="light">
                      <span>/</span>회원가입 
                    </div>
                </Responsive>
                <section className="reset">
                    <div className="register-card">
                     hello
                    </div>
                </section>
            </div>
        );
    }
}

export default RegisterTemplate;