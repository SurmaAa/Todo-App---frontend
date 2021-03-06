import { FETCH_TODOS_SUCCEEDED, FETCH_TODOS_FAILED, MARK_TODO_AS_COMPLETED_SUCCEEDED, REMOVE_ITEM_SUCCEEDED, SET_NEW_TODO_TITLE_SUCCEEDED, ADD_TODO_SUCCEEDED } from '../actions/actions';

//if more reduders should export
const initialState = {
  todosList: null,
  callApiFailed: false,
  todosLoading: true,
  canAddTodo: false,
  newTodoTitle: '',
  newId: 10
};
  
export default function todosReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_TODOS_SUCCEEDED:
        return {
          ...state,
          callApiFailed: false,
          todosList: action.data,
          todosLoading: false,
          canAddTodo: action.data.length < 10 
        }
      case FETCH_TODOS_FAILED:
        return {
          ...state,
          callApiFailed: true,
          todosList: action.data,
          todosLoading: false,
          canAddTodo: false
        }
      case MARK_TODO_AS_COMPLETED_SUCCEEDED:
          return {
            ...state,
            todosList: state.todosList.map(todo => {
              if (todo.id !== action.id) {
                return todo;
              }
              return {
                ...todo,
                completed: !todo.completed,
              };
            })
          }
        case REMOVE_ITEM_SUCCEEDED:
          return {
            ...state,
            todosList: state.todosList.filter(todo => todo.id !== action.id),
            canAddTodo: true 
          }
        case SET_NEW_TODO_TITLE_SUCCEEDED:
          return {
            ...state,
            newTodoTitle: action.title
          }
        case ADD_TODO_SUCCEEDED:
          return {
            ...state,
            todosList: [
              ...state.todosList,
              {
                userId: 1,
                id: state.newId + 1,
                title: state.newTodoTitle,
                completed: false
              }
            ],
            newId: state.newId + 1,
            canAddTodo: state.todosList.length + 1 < 10 
          }
      default: 
        return state;
    }
};

