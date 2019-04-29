import React, { Component } from 'react';
import { type Match, type Location, type RouterHistory  } from 'react-router-dom';
import queryString from 'query-string';

type Props : {

}

class Callback extends Component<Props> {
    initialize = () => {
        const { search } = this.props.location; 
        const { provider } = this.props.params;

        const { code } = queryString(search);
        window.opener.socialAuth = {
            provider: 'github',
            code: 'code',
        };
    }

    componentDidMount() {
    }
    render() {
        return null;
    }
}

export default Callback;