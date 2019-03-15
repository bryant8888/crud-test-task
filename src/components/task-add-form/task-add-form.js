import React from 'react';
import './task-add-form.css';
import {UButton} from "../reusable-components/UButton";
import {UInput} from "../reusable-components/UInput";

export default class TaskAddForm extends React.Component {

    render() {
        return (
            <form className="add-tasks d-flex"
                  onSubmit={(event) => {
                      event.preventDefault();
                      return this.props.handleSubmit.bind(this)();
                  }}>
                <UInput onChange={this.props.handleChange}/>
                <UButton type={'submit'} colorScheme={'success'}>Add Task</UButton>
            </form>
        );
    }
}
