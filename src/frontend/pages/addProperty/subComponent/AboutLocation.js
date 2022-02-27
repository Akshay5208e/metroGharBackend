import { useState } from "react";
import React from 'react'
import Pricing from "./Pricing";
import Location from "./Location";

function AboutLocation({getLocationValue}) {

  const [locationList, setLocationList] = useState([{}]);

  const [feature, setFeature] = useState("")
  const [featureName, setFeatureName] = useState("")
  const [featureDistance, setFeatureDistance]= useState('')


  const handleLocationChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...locationList];
    list[index][name] = value;
    setLocationList(list);
   
  };

  const handleLocationRemove = (index) => {
    const list = [...locationList];
    list.splice(index, 1);
    setLocationList(list);

    getLocationValue(locationList);
  };

  const handleLocationAdd = () => {
    setLocationList([...locationList
      , { }
    ]);

    getLocationValue(locationList);
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
              <>
                <div>
                  Feature
                  <input type = 'text' value={feature} onChange={e=>setFeature(e.target.value)}/>
                </div>
                <div>
                  Name of Feature
                  <input type = 'text' value={featureName} onChange={e=>setFeatureName(e.target.value)}/>
                </div>
                <div>
                Distance
                <input type = 'number' value={featureDistance} onChange={e=>setFeatureDistance(e.target.value)}/>
                </div>

              </>
              {locationList.length - 1 === index  && (
                <button
                  type="button"
                  onClick={handleLocationAdd}
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
                  onClick={() => handleLocationRemove(index)}
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