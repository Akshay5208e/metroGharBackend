import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTable from '../../../independentComponents/Table/PropTable';
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../../../backend/redux/products/products.actions';


const productsMapState = ({ productsData }) => ({
  products: productsData.products
});

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

const propData = [
  {
    name: "Prestene Project ,Banglore",
    type: "Flat",
    status: "Pending",
  },
  {
    name: "Gaur City 12 th avenue ,Banglore",
    type: "Flat",
    status: "Pending",
  },
  {
    name: "Whit Orchid ,Banglore",
    type: "Villa",
    status: "Pending",
  },
  {
    name: "Mahagun Wood ,Banglore",
    type: "Flat",
    status: "Pending",
  },
  {
    name: "Cleo Countary ,Banglore",
    type: "Villa",
    status: "Pending",
  }
]

function PendingProperty() {

 
  const {currentUser} = useSelector(mapState)
  const { products } = useSelector(productsMapState);
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );
  }, []);

  return (
   <>
   <PropTable data={propData} />
   {/* <table>
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
                        <Link to= {`/view/${documentID}`}><input type='button' value='View'/></Link>
                        <Link to= {`/edit/${documentID}`}><input type='button' value='Edit'/></Link>
                          <button onClick={() => dispatch(deleteProductStart(documentID))}>
                            Delete
                          </button>
                        </td>
                      </tr></>
                      :
                      ((data.length>0) &&((postedBy===currentUser.displayName))?<div>No Properties Are Pending For Approval</div> : "")
                      }
                      </>
                      )
                    })}
     </tbody>
   </table> */}

   </>
  )
}

export default PendingProperty