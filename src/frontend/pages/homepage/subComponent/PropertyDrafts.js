import React,{useState} from 'react'


//--------get values form local storage--------------------//

const getDataFromLocalStorage = ()=>{
  const data = localStorage.getItem('draftProperties');
  if(data){
    return JSON.parse(data);
  }
  else{
    return([])
  }
}


function PropertyDrafts() {

  const [draftsArray, setDraftsArray] = useState(getDataFromLocalStorage())

  const ViewProperty=()=>{}
  const EditProperty=()=>{}
  const DeleteProperty=()=>{}
  

  return (
    <>
    
    <table>
  <tr>
    
    <th>Property</th>
    <th>Type</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
  <tr>
    <td>Property1</td>
    <td>flat</td>
    <td>construction</td>
    <td>
      <button onClick={ViewProperty}>View</button>
      <button onClick={EditProperty}>Edit</button>
      <button onClick={DeleteProperty}>Delete</button>

    </td>
    
  </tr>

</table>
    </>
  )
}

export default PropertyDrafts