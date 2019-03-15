import React from 'react';

export const UInput = (props) => (
    <input type="text"
           className="form-control add-input"
           onChange={props.onChange}
           placeholder="write a new task" />
);