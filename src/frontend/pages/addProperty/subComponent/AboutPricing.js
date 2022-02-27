import { useState } from "react";
import React from 'react'
import Pricing from "./Pricing";

function AboutPricing() {

  const [pricingList, setPricingList] = useState([{}]);

  const [apartmentType, setApartmentType] = useState('')
  const [apartmentSpace, setApartmentSpace] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [totalPrice, setTotalPrice] = useState('')



  const handlePricingChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...pricingList];
    list[index][name] = value;
    setPricingList(list);
  };

  const handlePricingRemove = (index) => {
    const list = [...pricingList];
    list.splice(index, 1);
    setPricingList(list);
  };

  const handlePricingAdd = () => {
    setPricingList([...pricingList
      , {}
    ]);
  };
  return (
    <>
    <div>
     
    <div>
        {pricingList.map((singlePricing, index) => (
          <div key={index} className="services">
            <div className="first-division">
              {/* <input
                name="service"
                type="text"
                id="service"
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              /> */}

<>
    <div>
      <div>
        Type of Apartment
        <input type = 'text' value ={apartmentType} onChange={e=>setApartmentType(e.target.value)}/>
        </div>
        <div>
        Space
        <input type = 'text' value ={apartmentSpace} onChange={e=>setApartmentSpace(e.target.value)}/>
        </div>
        <div>
        Per Sq. ft Price
        <input type = 'text' value ={unitPrice} onChange={e=>setUnitPrice(e.target.value)}/>
        </div>
        <div>
        Total Price
        <input type = 'text' value ={totalPrice} onChange={e=>setTotalPrice(e.target.value)}/>
        </div>
        <div>
        Image
        <input type = 'file'/>

        <button>Upload</button>
        </div>
     

    </div>
    </>
              
              {pricingList.length - 1 === index &&(
                <button
                  type="button"
                  onClick={handlePricingAdd}
                  className="add-btn"
                >
                  <span>Add a field</span>
                </button>
              )} 
        </div>
        <div className="second-division">
              {pricingList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handlePricingRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>
      </div>
        ))}
        </div>

    </div>
    </>
  )
}

export default AboutPricing