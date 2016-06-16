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

/////////////////////////////////////////////////

const { Component } = React

const { connect } = ReactRedux

let nextId = 3

class AddTodo extends Component {
  render() {
    const { dispatch } = this.props
    
    return (
      <div>
        <input type='input' ref={node=>this.input=node}/>
        <button onClick={()=>{
          dispatch(addTodo(nextId++, this.input.value))
          this.input.value=''
        }}>
          Add Todo
        </button>
      </div>
    )
  }
}
AddTodo = connect()(AddTodo)


class TodoList extends Component {  
  render() {
    const { todos, visibilityFilter, dispatch } = this.props
    
    return (
      <div>
        <ul>
          {getFilterTodos(todos, visibilityFilter).map((todo)=>{
            return (
              <li key={todo.id}
                  onClick={()=>{
                    dispatch(toggleTodo(todo.id))
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
const mapTodoListState = (state) => {
  return {
    todos: state.todos,
    visibilityFilter: state.visibilityFilter
  }
}
TodoList = connect(mapTodoListState)(TodoList)

class TodoFilter extends Component {
  render() {
    return (
      <p>
        Show:
        {' '}
        <FilterLink 
          filter='SHOW_ALL' >
          All
        </FilterLink>
        {' '}
        <FilterLink 
          filter='SHOW_ACTIVE'> 
          Active
        </FilterLink>
        {' '}
        <FilterLink 
          filter='SHOW_COMPLETED'>
          Completed
        </FilterLink>
      </p>
    )
  }
}

// Container Component
// class FilterLink extends Component {
//   componentDidMount() {
//     const { store } = this.context;
//     this.unscrible = store.subscribe(()=>{
//       this.forceUpdate()
//     })
//   }
  
//   componentWillUnmount() {
//     this.unscrible()
//   }
  
//   render() {
//     const { store } = this.context
//     const { visibilityFilter } = store.getState()
//     const { filter, children } = this.props
//     const active = visibilityFilter === filter
    
//     return (
//       <Link active={active}
//             onClick={()=>store.dispatch(filterTodo(filter))}>
//         {children}
//       </Link>
//     )
//   }
// }
// FilterLink.contextTypes = {
//   store: React.PropTypes.object
// }

// Presentation Component (Dumb Componet, just display data of props)
class Link extends Component {
  
  render() {
    const { active, onClick, children } = this.props
    
    if (active) {
      return (
        <span>{children}</span>
      )
    }
    
    return (
      <a href='#'
         onClick={(e)=>{
           e.preventDefault()
           onClick()
         }}>
        {children}
      </a>
    )
  }
}
Link.propTypes = {
  filter: React.PropTypes.string,
  currentFilter: React.PropTypes.string
}

// use connect replace self implemention of ContainerComponent
const mapFilterLinkState = (state, ownProps) => {
  return {
    active: state.visibilityFilter === ownProps.filter
  }
}
const mapFilterLinkActions = (dispatch, ownProps) => {
  return {
    onClick: ()=>dispatch(filterTodo(ownProps.filter))
  }
}
const FilterLink = connect(mapFilterLinkState, mapFilterLinkActions)(Link)

/////////////////////////////////////////////////

const getFilterTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(t=>!t.completed)
    case 'SHOW_COMPLETED':
      return todos.filter(t=>t.completed)
  }
}

class TodoApp extends Component {
  
  render() {
    
    return (
      <div>

        <AddTodo />

        <TodoList />

        <TodoFilter />

      </div>
    )
  }
}

/////////////////////////////////////////////////

const { Provider } = ReactRedux

const render = () => {  
  ReactDOM.render(
    <Provider store={createStore(rootReducer)}>
      <TodoApp />
    </Provider>,
    document.getElementById('root')
  )
}

render()

