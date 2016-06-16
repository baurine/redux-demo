// ^^^ notice! must select ES6/Babel compile
// jsbin.com

/////////////////////////////////////////////////

// define Action Creator

const addTodo = (id, text) => {
  return {
    type: 'ADD_TODO',
    id,
    text
  }
}

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

const filterTodo = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

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
      ]
    case 'TOGGLE_TODO':
      return state.map((todo)=>{
        if (todo.id !== action.id) {
          return todo
        }
        return {
          ...todo,
          completed: !todo.completed
        }
      })
    default:
      return state
  }
}

// another reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

// create Store

const { combineReducers, createStore } = Redux

const rootReducer = combineReducers({
  todos,
  visibilityFilter
})

const store = createStore(rootReducer)

/////////////////////////////////////////////////

const { Component } = React

let nextId = 3

class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='input' ref={node=>this.input=node}/>
        <button onClick={()=>{
          store.dispatch(addTodo(nextId++, this.input.value))
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
                  onClick={()=>{
                    store.dispatch(toggleTodo(todo.id))
                  }}
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

/////////////////////////////////////////////////

class TodoApp extends Component {
  
  render() {
    return (
      <div>

        <AddTodo />

        <TodoList todos={this.props.todos}/>

        <TodoFilter/>

      </div>
    )
  }
}

/////////////////////////////////////////////////

const render = () => {
  console.log(store.getState())
  
  ReactDOM.render(
    <TodoApp todos={store.getState().todos}/>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)

