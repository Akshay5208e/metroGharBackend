import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from './../../../backend/redux/products/products.actions';

import { firestore } from '../../../backend/firebase/utils';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';




   
const ViewPage=({})=> {
  const dispatch = useDispatch();
  const history = useHistory();
  const { documentID } = useParams();
  
console.log(typeof(documentID))
  const [allProperties, setallProperties] = useState([]);
  const [property, setProperty] = useState([]);
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
       
        setallProperties(propertyArray)
    });
    } catch (error) {
      console.log(error)  
    }
}



   

 const propertyForeThePage=()=>{
     if(allProperties.length>0)
     {
         let newProperty = allProperties.find((elemProperty)=>{
       
        
             return elemProperty.id === documentID
         });  
         setProperty(newProperty)
     }
 }
 
 useEffect(()=>{
    propertyForeThePage()
 },[allProperties])
 
 console.log('all PPP', property) 

  return (
    <>
    <div>ViewPage</div>

    <div>---------------edit yourself -----------------</div>
    
    
    {property.propertyName}
    <br/>
    {property.location}
    {property.propertyApproval}
      
    
   
    
    </>
  )
}

export default ViewPage