
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './backend/redux/User/user.actions';


//hoc
import WithAuth from './backend/hoc/withAuth';
import WithAdminAuth from './backend/hoc/withAdminAuth';

//pages
import Signup from './frontend/pages/signup/Signup';
import Login from './frontend/pages/login/Login';
import Homepage from './frontend/pages/homepage/Homepage';
import AddProperty from './frontend/pages/addProperty/AddProperty';
import AddingAmenities from './frontend/pages/addingAmenities/AddingAmenities';
import ViewPage from './frontend/pages/viewPage/ViewPage';
import AdminViewPage from './frontend/pages/viewPage/AdminViewPage';
import EditPage from './frontend/pages/editPage/EditPage';
import AdminEditPage from './frontend/pages/editPage/AdminEditPage';

import PropertyApproval from './frontend/adminPages/addPropertyApproval/PropertyApproval';



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
              {/* <Route exact path = "/" component={Homepage}/> */}
              {/* <WithAdminAuth><Route exact path="/admin" component={PropertyApproval}/></WithAdminAuth> */}
              <Route exact path="/admin" render={()=>(
                <WithAdminAuth>
                  <PropertyApproval/>
                </WithAdminAuth>
              )}>

              </Route>
              <Route exact path="/" render={()=>(
                <WithAuth>
                  <Homepage/>
                </WithAuth>
              )}>

              </Route>

           {/*---------------------- Authentication pages -----------------------------*/}
              {/* <Route exact path = "/login" component={Login}/>  */}
              <Route path="/login"render={() => (
         
              <Login />
          
          )} />
          
              <Route path="/signup"
                render={() => (
           
              <Signup/>
         
          )} />

            {/*--------------------- Pages for Data Manipulation ----------------------*/}
              <Route exact path = "/addProperty" component={AddProperty}/>

              <Route exact path = "/addAmenities" component={AddingAmenities}/>

              {/* ----------------------Viewing the page----------------------------------- */}
              <Route exact path= "/view/:productID" component={ViewPage}/>
             

              <Route exact path="/adminView/:productID" render={()=>(
                 <WithAdminAuth>
                   <AdminViewPage/>
                 </WithAdminAuth>
               )}/>
              {/* --------------------------editingPage-------------------------------------- */}
              <Route exact path="/edit/" component={EditPage}/>
              
               <Route exact path ="/editAdmin/" render={()=>(
                 <WithAdminAuth>
                   <AdminEditPage/>
                 </WithAdminAuth>
               )}/>


              

             
        </Switch>
      </div>

  )
}

export default App;
