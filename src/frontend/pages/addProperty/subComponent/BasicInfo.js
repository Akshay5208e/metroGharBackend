import React from 'react'

function BasicInfo() {
  return (
    <div>
    <h3> Basic Info</h3>
    <div>
      <div>
        <h5>Property Name</h5>
        <input type = "text"  />
      </div>
      <div>
        <h5>Location</h5>
        <input type = "text"  />
      </div>
      <div>
        <h5>Position</h5>
        <input type = "text"  />
      </div>
      <div>
        <h5>Space </h5>
        <input type = "text"  />
      </div>
      <div>
        <h5>Type</h5>
        <input type = "text"  />
      </div>
      <div>
        <h5>Maximum Price</h5>
        <input type = "number"  />
      </div>
      <div>
        <h5>Minimum Price</h5>
        <input type = "number"  />
      </div>
      <div>
        <h5>Property Image</h5>
        <input type = "file"  />
      </div>
    </div>
  </div>
  )
}

export default BasicInfo