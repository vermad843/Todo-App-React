import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      heading: "Todos",
      newTodo: "",
      todos: [
        {
          title: "Learn React",
          done: false
        },
        {
          title: "Learn Vue",
          done: false
        }
      ]
    };
    this.formSubmitted = this.formSubmitted.bind(this);
    this.handleChanged = this.handleChanged.bind(this);
  }

  formSubmitted(e) {
    e.preventDefault();
    this.setState({
      newTodo: "",
      todos: [
        ...this.state.todos,
        {
          title: this.state.newTodo,
          done: false
        }
      ]
    });
  }

  handleChanged(e) {
    this.setState({
      newTodo: e.target.value
    });
  }

  toggleTodoDone(event, index) {
    const todos = [...this.state.todos];
    todos[index] = { ...todos[index] };
    todos[index].done = event.target.checked;
    this.setState({
      todos
    });
  }

  removeTodo(index) {
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({
      todos
    });
  }

  allDone() {
    const todos = this.state.todos.map(todo => {
      return {
        title: todo.title,
        done: true
      };
    });
    this.setState({
      todos
    });
  }

  render() {
    const { heading, todos, newTodo } = this.state;
    return (
      <div>
        <h1>{heading}</h1>
        <form onSubmit={this.formSubmitted}>
          <label htmlFor="newTodo">NewTodo</label>
          <input
            onChange={this.handleChanged}
            name="newTodo"
            id="newTodo"
            value={this.newTodo}
          />
          <button type="submit">Add Todo</button>
        </form>
        <button onClick={() => this.allDone()}>All Done</button>
        <ul>
          {todos.map((todo, index) => {
            return (
              <li>
                <input
                  onChange={event => this.toggleTodoDone(event, index)}
                  type="checkbox"
                  checked={todo.done}
                />
                <span
                  style={{
                    textDecoration: todo.done ? "line-through" : "inherit"
                  }}
                >
                  {todo.title}
                </span>
                <button onClick={() => this.removeTodo(index)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
