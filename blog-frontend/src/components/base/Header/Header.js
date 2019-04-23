// @flow
import React, { type Node } from 'react';
import Responsive from '../../common/Responsive';
import './Header.scss';

type Props ={
    right: Node,
    userMenu: Node,
};

const Header = ({ right,userMenu}: Props) => (
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
                    {right}
                    {userMenu}
                </div>
              
            </Responsive>
        </header>
    );

export default Header;