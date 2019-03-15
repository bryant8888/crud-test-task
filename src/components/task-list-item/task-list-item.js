import React from 'react';
import './task-list-item.css';
import ContentEditable from "react-contenteditable";

export class TaskListItem extends React.Component {
    render() {
        const {task} = this.props;

        return (
            <li key={task.id} className="list-group-item">
                <ContentEditable
                    className={task.isEditable ? 'todo-text editable' : 'todo-text'}
                    tagName="p"
                    html={this.props.title}
                    disabled={!task.isEditable}
                    onChange={this.props.handleChangeTask}/>

                <button type="button"
                        className="btn btn-outline-success btn-sm float-right"
                        onClick={this.props.editSubmit}>
                    <i className="far fa-edit" />
                </button>
                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right"
                        onClick={this.props.deleteSubmit}>
                    <i className="fas fa-trash-alt" />
                </button>
            </li>);
    };
}