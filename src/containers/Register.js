import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Register(props) {
  const [registerUser, setRegisterUser] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('')
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      registerUser.fullname &&
      registerUser.email &&
      registerUser.password !== '') {
      const { fullname, email, password } = registerUser;
      const registerNewUser = async () => {
        try {
          const resp = await axios({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data: {
              username: fullname,
              email: email,
              password: password,
            },
          });
          //Add something here alter///
          props.history.push('/login');
          console.log(resp.data);
        } catch (error) {
          setMessage(error.response.data)
          setTimeout(() => {
            setMessage('')
          }, 3000)
          console.log(error.response.data);
        }
      };
      registerNewUser();
    } else {
      //add oops something went wrong
      setMessage('All Fields are Required')
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  };
  // console.log(registerUser);
  return (
    <div className='register'>
      <h2>Register Here</h2>
      <form className='w-75'>
        <div className='form-group'>
          <label>Fullname:</label>
          <br />
          <input
            type='text'
            name='fullname'
            className='form-control'
            placeholder='Enter Username'
            onChange={handleChange}
            required={true}
          />
        </div>
        <label>Email:</label>
        <br />
        <input
          type='text'
          name='email'
          className='form-control'
          placeholder='Enter Email'
          onChange={handleChange}
          required={true}
        />

        <label>Password:</label>
        <br />
        <input
          type='password'
          name='password'
          className='form-control '
          placeholder='Enter Password'
          onChange={handleChange}
          required={true}
        />
        <br />
        <p className={message ? 'alert alert-danger' : null}>{message}</p>
        <br />
        <button onClick={handleSubmit} className='btn btn-dark btn-md'>Register</button>
        <Link to='/'>
          <button className='btn btn-light'>Home</button>
        </Link>
      </form>
    </div>
  );
}
