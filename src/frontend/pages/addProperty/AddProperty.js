import React,{useState} from 'react'
import TextEditor from '../../independentComponents/textEditor/TextEditor'
import AboutAmenities from './subComponent/AboutAmenities'
import AboutBcp from './subComponent/AboutBcp'
import AboutLocation from './subComponent/AboutLocation'
import AboutPricing from './subComponent/AboutPricing'
import AboutProject from './subComponent/AboutProject'
import BasicInfo from './subComponent/BasicInfo'


function AddProperty() {


 


  return (
    <>
    <div><form></form></div>
    {/*------- basic Info Section ------------------------------------------------*/}
      <div>
        <BasicInfo/>
      </div>
    {/* ----------About Project Section ------------------------------------------*/}
    <div>
     <AboutProject/>
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
     <AboutBcp/>

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