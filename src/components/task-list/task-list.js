import {TaskListItem} from "../task-list-item/task-list-item";
import React from "react";

export const TaskList = (props) => {

    // let classNames = 'todo-text';
    // if (this.props.isEditable) {
    //     classNames += ' editable';
    // }
    //setTimeout(() => console.log(this.props.isEditable, this.state.tasks[0].isEditable), 1000);

    const {tasks} = props;

    return (
        <ul className="list-group">{tasks.map(task =>
            <TaskListItem key={task.id}
                          handleChangeTask={props.handleChangeTask.bind(this, task.id)}
                          editSubmit={props.editSubmit.bind(this, task.id, task.isEditable)}
                          deleteSubmit={props.deleteSubmit.bind(this, task.id)}
                          task={task} title={props.titleHTML(task)} />)}
        </ul>
    )
};