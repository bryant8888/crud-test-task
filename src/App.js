import React from 'react';
import './App.css';
import axios from 'axios';
import {TaskEntity} from "./entities/task-entity";
import TaskAddForm from './components/task-add-form';
import {TaskList} from "./components/task-list/task-list";

class App extends React.Component {
    state = {
        tasks: [],
        title: ''
    };

    //Получение данных с сервера
    componentDidMount() {
        axios.get('http://localhost:3000/posts')
            .then((response) => {
                this.setState({
                    tasks: response.data.map(data => new TaskEntity(data.title, data.id, false))
                });
            }, (error) => console.log(error));
    }


    //Отображение данных в input
    handleChange = event => {
        this.setState({title: event.target.value});
    };


    //Редактирование таски
    handleChangeTask = (id, event) => {
        const idx = this.state.tasks.findIndex((el) => el.id === id);
        const changeTask = {title: event.target.value, id: id, isEditable: !this.state.tasks.isEditable};
        const newArray = [
            ...this.state.tasks.slice(0, idx),
            changeTask,
            ...this.state.tasks.slice(idx + 1)
        ];
        this.setState({
            tasks: newArray
        });
    };

    //переключение режиме редактирования у таски
    editSubmit = (id) => {
        const idx = this.state.tasks.findIndex((el) => el.id === id);
        const oldTask = this.state.tasks[idx];
        const newTask = {...oldTask, isEditable: !oldTask.isEditable};
        const newArray = [
            ...this.state.tasks.slice(0, idx),
            newTask,
            ...this.state.tasks.slice(idx + 1)
        ];

        axios
            .put(`http://localhost:3000/posts/${id}`, newTask)
            .then((response) => {
                this.setState({tasks: newArray});
            });
    };

    //Добавление новой таски
    handleSubmit = () => {
        const newTask = {
            title: this.state.title,
            "id": Math.random()
        };

        axios
            .post('http://localhost:3000/posts', newTask)
            .then((response) => {
                const addedTask = {title: response.data.title, id: response.data.id};
                const updatedTasksList = this.state.tasks.concat([addedTask]);
                this.setState({tasks: updatedTasksList});
            });
    };

    //Удаление таски
    deleteSubmit = (id) => {
        const idx = this.state.tasks.findIndex((el) => el.id === id);
        const before = this.state.tasks.slice(0, idx);
        const after = this.state.tasks.slice(idx + 1);

        const newArray = [...before, ...after];

        axios
            .delete(`http://localhost:3000/posts/${id}`)
            .then((response) => {
                this.setState({
                    tasks: newArray.map(data => new TaskEntity(data.title, data.id, false))
                });
            });
    };

    // рендерит заголовок таски, в противном случае пустую строку(для избегания throw Error)
    titleHTML(task) {
        return task && task.title ? task.title : '';
    }


    render() {
        return (
            <div className="app-todo">
                <h1>My todo List</h1>
                <TaskAddForm
                    handleSubmit={this.handleSubmit.bind(this)}
                    handleChange={this.handleChange.bind(this)}/>
                <TaskList
                    handleChangeTask={this.handleChangeTask}
                    editSubmit={this.editSubmit}
                    deleteSubmit={this.deleteSubmit}
                    tasks={this.state.tasks}
                    titleHTML={this.titleHTML}/>
            </div>
        );
    }
}

export default App;
