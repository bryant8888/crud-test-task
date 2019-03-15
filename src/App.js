import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ContentEditable from "react-contenteditable";
import {TaskEntity} from "./entities/task-entity";
import TaskAddForm from './components/task-add-form';
import {TaskListItem} from "./components/task-list-item/task-list-item";

class App extends Component {
  state = {
        tasks: [],
        //editable: false,
        title: ''
  };

  //Получение данных с сервера
  componentDidMount() {
    axios.get('http://localhost:3000/posts')
         .then((response) => {
             console.log(response.data);
             this.setState({tasks: response.data.map(data => new TaskEntity(data.title, data.id, false))}, () => {
                 console.log(this.state.tasks);
             });
         }, (error) => console.log(error));
  }


  //Отображение данных в input
  handleChange = event => {
      console.log(event.target.value);
      this.setState({ title: event.target.value });
  };


  // handleSubmit = (title) => {
  //     console.log(title);
  //
  // };


  handleChangeTask = (id, event) => {
      console.log(id, event);
      const idx = this.state.tasks.findIndex((el) => el.id === id);
      const changeTask = { title: event.target.value, id: id, isEditable: !this.state.tasks.isEditable };
      const newArray = [
          ...this.state.tasks.slice(0, idx),
          changeTask,
          ...this.state.tasks.slice(idx + 1)
      ];
      this.setState({
          tasks: newArray //.map(data => new TaskEntity(data.title, data.id, !data.isEditable))
      }, () => console.log(this.state.tasks));

  };

  //Добавление новой задачи
  handleSubmit = () => {

      const newTask = {
          title: this.state.title,
          "id": Math.random()
      };

      axios
          .post('http://localhost:3000/posts', newTask)
          .then((response) => {
              console.log(response.data);
              const addedTask = {title: response.data.title, id: response.data.id};
              const updatedTasksList = this.state.tasks.concat([addedTask]);

              this.setState({ tasks: updatedTasksList });
          });
  };

  //Редактирование задачи
  editSubmit = (id) => {
          const idx = this.state.tasks.findIndex((el) => el.id === id);
          const oldTask = this.state.tasks[idx];
          const newTask = {...oldTask, isEditable: !oldTask.isEditable};
          const newArray = [
              ...this.state.tasks.slice(0, idx),
              newTask,
              ...this.state.tasks.slice(idx + 1)
          ];
          console.log(newArray);

          axios
              .put(`http://localhost:3000/posts/${id}`, newTask )
              .then((response) => {
                   console.log(response.data);

                   this.setState({ tasks: newArray });
              });
          // return {
          //     tasks: newArray //.map(data => new TaskEntity(data.title, data.id, !data.isEditable))
          // }
          //{ editable: !this.state.editable }
  };

  deleteSubmit = (id) => {
      const idx = this.state.tasks.findIndex((el) => el.id === id);
      const before = this.state.tasks.slice(0, idx);
      const after = this.state.tasks.slice(idx + 1);

      const newArray = [...before, ...after];

      axios
          .delete(`http://localhost:3000/posts/${id}`)
          .then((response) => {
              // const addedTask = {title: response.data.title, id: response.data.id};
              // const updatedTasksList = this.state.tasks.concat([addedTask]);

              this.setState({
                  tasks: newArray.map(data => new TaskEntity(data.title, data.id, false))
              }, () => console.log(this.state.tasks));
          });

  };


  listGroupStyle() {
    return (this.state.editable ? 'todo-text editable' : 'todo-text');
  }

  titleHTML(task) {
      return task && task.title ? task.title : '';
  }

  render() {

    const taskList = () => {

        let classNames = 'todo-text';
        if (this.props.isEditable) {
            classNames += ' editable';
        }
        //setTimeout(() => console.log(this.props.isEditable, this.state.tasks[0].isEditable), 1000);

          return (
              <ul className="list-group">{this.state.tasks.map(task =>
                  <TaskListItem key={task.id}
                                handleChangeTask={this.handleChangeTask.bind(this, task.id)}
                                editSubmit={this.editSubmit.bind(this, task.id, task.isEditable)}
                                deleteSubmit={this.deleteSubmit.bind(this, task.id)}
                                task={task} title={this.titleHTML(task)} />)}
              </ul>
          )
    };

    return (
      <div className="app-todo">
        <h1>My todo List</h1>
        <TaskAddForm
            handleSubmit={this.handleSubmit.bind(this)}
            handleChange={this.handleChange.bind(this)}/>
        {taskList()}
      </div>
    );
  }
}

export default App;
