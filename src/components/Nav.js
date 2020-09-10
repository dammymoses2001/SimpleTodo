import React, { useContext } from 'react';
import { SchedularContext } from '../context/context';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../components/Auth';
function Nav({ history }) {
  const context = useContext(SchedularContext);
  const { handleLogoutUser } = context;

  //handle Both router history and logout in context api
  const handleLogout = () => {
    Auth.logout(() => history.push('/login'));
    handleLogoutUser();
  };
  return (
    <nav className='text-white bg-dark'>
      <Link to='/todos'>Todo/Home</Link>
      <ul>
        <Link to='/schedular'>
          <li>Add Todo</li>
        </Link>
        <Link to='/schedular/help'>
          <li>Help</li>
        </Link>
        <button onClick={handleLogout} className='btn btn-dark'>LogOut</button>
      </ul>
    </nav>
  );
}
export default withRouter(Nav);
