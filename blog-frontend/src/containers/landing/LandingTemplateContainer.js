import React from 'react';
import LandingTemplate from '../../components/landing/LandingTemplate';
import withUser from '../../lib/hoc/withUser';
const LandingTemplateContainer = (props) => {
    if (props.user) return null;

    return (
        <LandingTemplate {...props} />
    );
};

export default withUser(LandingTemplateContainer);