import React,{useState} from 'react'
import {BasicAmenitiesData, ConvenienceAmenitiesData, EnvironmentAmenitiesData, SecurityAmenitiesData, SportsAmenitiesData} from '../amenitiesData/AmenitiesData'

function AboutAmenities() {
  const [amenities, setAmenities] = useState(['hhhh'])

  const addAmenity = (e)=>{
    const newElement = e.target.value
    setAmenities(oldArray=>[...oldArray,newElement])
  }

  
  return (
    <div>
    <div>
        <h5>Basic Amenities</h5>
        <div>
          <div>
            <select>
              <option  selected disabled="true">Select</option>
              {
                  BasicAmenitiesData.map((res)=>
                  <option  value= {res.name} onClick={addAmenity}>
                      {res.name}
                  </option>)
              }
            </select>
          </div>
        </div>
      </div>
      <div>
        <h5>Convenience Amenities</h5>
        <div>
          <div>
          <div>
            <select>
              <option selected disabled="true">Select</option>
              {
                  ConvenienceAmenitiesData.map((res)=>
                  <option  value= {res.name} onClick={addAmenity}>
                      {res.name}
                  </option>)
              }
            </select>
          </div>
          </div>
        </div>
      </div>
      <div>
        <h5>Environment Amenities</h5>
        <div>
          <div>
          <div>
            <select>
              <option selected disabled="true">Select</option>
              {
                  EnvironmentAmenitiesData.map((res)=>
                  <option value= {res.name}onClick={addAmenity}>
                      {res.name}
                  </option>)
              }
            </select>
          </div>
          </div>
        </div>
      </div>
      <div>
        <h5>Security Amenities</h5>
        <div>
          <div>
          <div>
            <select>
              <option selected disabled="true">Select</option>
              {
                  SecurityAmenitiesData.map((res)=>
                  <option value={res.name} onClick={addAmenity}>
                      {res.name}
                  </option>)
              }
            </select>
          </div>
          </div>
        </div>
      </div>
      <div>
        <h5>Sports Amenities</h5>
        <div>
          <div>
          <div>
            <select>
              <option selected disabled="true">Select</option>
              {
                  SportsAmenitiesData.map((res)=>
                  <option value={res.name} onClick={addAmenity}>
                      {res.name}
                  </option>)
              }
            </select>
          </div>
          </div>
        </div>
      </div>

      {console.log(amenities)}
    </div>
  )
}

export default AboutAmenities