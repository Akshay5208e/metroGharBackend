import React from 'react'
import TextEditor from '../../../independentComponents/textEditor/TextEditor'

function AboutBcp() {
  return (
    <div>
         <div>
        <h6>Property Owner</h6>
        <div>Dropdown</div>
      </div>
      <div>
        <h6>Name</h6>
        <div>
          <input type='text'/>
        </div>
      </div>
      <div>
      <div>
        <h6>Organization Name</h6>
        <div>
          <input type='text'/>
        </div>
      </div>
      <div>
        <h6>E-mail</h6>
        <div>
          <input type='email'/>
        </div>
      </div>
      <div>
        <h6>Website</h6>
        <div>
          <input type='text'/>
        </div>
      </div>
      <div>
        <h6>Contact No.</h6>
        <div>
          <input type='number'/>
        </div>
      </div>
      <div>
        <h6>Project</h6>
        <div>
          <input type='text'/>
        </div>
      </div>
      <div>
        <h6>Year Of Establishment</h6>
        <div>
          <input type='text'/>
        </div>
      </div>


      <div>
        <h6>Since Operation</h6>
        <div>
          <input type='text'/>
        </div>
      </div>

      <div>
        <h6>Property List</h6>
        <div>
          <input type='text'/>
        </div>
      </div>
      </div>




      <div>
        <h6>Address</h6>
        <div>
          <input type='text'/>
        </div>
      </div>

      <div>
        <h6>Bio</h6>
        <div>
          <TextEditor/>
        </div>
      </div>
    </div>
  )
}

export default AboutBcp