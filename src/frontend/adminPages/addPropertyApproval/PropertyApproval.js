import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../../backend/redux/products/products.actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { signOutUserStart } from '../../../backend/redux/User/user.actions';
import Navbar from '../../independentComponents/Navbar';
import Sidebar from '../../independentComponents/Sidebar';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const AddPropButton = styled( Button )({
  border: "2px solid #E5E5E5",
  borderRadius: "5px",
  color: "#000",
  textTransform: "capitalize",
  fontSize: "14px",
  lineHeight: "16px"
})

const StyledButton = styled(Button)({
  height: "20px",
  minWidth: "36px",
  background: "#C4C4C4",
  fontSize: "12px",
  lineHeight: "14px",
  borderRadius: "5px",
  padding: "6px 6px",
  margin: "2px 3px",
  color: "#000",
  textTransform: "capitalize",
})


const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: "400",
    padding: "5px 10px"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "18px",
    lineHeight: "24px",
    fontWeight: "300",
    height: "40px",
    padding: "2px 10px"
  }
})

const StyledBadge = styled(Badge)({
  height: "30px",
  minWidth: "36px",
  fontSize: "16px",
  lineHeight: "20px",
  borderRadius: "5px",
  padding: "6px 6px",
  margin: "2px 8px",
  color: "#000",
  textTransform: "capitalize",

})

const StyledTableRow = styled(TableRow)({
  maxHeight: "40px",
  minHeight: "40px",
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
});



const productsMapState = ({ productsData }) => ({
  products: productsData.products
});

const mapState = (state) => ({
  currentUser: state.user.currentUser
});



function PropertyApproval() {

  const { products } = useSelector(productsMapState);
  const dispatch = useDispatch();
  const history  = useHistory();
  const { currentUser } = useSelector(mapState);
  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );
  }, []);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

    const ViewProperty=()=>{}
    const EditProperty = ()=>{}
    const ApproveProperty=()=>{}
    const UnApprovePropperty=()=>{}

    const datas = [
      {documentID: "#0111",propertyName: "Presten Avenur, Banglore",position: "Ready To Move",type: "Flat",ownerName: "Builder",status: "published"},
      {documentID: "#0112",propertyName: "Presten Avenur, Banglore",position: "Ready To Move",type: "Flat",ownerName: "Builder",status: "published"},
      {documentID: "#0113",propertyName: "Presten Avenur, Banglore",position: "Ready To Move",type: "Flat",ownerName: "Builder",status: "pending"},
      {documentID: "#0114",propertyName: "Presten Avenur, Banglore",position: "Ready To Move",type: "Flat",ownerName: "Builder",status: "published"},
      {documentID: "#0115",propertyName: "Presten Avenur, Banglore",position: "Ready To Move",type: "Flat",ownerName: "Builder",status: "draft"},
    ]

    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
    <Navbar />
    <div className='d-flex'>
      <div>
        <Sidebar />
      </div>
      <div className='p-4'>
        <div style={{
          boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          padding: "10px 20px",
          width: "80vw",
          border: "1px solid #E5E5E5",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-between",   
          alignItems: "center"       
          }}>
          <div>All(15) | BDA/Sales(5) | Builder(12) | Agent(3) | User(10)</div>
          <AddPropButton size="medium" variant="outlined" href="/addProperty" endIcon={<AddCircleOutlineIcon />}>Add Property</AddPropButton>
        </div>
        <div className='my-5' style={{border: "2px solid #E5E5E5",borderRadius: "5px"}}>
          <Box sx={{padding: "48px 15vw",borderBottom: "2px solid #E5E5E5"}}>
            <input type="text" placeholder='Search...' className='mx-1' style={{width: "180px" , height: "45px" , border: "1px solid #E5E5E5", borderRadius: "4px"}} />
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                sx={{height: "45px"}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                sx={{height: "45px"}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                sx={{height: "45px"}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label">Owner</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                sx={{height: "45px"}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Id</StyledTableCell>
                    <StyledTableCell align="center">Property Name</StyledTableCell>
                    <StyledTableCell align="center">Position</StyledTableCell>
                    <StyledTableCell align="center">Type</StyledTableCell>
                    <StyledTableCell align="center">Owner</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(Array.isArray(datas) && datas.length > 0) && datas.map((product, index) => {
                    const{
                      documentID,
                      propertyApproval,
                      isSubmitted,
                      propertyName,
                      position,
                      type,
                      status,
                      ownerName
                      }=product
                    return(
                    <StyledTableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row" align="left">{documentID}
                      </StyledTableCell>
                      <StyledTableCell align="center">{propertyName}</StyledTableCell>
                      <StyledTableCell align="center">{position}</StyledTableCell>
                      <StyledTableCell align="center">{type}</StyledTableCell>
                      <StyledTableCell align="center">{ownerName}</StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledBadge sx={status==="published" ? {background: "#4BB543"} : status==="pending" ? {background: "#FFFF00"} : {background: "#87CEEB"}}>{status}</StyledBadge>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledButton href={`/adminView/${documentID}`} >View</StyledButton>
                        <StyledButton>Edit</StyledButton>
                        <StyledButton>Approve</StyledButton>
                        <StyledButton onClick={() => dispatch(deleteProductStart(documentID))}>Delete</StyledButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  )})}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <table className='d-none'>
            <th>Property Name</th>
            <th>Position</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Actions</th>
          <tbody>
          {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                    const{
                      documentID,
                      tempId,
                      postedBy,
                      propertyApproval,
                      isSubmitted,
                
                      //basic info
                      propertyName,
                      location,
                      position,
                      space,
                      type,
                      price,
                      mainImageUrls,
                
                      //about section
                      aboutProject,
                      size,
                      aboutPrice,
                      towerUnit,
                      configuration,
                      reraId,
                      status,
                      specification,
                
                      propertiesPricingList,
                      locationList,
                
                      // amenities
                
                      basicAmenities,
                      convenienceAmenities,
                      environmentAmenities,
                      securityAmenities,
                      sportsAmenities,
                      
                      // owners section
                      bcpCategory,
                      organisatioName,
                      ownerName,
                      ownerEmail,
                      ownerWebsite,
                      ownerContactNo,
                      ownerAddress,
                      ownerProject,
                      ownerEstablishment,
                      sinceOperation,
                      ownerPropertyList,
                      ownerBio,
                      }=product

                      return (
                        <>
                        { (isSubmitted===true)?
                        <>
                        <tr key={index}>
                        <td>
                        {propertyName}
                        </td>
                        <td>
                          {position}
                        </td>
                        <td>
                          {type}
                        </td>
                        <td>
                        {ownerName}
                        </td>
                        <td>
                          {(propertyApproval===true)?<div>Published</div>:<div>Pending</div>}
                        </td>
                        
                        <td>
                         <Link to= {`/adminView/${documentID}`}><input type='button' value='View'/></Link>
                          
                          
                          <button >
                            Edit
                          </button>
                          <button onClick={() => dispatch(deleteProductStart(documentID))}>
                            Delete
                          </button>
                        </td>
                      </tr></>
                      :
                      <div>No Properties Are Approved</div>}
                      </>
                      )
                    })}
            </tbody>
          </table>
      </div>
    </div>
    
    
    </>
  )
}

export default PropertyApproval