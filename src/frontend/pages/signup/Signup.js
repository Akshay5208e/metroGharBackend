// temp file
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { signUpUserStart } from '../../../backend/redux/User/user.actions';


const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
});


function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      reset();
      history.push('/');
    }

  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }

  }, [userErr]);

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(signUpUserStart({
      displayName,
      email,
      password,
      confirmPassword
    }));
  }

  const configAuthWrapper = {
    headline: 'Registration'
  };

  return (
   
    <div className="formWrap">

      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => {
            return (
              <li key={index}>
                {err}
              </li>
            );
          })}
        </ul>
      )}

      <form onSubmit={handleFormSubmit}>
          <h1> Register</h1>
        <input
          type="text"
          name="displayName"
          value={displayName}
          placeholder="Full name"
          onChange={e => setDisplayName(e.target.value)}
        />

        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={e => setConfirmPassword(e.target.value)}
        />

        <button type="submit">
          Register
        </button>
      </form>

      <div className="links">
        <Link to="/login">
          LogIn
        </Link>
        {` | `}
        <Link to="/recovery">
          Reset Password
          </Link>
      </div>
    </div>
  
  )
}

export default Signup;

