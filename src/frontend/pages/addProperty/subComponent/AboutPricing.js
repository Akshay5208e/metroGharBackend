import { useState } from "react";
import React from 'react'
import Pricing from "./Pricing";

function AboutPricing() {

  const [pricingList, setPricingList] = useState([{pricing:""}]);


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
      , { pricing: "" }
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
              <Pricing />
              {pricingList.length - 1 === index && pricingList.length < 4 && (
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