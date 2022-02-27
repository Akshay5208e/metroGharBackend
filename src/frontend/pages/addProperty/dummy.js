import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from '../../independentComponents/textEditor/TextEditor';
import AboutAmenities from './subComponent/AboutAmenities'

import AboutLocation from './subComponent/AboutLocation'
import AboutPricing from './subComponent/AboutPricing'



const mapState = ({ propertiesData}) => ({
  properties: propertiesData.properties
});

function AddProperty() {






  return (
    <>
    <div><form></form></div>
    {/*------- basic Info Section ------------------------------------------------*/}
    <div>
      <h3> Basic Info</h3>
    <div>
      <div>
        <h5>Property Name</h5>
        <input type = "text" value={propertyName} onChange={e=>setPropertyName(e.target.value)}  />
      </div>
      <div>
        <h5>Location</h5>
        <input type = "text" value={location} onChange={e=>setLocation(e.target.value)}  />
      </div>
      <div>
        <h5>Position</h5>
        <input type = "text" value={position} onChange={e=>setPosition(e.target.value)}  />
      </div>
      <div>
        <h5>Space </h5>
        <input type = "text" value={space} onChange={e=>setSpace(e.target.value)}  />
      </div>
      <div>
        <h5>Type</h5>
        <input type = "text" value={type} onChange={e=>setType(e.target.value)}  />
      </div>
      <div>
        <h5>Price</h5>
        <input type = "text" value={price} onChange={e=>setPrice(e.target.value)}  />
      </div>
      
      <div>
        <h5>Property Image</h5>
        <input type = "file"  />
        <button>Upload</button>
      </div>
    </div>
      </div>
    {/* ----------About Project Section ------------------------------------------*/}
    <div>
    <h3>About Project</h3>
      <div>
        <h5>About Property:</h5>
        <TextEditor/>
      </div>
      <div>
        <h5>Property Overview:</h5>
        <div>
          <div>
            <h5>Size</h5>
            <input type='text' value={size} onChange={e=>setSize(e.target.value)}/>
          </div>
          <div>
            <h5>Price</h5>
            <input type='text' value={aboutPrice} onChange={e=>setAboutPrice(e.target.value)}/>
          </div>
          <div>
            <h5>Tower unit</h5>
            <input type='text' value={towerUnit} onChange={e=>setTowerUnit(e.target.value)}/>
          </div>
          <div>
            <h5>Status</h5>
            <input type='text' value={status} onChange={e=>setStatus(e.target.value)}/>
          </div>
          <div>
            <h5>Configuration</h5>
            <input type='text' value={configuration} onChange={e=>setConfiguration(e.target.value)}/>
          </div>
          <div>
            <h5>RERA ID</h5>
            <input type='text' value={reraId} onChange={e=>setReraId(e.target.value)}/>
          </div>
          <div>
            <h5>Specification</h5>
            <TextEditor/>
          </div>
        </div>
      </div>
    </div>

    {/*----------- About Pricing------------------------------------------------- */}
    <div>
      <h3>About Pricing</h3>
      <div>
       <AboutPricing/>
      </div>
    </div>

    {/*-------------- About Location ---------------------------------------------*/}
    <div>
      <h3>About Location</h3>
      <div>
        <div>
          <AboutLocation/>
        </div>
      </div>
    </div>

    {/*------------- ABout Amenities--------------------------------------------- */}
    <div>
      <h3>About Amenities</h3>
      <AboutAmenities/>
    </div>

    {/*--------------------- about B/cp------------------------------------------ */}

    <div>
      <h3>About B/cp</h3>
      <div>
        <h6>Property Owner</h6>
        <div>
          <select onChange={ handleOwnerChange}>
          {options.map((option, index) => {
          const { value, name } = option;

          return (
            <option key={index} value={value}>{name}</option>
          );
        })}
          </select>
        </div>
      </div>
      {active ==='second' &&
       <div>
        <h6>Name</h6>
        <div>
          <input type='text' value = {ownerName} onChange={e=>setOwnerName(e.target.value)}/>
        </div>
      </div>
      }
      {active ==='first' &&
       <div>
        <h6>Organisation Name</h6>
        <div>
          <input type='text' value = {organisatioName} onChange={e=>setOrganisatioName(e.target.value)}/>
        </div>
      </div>
      }
      
      <div>
      <div>
        <h6>E-mail</h6>
        <div>
        <input type='email' value = {ownerEmail} onChange={e=>setOwnerEmail(e.target.value)}/> 
        </div>
      </div>
      <div>
        <h6>Website</h6>
        <div>
        <input type='text' value = {ownerWebsite} onChange={e=>setOwnerWebsite(e.target.value)}/>
        </div>
      </div>
      <div>
        <h6>Contact No.</h6>
        <div>
        <input type='number' value = {ownerContactNo} onChange={e=>setOwnerContactNo(e.target.value)}/>
        </div>
      </div>
     {active === 'first' &&
     <>
      <div>
        <h6>Project</h6>
        <div>
        <input type='text' value = {ownerProject} onChange={e=>setOwnerProject(e.target.value)}/>
        </div>
      </div>
      <div>
        <h6>Year Of Establishment</h6>
        <div>
        <input type='text' value = {ownerEstablishment} onChange={e=>setOwnerEstablishment(e.target.value)}/>
        </div>
      </div>
      </>
     }

{active==='second' && 
      <>
       <div>
        <h6>Since Operation</h6>
        <div>
        <input type='text' value = {sinceOperation} onChange={e=>setSinceOpertaion(e.target.value)}/>
        </div>
      </div>

      <div>
        <h6>Property List</h6>
        <div>
        <input type='text' value = {ownerPropertyList} onChange={e=>setOwnerPropertyList(e.target.value)}/>
        </div>
      </div>
      </>}
     
      </div>




      <div>
        <h6>Address</h6>
        <div>
        <input type='text' value = {ownerAddress} onChange={e=>setOwnerAddress(e.target.value)}/>
        </div>
      </div>

      <div>
        <h6>Bio</h6>
        <div>
          <TextEditor/>
        </div>
      </div>

    </div>

    {/* ----------------------buttons--------------------------------------------- */}
    <div>
    <button>Draft</button>
    <button>Submit for Review</button>
    </div>

    </>
  )
}

export default AddProperty