// ^^^ notice! must select ES6/Babel compile
// jsbin.com

const { Component } = React

class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='input'/>
        <button>Add Todo</button>
      </div>
    )
  }
}

class TodoList extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>Learn Redux</li>
          <li>Go Shopping</li>
        </ul>
      </div>
    )
  }
}

class TodoFilter extends Component {
  render() {
    return (
      <p>
        Show:{' '}
        <span>All</span>{' '}
        <a href='#'>Active</a>{' '}
        <a href='#'>Completed</a>
      </p>
    )
  }
}

class TodoApp extends Component {
  render() {
    return (
      <div>

        <AddTodo/>

        <TodoList/>

        <TodoFilter/>

      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp/>,
    document.getElementById('root')
  )
}

render()