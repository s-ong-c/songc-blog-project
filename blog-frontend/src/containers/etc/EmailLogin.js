// @flow
import React, { Component } from 'react';
import { type Match, type Location, type RouterHistory  } from 'react-router-dom';
import queryString from 'query-string';
import { AuthActions } from '../../store/actionCreators';

type Props = {
    location: Location,
    history: RouterHistory,
};

class EmailLogin extends Component<Props> {
    initialize = async () => {
        const { search } = this.props.location;
        const { code } = queryString.parse(search);

        
        // if (!code) {
        //     // TODO: ERROR WHEN NO CODE
        // }
        try {
           await AuthActions.codeLogin(code);
        } catch (e) {
            // TODO: initialize ERROR 
            console.log(e);
        }
        const { history }  = this.props;
        history.push('/');
    }
    componentDidMount() {
        this.initialize();
    }
    render() {
        return (
           null
        );
    }
}

export default EmailLogin;