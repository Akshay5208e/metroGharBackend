import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';


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

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

function PropertyDrafts() {
  const {currentUser} = useSelector(mapState)

  // const [draftsArray, setDraftsArray] = useState(getDataFromLocalStorage())
  const [draftProperties, setDraftProperties] = useState(getDataFromLocalStorage());

  const ViewProperty=()=>{}
  const EditProperty=()=>{}

  const DeleteDraftProperty=(tempId)=>{
    const filteredDraftsProperties=draftProperties.filter((element,index)=>{
      return element.tempId !== tempId
    })
    setDraftProperties(filteredDraftsProperties);
  }

  useEffect(()=>{

    localStorage.setItem('draftProperties',JSON.stringify(draftProperties));

  },[draftProperties])
  

  return (
    <>

    {draftProperties.length>0?
    <>
    <table>
  <tr>
    
    <th>Property</th>
    <th>Type</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>

  {}
  {draftProperties.map(draft=>(
     ((draft.postedBy===currentUser.displayName)&&(draft.isSubmitted === false)) ?
     <tr>
     <td>{draft.propertyName}</td>
     <td>{draft.type}</td>
     <td>{draft.position}</td>
     <td>
       <button onClick={ViewProperty}>View</button>
       <button onClick={EditProperty}>Edit</button>
       <button onClick={()=>DeleteDraftProperty(draft.tempId)}>Delete</button>
 
     </td>
     
   </tr>
   :
   "No drafts Pending"
  ))}

</table>
    </>:"No drafts Pending"}
    
    
    </>
  )
}

export default PropertyDrafts