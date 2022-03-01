
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './backend/redux/User/user.actions';


//hoc
import WithAuth from './backend/hoc/withAuth';

//pages
import Signup from './frontend/pages/signup/Signup';
import Login from './frontend/pages/login/Login';
import Homepage from './frontend/pages/homepage/Homepage';
import AddProperty from './frontend/pages/addProperty/AddProperty';
import AddingAmenities from './frontend/pages/addingAmenities/AddingAmenities';



//admin Pages


const mapState = (state) => ({
  currentUser: state.user.currentUser
});


function App() {

  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    dispatch(checkUserSession());

  }, []);

  return (
      <div className='App'>
        <Switch>

           {/*--------------------- Homepage ------------------------------------------*/}
              <Route exact path = "/" component={Homepage}/>

           {/*---------------------- Authentication pages -----------------------------*/}
              <Route exact path = "/login" component={Login}/> 
              <Route exact path = "/signup" component={Signup}/>

            {/*--------------------- Pages for Data Manipulation ----------------------*/}
              <Route exact path = "/addProperty" component={AddProperty}/>
              <Route exact path = "/addAmenities" component={AddingAmenities}/>

             
        </Switch>
      </div>

  )
}

export default App;
