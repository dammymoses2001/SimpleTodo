import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Index from './containers/Index';
import Login from './containers/Login';
import Register from './containers/Register';
import Schedular from './containers/Schedular';
import Todos from './containers/Todos';
import EditTodo from './containers/EditTodo';
import Protected from './components/Protected';
import Error from './containers/Error';
import Help from './containers/Help';
function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Index} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Protected exact path='/todos' component={Todos} />
        <Protected exact path='/schedular' component={Schedular} />
        <Protected exact path='/schedular/editTodo' component={EditTodo} />
        <Route exact path='/schedular/help' component={Help} />
        <Route exact component={Error} />
      </Switch>
    </>
  );
}

export default App;
