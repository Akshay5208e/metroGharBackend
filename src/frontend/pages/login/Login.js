import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from '../../../backend/redux/User/user.actions';



const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

function Login() {

  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push('/');
    }

  }, [currentUser]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }


  return (
    <div className="formWrap">
    <form onSubmit={handleSubmit}>

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

      <button type="submit">
        LogIn
      </button>

      
      <div className="links">
        <Link to="/signup">
          Register
        </Link>
        {` | `}
        <Link to="/recovery">
          Reset Password
        </Link>
      </div>

    </form>
  </div>
  )
}

export default Login;
