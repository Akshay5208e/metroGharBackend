import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { signOutUserStart } from '../../backend/redux/User/user.actions';
import PropertyDrafts from './subcomponent/AdminDrafts';
import PropertyApproval from './subcomponent/PropertyApproval';
import UserInfo from './subcomponent/UserInfo';

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

function AdminHomepage() {

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
          <button onClick={()=>setActive('first')}>PropertyApproval</button>
          <button onClick={()=>setActive('second')}>UserInfo</button>
          <button onClick={()=>setActive('third')}>Drafts</button>
        
        
        </div>

        <div>
          {active=='first' && <PropertyApproval/> }
          {active=='second' && <UserInfo/> }
          {active=='third' && <PropertyDrafts/> }
          
        </div>
        
      </div>
  )
}

export default AdminHomepage;