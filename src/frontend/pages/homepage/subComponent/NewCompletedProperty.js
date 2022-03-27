import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../../../backend/redux/products/products.actions';
import PropTable from '../../../independentComponents/PropTable';
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

const fileterdProperties = allProperties.filter(result=>{return result.postedBy ===currentUser.displayName})


  return (
   <PropTable data={fileterdProperties}/>
  )
}
export default CompletedProperty