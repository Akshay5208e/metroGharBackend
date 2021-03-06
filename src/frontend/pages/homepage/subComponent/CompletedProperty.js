import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTable from '../../../independentComponents/Table/PropTable.jsx';
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
    status: "Waiting",
  },
  {
    name: "Gaur City 12 th avenue ,Banglore",
    type: "Flat",
    status: "Complete",
  },
  {
    name: "Whit Orchid ,Banglore",
    type: "Villa",
    status: "Waiting",
  },
  {
    name: "Mahagun Wood ,Banglore",
    type: "Flat",
    status: "Pending",
  },
  {
    name: "Cleo Countary ,Banglore",
    type: "Villa",
    status: "Complete",
  }
]

function CompletedProperty() {

 
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
   <PropTable data={propData} />
   {/* <table>
    <thead>
      <tr>
        <th scope="col">Sr. No.</th>
        <th scope="col">Property</th>
        <th scope="col">Type</th>
        <th scope="col">Status</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>     
      <tr>
        <td scope="row">1</td>
        <td>Property Name</td>
        <td>Type</td>
        <td>status</td>
        <td>
          <Link to="#" ><input type='button' value='View'/></Link>
          <button>
            Edit
          </button>
          <button>
            Delete
          </button>
        </td>
      </tr>
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
                        {((postedBy===currentUser.displayName) && (propertyApproval===true) && (isSubmitted===true))?
                        <>
                          <tr key={index}>
                            <td> </td>
                            <td>{propertyName}</td>
                            <td>{type}</td>
                            <td>{status}</td>
                            <td>
                              <Link to= {`/view/${documentID}`}><input type='button' value='View'/></Link>
                              <button>
                                Edit
                              </button>
                              <button onClick={() => dispatch(deleteProductStart(documentID))}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      :
                      ((data.length>0) &&((postedBy===currentUser.displayName))?<div>No Properties Are  Approved</div> : "")
                    }
                      </>
                      )
                    })}
     </tbody>
   </table>
  */}
   </>
  )
}
export default CompletedProperty