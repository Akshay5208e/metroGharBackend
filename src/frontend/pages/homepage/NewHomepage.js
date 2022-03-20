import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { signOutUserStart } from '../../../backend/redux/User/user.actions';
import Navbar from '../../independentComponents/Navbar';
import Sidebar from '../../independentComponents/Sidebar';
import CompletedProperty from './subComponent/CompletedProperty';
import PendingProperty from './subComponent/NewPendingProperty';
import PropertyDrafts from './subComponent/PropertyDrafts';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

const AddPropButton = styled( Button )({
  border: "2px solid #E5E5E5",
  borderRadius: "5px",
  color: "#000",
  textTransform: "capitalize",
  fontSize: "10px",
  lineHeight: "12px"
})

const StyledTabList = styled(TabList)({
  minHeight: "20px",
  '&.Mui-selected': {
    borderBottom: "none"
  }

})

const StyledTab = styled( Tab )({
  background: '#E5E5E5',
  margin: "0 5px",
  borderRadius: "5px",
  minHeight: "20px",
  fontSize: "8px",
  textTransform: "capitalize",
  padding: "4px",
  '&.Mui-selected': {
    background: "#FFF",
    border: "1px solid #E5E5E5",
    color: "#000"
  }
})

function Homepage() {
 const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
          <Navbar />
          <div className="d-flex flex-column pt-3 ">
              <div className="d-flex justify-content-end px-3 mb-3">
                <AddPropButton size="small" variant="outlined" href="/addProperty" endIcon={<AddCircleOutlineIcon />}>Add Property</AddPropButton>
              </div>              
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider',paddingBottom: "5px" }}>
                    <StyledTabList indicatorColor={""} onChange={handleChange} aria-label="lab API tabs example">
                      <StyledTab label="Completed Property" value="1" />
                      <StyledTab label="Pending Property" value="2" />
                      <StyledTab label="Property Drafts" value="3" />
                    </StyledTabList>
                  </Box>
                  <TabPanel value="1" sx={{padding: "5vw"}}><CompletedProperty /></TabPanel>
                  <TabPanel value="2" sx={{padding: "5vw"}}><PendingProperty /></TabPanel>
                  <TabPanel value="3" sx={{padding: "5vw"}}><PropertyDrafts /></TabPanel>
                </TabContext>
              </Box>
          </div>      

        
      </div>
  )
}

export default Homepage;