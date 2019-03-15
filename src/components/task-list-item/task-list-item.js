import React from 'react';
import './task-list-item.css';
import ContentEditable from "react-contenteditable";
import {UButton} from "../reusable-components/UButton";

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

                <UButton onClick={this.props.editSubmit} colorScheme={'success'}>
                    <i className="far fa-edit" />
                </UButton>
                <UButton onClick={this.props.deleteSubmit} colorScheme={'danger'}>
                    <i className="fas fa-trash-alt" />
                </UButton>
            </li>);
    };
}