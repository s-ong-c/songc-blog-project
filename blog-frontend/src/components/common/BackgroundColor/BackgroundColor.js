// @flow
import React, { Component } from 'react';

type Props = {
    color: string,
};

class BackgroundColor extends Component<Props> {
    componentDidMount() {
        const { color} = this.props;
    }
    prevColor = null;

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default BackgroundColor;