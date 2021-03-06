import React,{ PropTypes } from 'react';
import { connect } from 'react-redux';
import TodoItem from './todoItem.js';
import { toggleTodo, removeTodo } from '../actions.js';
import { FilterTypes }  from '../../constants.js';

const TodoList = ({ todos, onToggleTodo, onRemoveTodo }) => {
	console.log(todos);
  return (
      <ul className='todo-list'>
      {
        todos.map((item) =>(
        	 <TodoItem
            key = { item.id }
            text = { item.text }
            completed = { item.completed }
            onToggle = {() => onToggleTodo(item.id)}
            onRemove = {() => onRemoveTodo(item.id)}
        	 />
         ))

      }
      </ul>
	);
};

TodoList.propTypes = {
	todos: PropTypes.array.isRequired
}

const selectVisibleTodos = (todos, filter) => {
	// console.log('selectVisibleTodos', todos, filter)
  switch (filter) {
    case FilterTypes.ALL:
      return todos;
    case FilterTypes.COMPLETED:
      return todos.filter(item => item.completed);
    case FilterTypes.UNCOMPLETED:
      return todos.filter(item => !item.completed);
    default:
      throw new Error('unsupported filter');
  }
}

const mapStateToProps = (state) => {
	return {
       todos: selectVisibleTodos(state.todos, state.filter)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleTodo: (id) => {
		   dispatch(toggleTodo(id));
		},
		onRemoveTodo: (id) => {
			dispatch(removeTodo(id));
		}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);
