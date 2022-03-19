import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../../../backend/redux/products/products.actions';

import { firestore } from '../../../../backend/firebase/utils';
import productsTypes from '../../../../backend/redux/products/products.types';

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

function CompletedProperty() {

  
  const {currentUser} = useSelector(mapState)

  const dispatch = useDispatch();
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

  return (
   <>
   {(allProperties.length>0) ? 
   <>
   <table>
   <tbody>

  
     {allProperties.map((property,index)=>{
      
    
      return(
        <>
        
        {(property.postedBy===currentUser.displayName)? 
        
        <>
        {console.log(property)}
          <tr key ={index}>
            <td>{property.propertyName}</td>
            <td>{property.type}</td>
            <td>{property.propertyApproval===false ? <div>Pending</div> : <div>Approved</div>}</td>
            <td>
              
              
           
              <button onClick={()=>history.push(`/view/${property.id}`)}>View</button>
              <button onClick={()=>history.push(`/edit/${property.id}`)}>Edit</button>
              <button onClick = {()=>deleteProperty(property.id)}>Delete</button>
              {/* {property.propertyApproval===false ? <button onClick={()=>handleApprove(property.id)}>Approve</button> : <button  onClick={()=>handleUnApprove(property.id)}> UnApprove </button>} */}
             
            </td>
          </tr>
      </>
        :
        <div>No properties Are lited By you</div>
        }</>
      
      )
     })}
       </tbody>
   </table>
   </>
   :
   <div>No Properties In database</div>}
  </>
  )
}
export default CompletedProperty