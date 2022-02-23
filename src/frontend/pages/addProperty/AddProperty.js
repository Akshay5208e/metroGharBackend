import React from 'react'
import TextEditor from '../../independentComponents/textEditor/TextEditor'
import AboutLocation from './subComponent/AboutLocation'
import AboutPricing from './subComponent/AboutPricing'
function AddProperty() {
  return (
    <>
    <div><form></form></div>
    {/*------- basic Info Section ------------------------------------------------*/}
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
      </div>
    </div>
    {/* ----------About Project Section ------------------------------------------*/}
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

    {/*----------- About Pricing------------------------------------------------- */}
    <div>
      <h3>About Pricing</h3>
      <div>
        <div>
          <AboutPricing/>
        </div>
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
      <div>
        <h5>Basic Amenities</h5>
        <div>
          <div>Dropdown</div>
        </div>
      </div>
      <div>
        <h5>Convenience Amenities</h5>
        <div>
          <div>Dropdown</div>
        </div>
      </div>
      <div>
        <h5>Environment Amenities</h5>
        <div>
          <div>Dropdown</div>
        </div>
      </div>
      <div>
        <h5>Security Amenities</h5>
        <div>
          <div>Dropdown</div>
        </div>
      </div>
      <div>
        <h5>Sports Amenities</h5>
        <div>
          <div>Dropdown</div>
        </div>
      </div>
    </div>

    {/*--------------------- about B/cp------------------------------------------ */}

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

    {/* ----------------------buttons--------------------------------------------- */}
    <div>
    <button>Draft</button>
    <button>Submit for Review</button>
    </div>

    </>
  )
}

export default AddProperty