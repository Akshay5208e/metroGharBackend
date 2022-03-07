import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from './../../../backend/redux/products/products.actions';




const mapState = state => ({
  product: state.productsData.product
});


   
const ViewPage=({})=> {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { product } = useSelector(mapState);
  const{
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


    
    useEffect(() => {
      dispatch(
        fetchProductStart(productID)
      )
  
      return () => {
        dispatch(
          setProduct({})
        )
      }
  
    }, []);

   
 
  return (
    <>
    <div>ViewPage</div>

    <div>---------------edit yourself veena-----------------</div>
    
      {propertyName}
    
     
      
    
   
    
    </>
  )
}

export default ViewPage