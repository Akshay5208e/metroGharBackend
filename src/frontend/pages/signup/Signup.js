// temp file
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { signUpUserStart } from '../../../backend/redux/User/user.actions';
import "../login/Login.css"
import Logo from "../../../assets/images/logo.png";


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
    <img src={Logo} className="logo mb-0" />
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
      
      <form onSubmit={handleFormSubmit} className="d-flex flex-column align-items-center mt-0 mt-md-3">
        <div className="d-flex flex-column mb-2">
          <label className="inputLabel">Name</label>
          <input
          type="text"
          name="displayName"
          value={displayName}
          className="inputBox"
          onChange={e => setDisplayName(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column mb-2">
          <label className="inputLabel">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className="inputBox"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column mb-2">
          <label className="inputLabel">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="inputBox"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column mb-2">
          <label className="inputLabel">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            className="inputBox"
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-around my-4 my-md-3">
          <button type="submit" className="submitButton mx-3">
            Register
          </button>
          <Link to="/login" className="registerButton mx-3" >
              Login
          </Link>     
        </div> 
      </form>
    </div>
  
  )
}

export default Signup;

