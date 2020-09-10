import React, { Component, createContext } from 'react';
import axios from 'axios';
import Todos from '../containers/Todos';
const SchedularContext = createContext();

//function to get current Date
function currentDate() {
  //Get Today Data
  let Day = new Date().getDate();
  let Month = new Date().getMonth() + 1;
  let Year = new Date().getFullYear();
  Day = Day < 10 ? `0${Day}` : Day;
  Month = Month < 10 ? `0${Month}` : Month;
  const currentDate = `${Year}-${Month}-${Day}`;
  return currentDate;
}
class ContextProvider extends Component {
  state = {
    user: [],
    Todos: [],
    sortedTodos: [],
    filter: 'All',
    mod: false,
    loading: false,
  };

  //This function handle the setting of user state
  handleLoginUser = (userdetails) => {
    // console.log(userdetails);

    this.setState({
      loading: true,
      user: userdetails,
      mod: !this.state.mod,
    });
  };

  static getDerivedStateFromProps(props, state) {
    //making state to time
    const time = state.filter;

    let sortTodo = [...state.Todos];
    if (time === 'All') {
      sortTodo = [...state.Todos];
    }

    if (time === "Today's Task") {
      sortTodo = sortTodo.filter((todo) => todo.date === currentDate());
    }
    if (time === 'Completed') {
      sortTodo = sortTodo.filter((todo) => todo.completed === true);
    }
    if (time === 'UnComplete') {
      sortTodo = sortTodo.filter((todo) => todo.completed === false);
    }
    return {
      sortedTodos: sortTodo,
    };
  }
  // Show User's todo/Shedular
  componentDidUpdate(prevProp, prevState) {
    // console.log('componentDidUpdate', prevProp, prevState);

    //
    if (prevState.mod !== this.state.mod) {
      const getTodos = async () => {
        try {
          const resp = await axios({
            method: 'POST',
            // headers:a,
            url: 'http://localhost:3000/schedular',
            data: {
              email: this.state.user.email,
            },
          });
          //   console.log(resp.data[0].email, this.user);
          this.setState({
            Todos: resp.data,
            sortedTodos: resp.data,
            loading: false,
          });
        } catch (error) {
          console.log(error);
        }
      };
      getTodos();
    }
  }
  //handle Complete toogle
  handleComplete = (todo) => {
    const { id, completed } = todo;

    // console.log(id, completed);
    fetch('http://localhost:3000/editTodosComplete', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        completed: !completed,
      }),
    })
      .then((data) => data.json())
      .then((Todo) => {
        this.setState({
          mod: !this.state.mod,
        });
      })
      .catch((err) => console.log('err'));
  };

  //handle Delete
  handleDeleteTodo = (id) => {
    // console.log(todo);
    const deleteTodos = async () => {
      try {
        const resp = await axios({
          method: 'DELETE',
          url: 'http://localhost:3000/schedular/deleteTodos',
          data: {
            id,
          },
        });
        //   console.log(resp.data[0].email, this.user);
        if (resp.data) {
          this.setState({
            mod: !this.state.mod,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    deleteTodos();
  };

  //handle Add todos
  handleAddTodos = (todoDetails) => {
    const { categories, todo, time, date, completed } = todoDetails;
    console.log(categories, todo, time, date, completed);
    const addTodos = async () => {
      try {
        const resp = await axios({
          method: 'POST',
          url: 'http://localhost:3000/schedular/addTodos',
          data: {
            categories,
            email: this.state.user.email,
            todo,
            time,
            date,
            completed,
          },
        });

        if (resp.data) {
        }
        //Add something here///
        this.setState({
          mod: !this.state.mod,
        });
      } catch (error) {
        console.log(error);
      }
    };
    addTodos();
  };
  //handle Filter
  handleFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  //handle Edit
  handleEditTodo = (todoDetails) => {
    // console.log(todoDetails);
    const { id, categories, todo, date, time, completed } = todoDetails;
    console.log(id, categories, todo, time, date, completed);
    const editTodos = async () => {
      try {
        const resp = await axios({
          method: 'PUT',
          url: 'http://localhost:3000/schedular/editTodos',
          data: {
            id,
            categories,
            todo,
            date,
            time,
            completed,
          },
        });
        console.log(resp.data);
        //Add something here///
        this.setState({
          mod: !this.state.mod,
        });
      } catch (error) {
        console.log(error);
      }
    };
    editTodos();
  };
  //Handle Log Out
  handleLogoutUser = (e) => {
    this.setState({
      user: [],
      Todos: [],
      sortedTodos: [],
      filter: 'All',
      mod: false,
    });
  };
  render() {
    // console.log(this.state);
    const {
      handleLoginUser,
      handleComplete,
      handleDeleteTodo,
      handleAddTodos,
      handleFilter,
      handleEditTodo,
      handleLogoutUser,
    } = this;
    const { sortedTodos, loading } = this.state;
    return (
      <SchedularContext.Provider
        value={{
          handleLoginUser,
          Todos: sortedTodos,
          loading,
          TodosLength: Todos.length,
          handleComplete,
          handleDeleteTodo,
          handleAddTodos,
          currentDate,
          handleFilter,
          handleEditTodo,
          handleLogoutUser,
        }}
      >
        {this.props.children}
      </SchedularContext.Provider>
    );
  }
}
const SchedularConsumer = SchedularContext.Consumer;

export { SchedularContext, ContextProvider, SchedularConsumer };
