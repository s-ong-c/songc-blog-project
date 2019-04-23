// @flow
import React, { Component, type Node } from 'react';
import Header from '../../components/base/Header';
import withUser from '../../lib/hoc/withUser';
import type { UserData} from '../../store/modules/user';

type Props = {
    user: ?UserData,
};
class HeaderContainer extends Component<Props> {
    renderRight(): Node {
        // declare what to show @ right side of header
        const { user } = this.props;
        if (!user) {
            return (<div>HELLO</div>);
        }
        return ( 
            <div>WORLD</div>
        );
    }
    render() {
        return (
            <Header 
                right={this.renderRight()}
            />
        );
    }
}

export default withUser(HeaderContainer); 