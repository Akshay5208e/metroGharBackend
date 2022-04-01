import React from "react";
import './SideBar.css'
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { signOutUserStart } from '../../backend/redux/User/user.actions';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const StyledButton = styled(Button)({
    width: "100%",
    height: "40px",
    border: "2px solid #FEAA7B",
    color: "#FEAA7B",

})

const Sidebar = () => {
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(signOutUserStart());
      };
    return(
        <div className="sidebar">
            <div className="headWrapper w-100">
                <i className="bi bi-speedometer2 " style={{fontSize: "24px"}}></i>
                <p className="mb-0 fs-5 mx-3">Dashboard</p>
            </div>
            <div className="headWrapper w-100">
                <i class="bi bi-person-plus-fill" style={{fontSize: "24px"}}></i>
                <p className="mb-0 fs-5 mx-3">Edit Profile</p>
            </div>
            <div className="headWrapper w-100">
                <i className="bi bi-house-door-fill" style={{fontSize: "24px"}}></i>
                <p className="mb-0 fs-5 mx-3">Property</p>
            </div>
            <div className="headWrapper w-100">
                <i className="bi bi-people-fill" style={{fontSize: "24px"}}></i>
                <p className="mb-0 fs-5 mx-3">User Profile</p>
            </div>
            <div className="mt-auto mb-4">
                <StyledButton onClick={()=>signOut()}>Signout</StyledButton>
            </div>
        </div>
    )
}

export default Sidebar;