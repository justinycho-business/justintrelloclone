import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../../components/styles/SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorpassword, seterrorpassword] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if(password !== repeatPassword) {
      seterrorpassword(true)
      return
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signupcontainer">
      <h1 className="SignUpFormTitle">Sign Up Form</h1>
    <form className="SignUpForm" onSubmit={onSignUp}>
      <div className="formdiv">
        {errorpassword &&
        <div
        className="errormsg"
        >Passwords did not match.</div>
        }
        {errors.map((error, ind) => (
          <div
          className="errormsg"
          key={ind}>{error}</div>
        ))}
      </div>
      <div className="formdiv">
        <label>User Name: </label>
        <input
        className='forminput'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="formdiv">
        <label>Email: </label>
        <input
        className='forminput'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="formdiv">
        <label>Password: </label>
        <input
        className='forminput'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="formdiv">
        <label>Repeat Password: </label>
        <input
        className='forminput'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className='buttondiv'>
      <button className="formbutton" type='submit'>Sign Up</button>
      </div>
    </form>
    </div>
  );
};

export default SignUpForm;
