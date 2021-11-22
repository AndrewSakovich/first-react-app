import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch"),
    ],
    findState:'',
    filter: {
      done: false,
      active: false,
      findItem: false
    },
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      const newArray = [...before, ...after];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    });
    console.log("toggle imp", id);
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
    console.log("toggle done", id);
  };

  onClickAll = () => {
    this.setState({
      filter: {
        active: false,
        done: false,
      },
    });
  };
  onClickActive = () => {
    this.setState({
      filter: {
        active: true,
        done: false,
      },
    });
  };

  onClickDone = () => {
    this.setState({
      filter: {
        active: false,
        done: true,
      },
    });
  };

  onFindItem = (e) =>{
      this.setState({
        findState: e.target.value,

        filter: {
          findItem:true
        }
      })
    
  }

  fileterData = (todoData, filter,findState ) => {
    if (filter.done) {
      return todoData.filter((el) => el.done);
    }
    if (filter.active){
    return todoData.filter((el) => !el.done);
    }
    if(filter.findItem){

      console.log('##',todoData)
      
      return todoData.filter((el) => {
        return el.label.toLowerCase().includes(findState.toLowerCase())
        
      })
    }
    return todoData
  };

  render() {
    const { todoData, filter, findState } = this.state;

    const doneCount = todoData.filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;

    const filteredTodoData = this.fileterData(todoData, filter, findState);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel 
          onFindItem = {this.onFindItem}
          findState = {findState}
          fileter={filter}/>
          <ItemStatusFilter
            onClickAll={this.onClickAll}
            onClickActive={this.onClickActive}
            onClickDone={this.onClickDone}
            filter={filter}
          />
        </div>
        <TodoList
          todos={filteredTodoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
