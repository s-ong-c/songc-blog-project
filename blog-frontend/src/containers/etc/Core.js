// @flow
import React, { Component } from 'react';
import { UserActions } from '../../store/actionCreators';

type Props = {

};
class Core extends Component<Props> {
    initialize = async () =>  {
        UserActions.checkUser();
    }   
    componentDidMount() {
        this.initialize();
    }
    render() {
        return (
            <div />
        );
    }
}

export default Core;