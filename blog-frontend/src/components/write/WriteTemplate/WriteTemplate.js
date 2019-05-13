import React from 'react';
import './WriteTemplate.scss';
const WriteTemplate = ({ header, panes }) => {
    return (
        <div className="WriteTemplate">
            { header}
            <div className="reset">
            { panes }
            </div>
        </div>
    );
};

export default WriteTemplate;