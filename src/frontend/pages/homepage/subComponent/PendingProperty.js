import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../../../backend/redux/products/products.actions';


const productsMapState = ({ productsData }) => ({
  products: productsData.products
});

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

function PendingProperty() {

 
  const {currentUser} = useSelector(mapState)
  const { products } = useSelector(productsMapState);
  const dispatch = useDispatch();

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );
  }, []);

  return (
   <>
   <table>
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
                        {((postedBy===currentUser.displayName) && (propertyApproval===false) &&(isSubmitted==true))?
                        <>
                        <tr key={index}>
                        <td>
                          
                        </td>
                        <td>
                          {propertyName}
                        </td>
                        <td>
                          {type}
                        </td>
                        <td>
                          {status}
                        </td>
                        <td>
                          <button >
                          View
                          </button>
                          <button >
                            Edit
                          </button>
                          <button onClick={() => dispatch(deleteProductStart(documentID))}>
                            Delete
                          </button>
                        </td>
                      </tr></>
                      :
                      <div>No Properties Are Pending For Approval</div>}
                      </>
                      )
                    })}
     </tbody>
   </table>

   </>
  )
}

export default PendingProperty