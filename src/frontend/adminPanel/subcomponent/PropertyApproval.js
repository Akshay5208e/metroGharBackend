import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { firestore } from '../../../backend/firebase/utils';
import {LocationOptions,OwnerOptions,typeOptions,PositionOptions} from './filterOptions'
import Navbar from '../../independentComponents/Navbar'
import Sidebar from '../../independentComponents/SideBar'
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


function PropertyApproval() {

  const [searchTerm, setSearchTerm] = useState('');
  const [bcpCategory, setBcpCategory] = useState('')
 const [type, setType] = useState('')
 const [position, setPosition] = useState('')
 const [location, setLocation] = useState('')
 


 const history= useHistory();
  
 const [allProperties, setallProperties] = useState([]);
 useEffect(()=>{
   getDataformDatabase()
},[])

 async function getDataformDatabase(){
   
   try {
       const properties = await firestore.collection('properties').get();
       const propertyArray =[];
       properties.forEach((doc)=>{
       const obj ={
           id:doc.id,
           ...doc.data()
       }
       propertyArray.push(obj)
      
       
   })
   setallProperties(propertyArray);
   } catch (error) {
     console.log(error)  
   }
}

console.log("all",allProperties)

const deleteProperty=(id)=>{
firestore.collection('properties').doc(id).delete();
window.location.reload();



}

const handleApprove=(documentID)=>{

 firestore.collection('properties').doc(documentID).update({
   propertyApproval: true
 })

}
const handleUnApprove=(documentID)=>{
 firestore.collection('properties').doc(documentID).update({
   propertyApproval: false
 })

}
 

// const [filteredProperties, setfilteredProperties] = useState([])

const filteredProperties = allProperties .filter(result=>{return result.propertyName.toLowerCase().includes(searchTerm.toLowerCase())})
                                         .filter(result=>{return result.position.toLowerCase().includes(position.toLowerCase())})
                                         .filter(result=>{return result.type.toLowerCase().includes(type.toLowerCase())})
                                         .filter(result=>{return result.bcpCategory.toLowerCase().includes(bcpCategory.toLowerCase())})
                                         .filter(result=>{return result.location.toLowerCase().includes(location.toLowerCase())})
  return (
    <>
     <Navbar />
     <div className='d-flex'>
       <div> <Sidebar /></div>
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
            <input type="text" placeholder='Search...' className='mx-1' style={{width: "180px" , height: "45px" , border: "1px solid #E5E5E5", borderRadius: "4px"}}  value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={position}
                label="Age"
                onChange={e=>setPosition(e.target.value)}
                sx={{height: "45px"}}
              >
                {PositionOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <MenuItem key={index} value={value}>{name}</MenuItem>
            );
          })}
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Age"
                onChange={e=>setType(e.target.value)}
                sx={{height: "45px"}}
              >
                

                {typeOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <MenuItem key={index} value={value}>{name}</MenuItem>
            );
          })}
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={location}
                label="Age"
                onChange={e=>setLocation(e.target.value)}
                sx={{height: "45px"}}
              >
               
                {LocationOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <MenuItem key={index} value={value}>{name}</MenuItem>
            );
          })}
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label">Owner</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bcpCategory}
                label="Age"
                onChange={e=>setBcpCategory(e.target.value)}
                sx={{height: "45px"}}
              >
                
                {OwnerOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <MenuItem key={index} value={value}>{name}</MenuItem>
            );
          })}
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
                  {(filteredProperties.length > 0) && filteredProperties.map((property, index) => {
                   
                    return(
                    <StyledTableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row" align="left">{property.id}
                      </StyledTableCell>
                      <StyledTableCell align="center">{property.propertyName}</StyledTableCell>
                      <StyledTableCell align="center">{property.position}</StyledTableCell>
                      <StyledTableCell align="center">{property.type}</StyledTableCell>
                      <StyledTableCell align="center">{property.ownerName || property.organisatioName}</StyledTableCell>
                      <StyledTableCell align="center">{property.propertyApproval===false ? <div>Pending</div> : <div>Approved</div>}</StyledTableCell>
                   
                      <StyledTableCell align="center">
                        <StyledButton href={`/view/${property.id}`} >View</StyledButton>
                        <StyledButton href={`/edit/${property.id}`}>Edit</StyledButton>
                        {property.propertyApproval===false ? <StyledButton align="center" onClick={()=>handleApprove(property.id)}>Approve</StyledButton> : <StyledButton align="center" onClick={()=>handleUnApprove(property.id)}> UnApprove </StyledButton>}
                        <StyledButton onClick={()=>deleteProperty(property.id)}>Delete</StyledButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  )})}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
       </div>
       </div>
     </div>


      
   
    </>
  )
}

export default PropertyApproval