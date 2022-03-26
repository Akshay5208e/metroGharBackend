import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { width } from "@mui/system";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { firestore, getCurrentUser } from "../../backend/firebase/utils";
import { useSelector } from "react-redux";


const StyledButton = styled(Button)({
  height: "10px",
  minWidth: "17px",
  background: "#C4C4C4",
  fontSize: "6px",
  lineHeight: "8px",
  borderRadius: "1px",
  padding: "2px 4px",
  margin: "1px 2px",
  color: "#000",
  textTransform: "capitalize",
})


const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    fontSize: "8px",
    lineHeight: "9px",
    fontWeight: "700",
    padding: "5px 10px"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "7px",
    lineHeight: "8px",
    height: "20px",
    padding: "2px 10px"
  }
})

const StyledTableRow = styled(TableRow)({
  maxHeight: "20px",
  minHeight: "20px",
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
});


const getDataFromLocalStorage = ()=>{
    const data = localStorage.getItem('draftProperties');
    if(data){
      return JSON.parse(data);
    }
    else{
      return([])
    }
  }

  const mapState = (state) => ({
    currentUser: state.user.currentUser
  });
  

const PropTable = ({data}) => {

    const history= useHistory();
    const {currentUser} = useSelector(mapState)

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];

      const [draftProperties, setDraftProperties] = useState(getDataFromLocalStorage());
      
      const DeleteDraftProperty=(tempId)=>{
        const filteredDraftsProperties=draftProperties.filter((element,index)=>{
          return element.tempId !== tempId
        })
        setDraftProperties(filteredDraftsProperties);
      }
    
      useEffect(()=>{
    
        localStorage.setItem('draftProperties',JSON.stringify(draftProperties));
    
      },[draftProperties])
      
      // const filteredDraftsProperties = draftProperties.filter(result=>{return result.postedBy=== currentUser.displayName})

    return(
        <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 768 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Sr. No.</StyledTableCell>
              <StyledTableCell align="left">Property</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {draftProperties && draftProperties.length>0 && draftProperties.map((val,i) => (
              <StyledTableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row" align="left">
                  {i+1}
                </StyledTableCell>
                <StyledTableCell align="left">{val.propertyName}</StyledTableCell>
                <StyledTableCell align="center">{val.type}</StyledTableCell>
                <StyledTableCell align="center">Draft</StyledTableCell>
                <StyledTableCell align="center">
                  <StyledButton onClick = {()=>history.push(`/view/${val.tempId}`)}>View</StyledButton>
                  <StyledButton onClick = {()=>history.push(`/draftEdit/${val.tempId}`)}>Edit</StyledButton>
                  <StyledButton onClick={()=>DeleteDraftProperty(val.tempId)}>Delete</StyledButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {draftProperties && draftProperties.length<=0 && 
            <div>No Drafts Pending</div>}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default PropTable;