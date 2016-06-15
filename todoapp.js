// ^^^ notice! must select ES6/Babel compile
// jsbin.com

const { Component } = React

class TodoApp extends Component {
  render() {
    return (
      <div>

        <input type='input'/>
        <button>Add Todo</button>

        <ul>
          <li>Learn Redux</li>
          <li>Go Shopping</li>
        </ul>

        <p>
          Show:
          <span>All</span>{' '}
          <a href='#'>Active</a>{' '}
          <a href='#'>Completed</a>
        </p>

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