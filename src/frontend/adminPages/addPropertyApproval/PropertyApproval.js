import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../../backend/redux/products/products.actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { signOutUserStart } from '../../../backend/redux/User/user.actions';
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

  return (
    <>
    <div>
        all
        <Link to ="/addProperty"><div>addProperty</div></Link>
    </div>
    {currentUser&&
        <button onClick={() => signOut()}>Signout</button>}
    <div>
        <div>----------for filters------------------</div>
        <table>
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
    
    </>
  )
}

export default PropertyApproval