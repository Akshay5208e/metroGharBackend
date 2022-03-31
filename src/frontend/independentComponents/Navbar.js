import React from "react";
import Logo from '../../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { signOutUserStart } from '../../backend/redux/User/user.actions';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "./Navbar.css"



const Navbar = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(signOutUserStart());
        window.location.reload()
      };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    return(
        <div className="navbarContainer">
            <div className="logoWrapper">
                <img src={Logo} alt="logo" className="logoNavbar" />
            </div>
            <div className="d-md-flex d-none iconWrapper">
                <div className=""><i className="bi bi-bell-fill" style={{fontSize: "24px"}} ></i></div>
                <ExitToAppIcon className="mx-5 pointer" onClick={()=> signOut()} />
            </div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="d-block d-md-none text-dark text-capitalize"
                disableRipple="true"
            >
                {currentUser ? currentUser.displayName : ""}<KeyboardArrowDownIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}                
            >
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={()=>{
                        handleClose();
                        signOut();
                        }}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default Navbar;