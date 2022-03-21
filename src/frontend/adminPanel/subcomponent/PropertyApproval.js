import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { firestore } from '../../../backend/firebase/utils';
import {LocationOptions,OwnerOptions,typeOptions,PositionOptions} from './filterOptions'

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
      <div>
        for filters
        <input type ='text' value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>

        <div>
          type
            <select onChange={e=>setType(e.target.value)}>
            {typeOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
          </div>
          <div>
            position
            <select onChange={e=>setPosition(e.target.value)}>
            {PositionOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
          </div>
          <div>
            location
            <select onChange={e=>setLocation(e.target.value)}>
            {LocationOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
          </div>
        <div>
          bcpCategory
            <select onChange={e=>setBcpCategory(e.target.value)}>
            {OwnerOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
          </div>

      </div>
      <div>
          {console.log(allProperties)}
      {(filteredProperties.length>0) ? 
   <>
   <table>
   <tbody>

  
     {filteredProperties.map((property,index)=>{
      
    
      return(
        <>
        
        {  
        
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
              {property.propertyApproval===false ? <button onClick={()=>handleApprove(property.id)}>Approve</button> : <button  onClick={()=>handleUnApprove(property.id)}> UnApprove </button>}
             
            </td>
          </tr>
      </>
     
        }</>
      
      )
     })}
       </tbody>
   </table>
   </>
   :
   <div>No Properties found     </div>}

        
      </div>
    </>
  )
}

export default PropertyApproval