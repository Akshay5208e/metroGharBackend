import React, { useState } from 'react'
import TextEditor from '../../../independentComponents/textEditor/TextEditor'

function AboutBcp() {

  const [bcpCategory, setBcpCategory] = useState('Builder')
  const [active, setActive] = useState('first');
  
  const options=[{
    value: "Builder",
    name: "Builder"
  }, {
    value: "Agent",
    name: "Agent(CP)"
  }]


  const handleOwnerChange=(e)=>{
    if((e.target.value)=='Agent')
    {
      setActive('second')
    }
    else{
      setActive('first')
    }
    
    setBcpCategory(e.target.value)
  }
  return (
    <div>
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
     {active == 'first' &&
     <>
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
      </>
     }

{active=='second' && 
      <>
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
      </>}
     
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