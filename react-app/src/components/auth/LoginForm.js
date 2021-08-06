import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '../styles/LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    // await setEmail('demo@aa.io')
    // await setPassword('password')
    const email = 'demo@aa.io'
    const password = 'password'

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='logindiv'>
      <h1 className="LoginFormTitle">Login Form</h1>
    <form onSubmit={onLogin} className="loginform">
      <div className="formdiv">
        {errors.map((error, ind) => (
          <div
          className="errormsg"
          key={ind}>{error}</div>
        ))}
      </div>
      <div className="formdiv">
        <label htmlFor='email'>Email: </label>
        <input
        className='forminput'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="formdiv">
        <label htmlFor='password'>Password: </label>
        <input
        className='forminput'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        </div>
        <div className="buttondiv">
        <button className="formbutton" type='submit'>Login</button>

      </div>
    </form>
    <button className="formbutton" onClick={demoLogin}>Demo Login</button>;
    </div>
  );
};

export default LoginForm;
