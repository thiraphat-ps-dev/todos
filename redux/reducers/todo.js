import Immutable from 'immutable';
import { SETTODOLIST } from '../actions';
// import { INCREMENT, DECREMENT } from '../actions';

const initialState = Immutable.fromJS({
  todolist: [],
});

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETTODOLIST: {
      return {
        ...state,
        todolist: action.data,
      };
    }

    default: {
      return state;
    }
  }
};

export default todoReducer;
