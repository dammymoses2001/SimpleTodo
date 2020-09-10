import React, { useState, useContext } from 'react';
import { SchedularContext } from '../context/context';
import Loading from '../components/Loading';
import Auth from '../components/Auth';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Login(props) {
  //using useContext to access ContextApi
  const context = useContext(SchedularContext);
  //Destructing of functions
  const { handleLoginUser } = context;

  const [loadinguser, setLoadinguser] = useState(false);

  //handle error state
  const [error, setError] = useState('');
  //hooks for user details
  const [login, setLogin] = useState({ email: '', password: '' });

  //delete later
  //const [isloggedIn,setIsLoggedIn] = useState({is})
  //function to add name and password to hooks
  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (login.email && login.password !== '') {
      setLoadinguser(true);
      const { email, password } = login;
      const loginUserIn = async () => {
        try {
          const resp = await axios({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: {
              email,
              password,
            },
          });
          // let todo = resp.data;
          //Add something here///
          if (resp.data && resp.data.email) {
            setLoadinguser(false);
            handleLoginUser(resp.data);
            Auth.login(() => props.history.push('/todos'));
            // console.log(props);
          } else {
            setLoadinguser(false);
            handleError('OOops something went wrong');
          }
        } catch (error) {
          setLoadinguser(false);
          handleError('wrong password or username');
        }
      };
      loginUserIn();
    } else {
      //add alter to inform user to add both username and password
      handleError('All field are mandatory');
    }
  };
  //handle Error
  const handleError = (message) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 1000);
  };
  // console.log(login);
  return (
    <div className='login'>
      <h2>Login Here</h2>
      <form className='w-75'>
        <div className='form-group'>
          <label>Username:</label>
          <br />
          <input
            type='text'
            name='email'
            className='form-control'
            placeholder='Enter Your Username'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <br />
          <input
            type='password'
            name='password'
            className='form-control'
            placeholder='Enter Your Password'
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit} className='btn btn-dark btn-md w-50'>Login</button>
        <div className='text-center'>
          {loadinguser ? <Loading /> : null}
        </div>


        <p className={error ? 'alter alter-danger text-center' : null}>{error}</p>
        <br />
        <div className='text-center'>
          <Link to='/register' >
            You'dont have an <span className='account text-center'>account</span>?
        </Link>
        </div>
      </form>
    </div>
  );
}
