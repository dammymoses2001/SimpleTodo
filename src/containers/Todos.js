import React from 'react';
import Todoinput from '../components/Todoinput';
import List from '../components/List';
import AddTodos from '../components/AddTodos';
import Header from '../components/Header';
import Nav from '../components/Nav';
export default function Todos() {
  return (
    <>
      <Nav />
      <Header />
      <Todoinput />
      <List />
      <AddTodos />
    </>
  );
}
