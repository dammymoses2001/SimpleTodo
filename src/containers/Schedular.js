import React, { useState, useContext } from 'react';
import { SchedularContext } from '../context/context';
//arry for catrgories
const categories = [
  'Select Category',
  'Education',
  'Reglion',
  'Work',
  'Others',
];

export default function Schedular(props) {
  //Function to link contextApi
  const context = useContext(SchedularContext);
  //destructing of context
  // const { todonext } = props.location.state;

  const { handleAddTodos, TodosLength, handleEditTodo } = context;
  const [todoDetails, setTodoDetails] = useState(
    props.location.state
      ? props.location.state
      : {
          todo: '',
          categories: '',
          completed: false,
          date: '',
          time: '',
        }
  );

  //handle Change in State
  const handleChange = (event) => {
    setTodoDetails({ ...todoDetails, [event.target.name]: event.target.value });
  };
  //handle submit to contextApi
  const handleSubmit = (e) => {
    e.preventDefault();
    //check if todos and categories is empty
    if (todoDetails.todo && todoDetails.categories !== '') {
      handleAddTodos(todoDetails);
      setTodoDetails({
        todo: '',
        categories: '',
        completed: false,
        date: '',
        time: '',
      });
      //if (Todos.length++) {
      props.history.push('/todos');
      //}
      // check if the date is not now forward
      // if (
      //   todoDetails.date !== ''
      //     ? new Date(currentDate()) <= new Date(todoDetails.date)
      //     : null
      // ) {

      // } else {
      //   console.log('get the right date jare');
      // }
    } else {
      //Add something here
    }
  };
  //handle Edit
  const handleEdit = (todo) => {
    handleEditTodo(todo);
    props.history.push('/todos');
  };

  // console.log(todoDetails);
  return (
    <div className='AddTodo'>
      <h2>Add New Todos</h2>
      <br />
      <form>
        {/* Todos */}
        <label>
          Todo:<span className='needed'>*</span>
        </label>
        <br />
        <textarea
          name='todo'
          rows='10'
          cols='10'
          onChange={handleChange}
          value={todoDetails.todo}
        />

        <br />
        {/* Categories */}
        <label>
          Categories:<span className='needed'>*</span>
        </label>
        <br />
        <select name='categories' onChange={handleChange}>
          {categories.map((category, index) => (
            <option
              key={index}
              value={todoDetails.categories ? todoDetails.categories : category}
            >
              {todoDetails.categories ? todoDetails.categories : category}
            </option>
          ))}
        </select>
        {/* Date */}
        <br />
        <label>Date:</label>
        <br />
        <input
          type='date'
          name='date'
          onChange={handleChange}
          placeholder='Select your date'
          value={todoDetails.date}
        />
        <br />
        {/* Time */}
        <label>Time:</label>
        <br />
        <input
          type='time'
          name='time'
          onChange={handleChange}
          placeholder='Select your Time'
          value={todoDetails.time}
        />
        <br />
        <div className='select'>
          {props.location.state ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleEdit(todoDetails);
              }}
            >
              Edit #{props.location.state.todo.substring(0, 5) + '...'}
            </button>
          ) : (
            <button onClick={handleSubmit}> Add #{TodosLength}</button>
          )}
          <button onClick={(e) => props.history.push('/todos')}> Back</button>
        </div>
      </form>
    </div>
  );
}
