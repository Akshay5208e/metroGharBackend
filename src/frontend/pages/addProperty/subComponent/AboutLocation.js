import { useState } from "react";
import React from 'react'
import Pricing from "./Pricing";
import Location from "./Location";

function AboutLocation() {

  const [locationList, setLocationList] = useState([{location:""}]);


  const handlePricingChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...locationList];
    list[index][name] = value;
    setLocationList(list);
  };

  const handlePricingRemove = (index) => {
    const list = [...locationList];
    list.splice(index, 1);
    setLocationList(list);
  };

  const handlePricingAdd = () => {
    setLocationList([...locationList
      , { pricing: "" }
    ]);
  };
  return (
    <>
    <div>
     
    <div>
        {locationList.map((singlePricing, index) => (
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
              <Location/>
              {locationList.length - 1 === index && locationList.length < 4 && (
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
              {locationList.length !== 1 && (
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

export default AboutLocation