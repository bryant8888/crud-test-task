import React from 'react';
import './task-add-form.css';

export default class TaskAddForm extends React.Component {

    render() {
        return (
            <form className="add-tasks d-flex"
                  onSubmit={(event) => {
                      event.preventDefault();
                      return this.props.handleSubmit.bind(this)();
                  }}>
                <input type="text"
                       className="form-control add-input"
                       onChange={this.props.handleChange}
                       placeholder="write a new task" />
                <button
                    type="submit" className="btn btn-success">
                    Add Task
                </button>
            </form>
        );
    }
}
