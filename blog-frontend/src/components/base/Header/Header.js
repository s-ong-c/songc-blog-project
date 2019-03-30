// @flow
import React from 'react';
import Responsive from '../../common/Responsive';
import './Header.scss';

const Header = () => (
        <header className="base header">
            <Responsive className="header-wrapper">
                <div className="brand">
                    SONGC
                </div>
                <nav>
                    <a className="active" href="/">트렌딩</a>
                    <a href="/">최신 글</a>
                    <a href="/">태그</a>
                </nav>
                <div className="rigth">
                    right side
                </div>
            </Responsive>
        </header>
    );

export default Header;