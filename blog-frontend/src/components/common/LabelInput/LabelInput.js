// @flow
import React from 'react';
import cx from 'classnames';
import './LabelInput.scss';

type Props = {
    label: string,  
    limit: ?number,
    value?: string,
    disabled?: boolean,
    required?: boolean,
};

const LabelInput = ({ label, value, limit, required, disabled, ...rest }: Props) => {
    return (
        <div className={cx('register label-input', {disabled})}>
            <div className="label">{ label }{required && <span>*</span>}</div>
            <input value={value} {...rest} disabled={disabled} />
            { limit && (
                <div className="limit">
                    { !value ? 0 : value.length } / { limit}
                </div>  
            )}
        
        </div>
    );
};

LabelInput.defaultProps = {
    value: '',
    disabled: false,
    required: false,
    limit: null,
};

export default LabelInput;