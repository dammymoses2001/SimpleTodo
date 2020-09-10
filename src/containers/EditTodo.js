import React, { useState } from 'react';
// import { SchedularContext } from '../context/context';
import EventTimer from '../components/EventTimer';

export default function Schedular(props) {
  //Function to link contextApi
  // const context = useContext(SchedularContext);
  //destructing of context
  // const { todonext } = props.location.state;

  // const { handleComplete, handleEditTodo } = context;
  // console.log(props.location);
  const [todoDetails, setTodoDetails] = useState(props.location.state);

  //handle Change in State
  const handleChange = (event) => {
    setTodoDetails({ ...todoDetails, [event.target.name]: event.target.value });
  };

  // //toggle
  // const handleToggle = (todo) => {
  //   console.log(todo);
  //   handleComplete(todo);
  // };
  // //handle Edit
  // const handleEdit = (todo) => {
  //   handleEditTodo(todo);
  //   props.history.push('/todos');
  // };

  //    console.log(todoDetails);
  return (
    <div className='AddTodo'>
      <h2>View Todos</h2>
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
          defaultValue={todoDetails.todo}
          disabled
        />

        <br />
        {/* Categories */}
        <label>
          Categories:<span className='needed'>*</span>
        </label>
        <br />
        <input
          type='text'
          name='todo'
          //   onChange={handleChange}
          placeholder='Enter Your new Todo here'
          defaultValue={todoDetails.categories}
          disabled
        />
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
          disabled
        />
        <br />
        {/* Time */}
        <label>Time:</label>
        <br />
        <input
          type='time'
          name='time'
          //   onChange={handleChange}
          placeholder='Select your Time'
          defaultValue={todoDetails.time}
          disabled
        />
        <br />
        <div className='toggle'>
          <button
            disabled
            style={
              todoDetails.completed
                ? { background: 'green', color: 'white' }
                : null
            }
          >
            Done
          </button>
          <button
            disabled
            style={
              !todoDetails.completed
                ? { background: 'red', color: 'white' }
                : null
            }
          >
            Not Done
          </button>
        </div>
        <br />
        <div>
          {/* Add Event Timer which work if only tthe todo have a less a date */}
          <span className='timer'>
            {todoDetails.date ? (
              <EventTimer
                events={`${todoDetails.date + ' ' + todoDetails.time}`}
              />
            ) : null}
          </span>
        </div>
        <div className='select'>
          {/* {props.location.state ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleEdit(todoDetails);
              }}
            >
              Edit #{Todos.length}
            </button>
          ) : (
            <button onClick={handleSubmit}> Add #{TodosLength.length}</button>
          )} */}
          <button onClick={(e) => props.history.push('/todos')}> Back</button>
        </div>
      </form>
    </div>
  );
}
