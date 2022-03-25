import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { signOutUserStart } from '../../../backend/redux/User/user.actions';
import CompletedProperty from './subComponent/NewCompletedProperty';
import PendingProperty from './subComponent/NewPendingProperty';
import PropertyDrafts from './subComponent/PropertyDrafts';
const mapState = (state) => ({
  currentUser: state.user.currentUser
});

function Homepage() {

  const [active, setActive] = useState('first')
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const history  = useHistory();
 
  

  useEffect(() => {
    if (!currentUser) {
      
      history.push('/login');
    }

  }, [currentUser]);


  useEffect(() => {
    if (currentUser.userRoles.includes('admin')) {
      
      history.push('/admin');
    }

  }, [currentUser]);




  

  
  const signOut = () => {
    dispatch(signOutUserStart());
  };


  return (
      <div>
          Homepage
        {currentUser&&
        <button onClick={() => signOut()}>Signout</button>}

        {currentUser?<>{currentUser.displayName}</>:<></>}  

        <Link to = '/addProperty'>  <div>Add Property</div></Link>
      
        <div>
          <button onClick={()=>setActive('first')}>Completed</button>
          <button onClick={()=>setActive('second')}>Drafts</button>
          
        </div>

        <div>
          {active=='first' && <CompletedProperty/> }
          {active=='second' && <PropertyDrafts/>}
          
        </div>
        
      </div>
  )
}

export default Homepage;