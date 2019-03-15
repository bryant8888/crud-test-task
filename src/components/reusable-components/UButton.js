import React from 'react';

export const UButton = (props) => (
    <button type={props.type || 'button'}
            className={`btn btn-outline-${props.colorScheme} btn-${props.size || 'sm'} float-right`}
            onClick={props.onClick}>
        {props.children}
    </button>
);