import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { signOutUserStart } from '../../../backend/redux/User/user.actions';
import CompletedProperty from './subComponent/CompletedProperty';
import PendingProperty from './subComponent/PendingProperty';
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



  
  const signOut = () => {
    dispatch(signOutUserStart());
  };


  return (
      <div>
          Homepage
        {currentUser&&
        <button onClick={() => signOut()}>Signout</button>}

        {currentUser?<>{currentUser.displayName}</>:<></>}  


        <div>Add Property</div>
        <div>
          <button onClick={()=>setActive('first')}>Completed</button>
          <button onClick={()=>setActive('second')}>Pending</button>
          <button onClick={()=>setActive('third')}>Drafts</button>
        </div>

        <div>
          {active=='first' && <CompletedProperty/> }
          {active=='second' && <PendingProperty/> }
          {active=='third' && <PropertyDrafts/> }
        </div>
        
      </div>
  )
}

export default Homepage;