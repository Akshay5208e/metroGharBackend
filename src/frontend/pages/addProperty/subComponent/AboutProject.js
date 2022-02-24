import React from 'react'
import TextEditor from '../../../independentComponents/textEditor/TextEditor'

function AboutProject() {
  return (
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
            <input type='text'/>
          </div>
          <div>
            <h5>Price</h5>
            <input type='text'/>
          </div>
          <div>
            <h5>Tower unit</h5>
            <input type='text'/>
          </div>
          <div>
            <h5>Status</h5>
            <input type='text'/>
          </div>
          <div>
            <h5>Configuration</h5>
            <input type='text'/>
          </div>
          <div>
            <h5>RERA ID</h5>
            <input type='text'/>
          </div>
          <div>
            <h5>Specification</h5>
            <TextEditor/>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default AboutProject