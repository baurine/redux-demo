// ^^^ notice! must select ES6/Babel compile
// jsbin.com

/////////////////////////////////////////////////

// define Reducer

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    default:
      return state;
  }
}

// create Store

const { createStore } = Redux;

const store = createStore(todos);

/////////////////////////////////////////////////

const { Component } = React

let nextId = 3

class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='input' ref={node=>this.input=node}/>
        <button onClick={()=>{
          this.props.onClick({id: nextId++, text: this.input.value})
          this.input.value=''
        }}>
          Add Todo
        </button>
      </div>
    )
  }
}

class TodoList extends Component {
  render() {
    const { todos } = this.props
    
    return (
      <div>
        <ul>
          {todos.map((todo)=>{
            return (
              <li key={todo.id}
                  onClick={()=>this.props.onToggle(todo.id)}
                  style={{
                    textDecoration: todo.completed? 'line-through':'none'
                  }}>
                {todo.text}
              </li>
            ) 
          })}
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
  constructor() {
    super()
    this.state = {
      todos: [
        {id: 1, text: 'Learn Redux', completed: true},
        {id: 2, text: 'Go Shopping', completed: false}
      ]
    }
  }
  
  _onAddTodo(todo) {
    this.state.todos.push(todo)
    console.log(this.state.todos)
    
    // invoke render() call
    this.setState({todos: this.state.todos})
  }
  
  _onToggleTodo(id) {
    this.state.todos.forEach((todo)=>{
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
    })
    
    // invoke render() call
    this.setState({todos: this.state.todos})
  }
  
  render() {
    return (
      <div>

        <AddTodo onClick={(todo)=>this._onAddTodo(todo)}/>

        <TodoList todos={this.state.todos}
                  onToggle={(id)=>this._onToggleTodo(id)}/>

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


