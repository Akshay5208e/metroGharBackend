import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PropTable from '../../../independentComponents/DraftTable';


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

  const history = useHistory();
  
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
    <PropTable/>
    </>
//     <>

//     {draftProperties.length>0?
//     <>
//     <table>
//   <tr>
    
//     <th>Property</th>
//     <th>Type</th>
//     <th>Status</th>
//     <th>Actions</th>
//   </tr>
//   {}
//   {draftProperties.map(draft=>(
//      (draft.postedBy===currentUser.displayName) ?
//      <tr>
//      <td>{draft.propertyName}</td>
//      <td>{draft.type}</td>
//      <td>{draft.position}</td>
//      <td>
       
//       <button onClick={()=>history.push(`/draftEdit/${draft.tempId}`)}>View</button>
//        <button onClick={()=>history.push(`/draftEdit/${draft.tempId}`)}>Edit</button>
//        <button onClick={()=>DeleteDraftProperty(draft.tempId)}>Delete</button>
 
//      </td>
     
//    </tr>
//    :
//    "No drafts Pending"
//   ))}

// </table>
//     </>:"No drafts Pending"}
    
    
//     </>
  )
}

export default PropertyDrafts