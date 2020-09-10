import React, { useContext } from 'react';
import { SchedularContext } from '../context/context';
import { withRouter } from 'react-router-dom';
import Loading from '../components/Loading';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

function List({ history }) {
  const context = useContext(SchedularContext);
  const {
    Todos,
    handleComplete,
    handleDeleteTodo,
    handleEditTodo,
    loading,
  } = context;
  // console.log(Todos);
  const handleToggle = (todo) => {
    handleComplete(todo);
  };

  //handle Navigation to Edit
  const handleNavigation = (todo) => {
    history.push({
      pathname: '/schedular/editTodo',
      state: todo,
    });
  };
  //handle Edit
  const handleEdit = (todo) => {
    handleEditTodo(todo);
    history.push({
      pathname: '/schedular',
      state: todo,
    });
  };
  //handle Delete
  const handleDelete = (todo) => {
    handleDeleteTodo(todo);
  };

  if (loading) {
    return (
      <>
        <Loading />;
      </>
    );
  } else {
    console.log(Todos.length, loading);
    if (Todos.length > 0) {
      return (
        <div>
          <h2>Todo List</h2>
          {Todos.map((todo) => (
            <div key={todo.id} className='list'>
              <div>
                <li
                  // key={todo.id}
                  className='todo'
                  onClick={() => handleToggle(todo)}
                  style={
                    todo.completed ? { textDecoration: 'line-through' } : null
                  }
                >
                  {todo.todo.substring(0, 20) + '...'}
                </li>

                {todo.completed ? (
                  <div>

                    <FaTrash onClick={() => handleDelete(todo.id)} className='mx-2' />
                    <FaEdit onClick={() => handleEdit(todo)} className='mx-2' />
                    <FaEye onClick={() => handleNavigation(todo)} className='mx-2' />
                  </div>
                ) : (
                    // to show show the date and it works if there is a date else no date is added will be the output
                    <div> {todo.date ? todo.date : 'no date added'}</div>
                  )}
              </div>

              <hr />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div style={{ color: 'red', background: 'white' }}>No Schedule</div>
      );
    }
  }
}
export default withRouter(List);
