// @flow
import React from 'react';
import './FullscreenLoader.scss';
import Spinner from '../../common/Spinner';

type Props = { 
 visible: boolean,
};

const FullscreenLoader = ({ visible }: Props) => {
    if (!visible) return null;
    return (
        <div className="FullscreenLoader">
            <Spinner />
        </div>
    );
};

export default FullscreenLoader;