import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from '../../independentComponents/textEditor/TextEditor';
import AboutAmenities from './subComponent/AboutAmenities'
import {storage} from '../../../backend/firebase/utils'
import { fetchProductStart,fetchProductsStart,addProductStart } from '../../../backend/redux/products/products.actions';



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

const productsMapState = ({ productsData }) => ({
  products: productsData.products
});

function AddProperty() {

  const {currentUser} = useSelector(mapState)
  const { products } = useSelector(productsMapState);
  const dispatch = useDispatch();

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );
  }, []);

   
  const getPostedBy = ()=>{
    if(currentUser){
      return currentUser.displayName;
    }
     return 'no user'
  }





  //-----------------------global States---------------------------------------------//
  
  const [propertyApproval, setPropertyApproval] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setsubmitError] = useState("")
  const [postedBy, setPostedBy] = useState("")
  const [pId, setPId] = useState()
  
  


  useEffect(() => {
    if(currentUser)
    setPostedBy(currentUser.displayName)

  }, [currentUser]);

  //-----------------main array of objects in local storage----------------------------//
  const [draftProperties, setDraftProperties] = useState([]);


  const resetForm=()=>{
    setPropertyName('')
    setLocation('')
    setPosition('')
    setSpace('')
    setType('')
    setPrice('')
    setMainImageUrls([])  

    setSize('')
    setAboutPrice('')
    setTowerUnit('')
    setConfiguration('')
    setReraId('')
    setStatus('')
    setAboutProject('')
    setSpecifications('')

    setPropertiesPricingList([])
    setLocationList([])

    setBasicAmenities([])
    setConvenienceAmenities([])
    setenvironmentAmenities([])
    setSecurityAmenities([])
    setSportsAmenities([])  
    
    setBcpCategory('Builder')
    setOrganisatioName('')
    setOwnerName('')
    setOwnerEmail('')
    setOwnerWebsite('')
    setOwnerContactNo('')
    setOwnerAddress('')
    setOwnerProject('')
    setOwnerEstablishment('')
    setSinceOpertaion('')
    setOwnerPropertyList('')
    setOwnerBio('')
  }

  const handleDraftsProperties = (e)=>{
    e.preventDefault();

    
    //creating object

    let draftProperty={

      tempId: Math.floor(Math.random()* 1000000000+1),
      postedBy,
      propertyApproval,
      isSubmitted,

      //basic info
      propertyName,
      location,
      position,
      space,
      type,
      price,
      mainImageUrls,

      //about section
      aboutProject,
      size,
      aboutPrice,
      towerUnit,
      configuration,
      reraId,
      status,
      specification,

      propertiesPricingList,
      locationList,

      // amenities

      basicAmenities,
      convenienceAmenities,
      environmentAmenities,
      securityAmenities,
      sportsAmenities,
      
      // owners section
      bcpCategory,
      organisatioName,
      ownerName,
      ownerEmail,
      ownerWebsite,
      ownerContactNo,
      ownerAddress,
      ownerProject,
      ownerEstablishment,
      sinceOperation,
      ownerPropertyList,
      ownerBio,
      }

    setDraftProperties([...draftProperties,draftProperty])

    //reseeting form 

    resetForm();
  
  }

  //--------------------submission for reveiew---------------------------------//
  const handlSubmission = (e)=>{
    e.preventDefault();
    setIsSubmitted(true)

    dispatch(
      addProductStart({
        tempId: Math.floor(Math.random()* 1000000000+1),
      postedBy,
      propertyApproval,
      isSubmitted,

      //basic info
      propertyName,
      location,
      position,
      space,
      type,
      price,
      mainImageUrls,

      //about section
      aboutProject,
      size,
      aboutPrice,
      towerUnit,
      configuration,
      reraId,
      status,
      specification,

      propertiesPricingList,
      locationList,

      // amenities

      basicAmenities,
      convenienceAmenities,
      environmentAmenities,
      securityAmenities,
      sportsAmenities,
      
      // owners section
      bcpCategory,
      organisatioName,
      ownerName,
      ownerEmail,
      ownerWebsite,
      ownerContactNo,
      ownerAddress,
      ownerProject,
      ownerEstablishment,
      sinceOperation,
      ownerPropertyList,
      ownerBio,
      })
    );
     
    resetForm();
   }

  
  //saving Data to local Storage
  useEffect(()=>{

    localStorage.setItem('draftProperties',JSON.stringify(draftProperties));

  },[draftProperties])



  
  //-----------------------basic info states and functions------------------------------------------------------//
  const [propertyName, setPropertyName] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("")
  const [space, setSpace] = useState("")
  const [type, setType] = useState("")
  const [price, setPrice] = useState("")

  const   [mainImages, setMainImages] = useState([]);
    const [mainImageUrls, setMainImageUrls] = useState([]);
    const [mainImagesProgress, setMainImagesProgress] = useState(0);
  

  const handleMainImagesChange=(e)=>{
    for (let i = 0; i < e.target.files.length; i++) {
      const newMainImage = e.target.files[i];
      newMainImage["id"] = Math.random();
      setMainImages((prevState) => [...prevState, newMainImage]);
    }
  }
  const handleMainImagesUpload=()=>{
    const promises = [];
    mainImages.map((image) => {
      const uploadTask = storage.ref(`images/${propertyName}/mainImages/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setMainImagesProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref(`images/${propertyName}/mainImages/`)
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setMainImageUrls((prevState) => [...prevState, urls]);
            });
        }
      );
    });

    Promise.all(promises)
    .then(() => alert("All images uploaded"))
    .catch((err) => console.log(err));
  }

  //--------------------------About porject info states and functions----------------------------------------------//
 
  const [size, setSize] = useState("")
  const [aboutPrice, setAboutPrice] = useState("")
  const [towerUnit, setTowerUnit] = useState("")
  const [configuration, setConfiguration] = useState("")
  const [reraId, setReraId] = useState("")
  const [status, setStatus] = useState("")
  const [aboutProject, setAboutProject] = useState("")
  const [specification, setSpecifications] = useState("")

  const getPropertyInfo=(value)=>{
    setAboutProject(value)
  }
 
  const getSpecification=(value)=>{
    setSpecifications(value)
  }


  //----------------------about Pricing state and functions-------------------------------------------------------//

  const [propertiesPricingList, setPropertiesPricingList] = useState([])
  
  const [apartmentType, setApartmentType] = useState('')
  const [apartmentSpace, setApartmentSpace] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [totalPrice, setTotalPrice] = useState('')


  const   [pricingImage, setPricingImage] = useState(null);
    const [pricingImageUrl, setPricingImageUrl] = useState("");
    const [pricingImageProgress, setPricingImageProgress] = useState(0);

  
    

  const handlePricingSubmit=(e)=>{

    e.preventDefault();
      // creating an object
      let typePricing={
       
       apartmentType,
       apartmentSpace,
       unitPrice,
       totalPrice,
       pricingImageUrl,
      }
      setPropertiesPricingList([...propertiesPricingList,typePricing]);
      // setFeatureId(featureIdGenerator)
      
      setApartmentType('')
      setApartmentSpace('')
      setUnitPrice('')
      setTotalPrice('')
      setPricingImageUrl('')

  }
  const deletePricing=(apartmentType)=>{
    const filteredPricing=propertiesPricingList.filter((elem,index)=>{
      return elem.apartmentType !== apartmentType
    })
    setPropertiesPricingList(filteredPricing);
  }

  const handlePricingImageChange = e => {
    if (e.target.files[0]) {
      setPricingImage(e.target.files[0]);
    }
  };

  const handlePricingImageUpload = () => {
    const uploadTask = storage.ref(`images/${propertyName}/pricingImage/${pricingImage.name}`).put(pricingImage);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPricingImageProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref(`images/${propertyName}/pricingImage/`)
          .child(pricingImage.name)
          .getDownloadURL()
          .then(url => {
            setPricingImageUrl(url);
          });
      }
    );
  };

 
  


  //----------------------about location state and functions-----------------------------------------------------//
    
  const [locationList, setLocationList] = useState([]);

  // const [featureId,setFeatureId]= useState(featureIdGenerator)
  const [feature, setFeature] = useState("")
  const [featureName, setFeatureName] = useState("")
  const [featureDistance, setFeatureDistance]= useState("")


  

  const handleLocationSubmit=(e)=>{
   
      e.preventDefault();
      // creating an object
      let featureLocation={
        //featureId,
       feature,
       featureName,
       featureDistance
      }
      setLocationList([...locationList,featureLocation]);
      // setFeatureId(featureIdGenerator)
      setFeature('');
      setFeatureName('');
      setFeatureDistance('');
   

  }


  const deletefeatureLocation=(featureName)=>{
    const filteredFeatureLocations=locationList.filter((element,index)=>{
      return element.featureName !== featureName
    })
    setLocationList(filteredFeatureLocations);
  }


    
  //----------------------about amenities state and functions----------------------------------------------------//
  const [basicAmenities, setBasicAmenities] = useState([])
  const [convenienceAmenities, setConvenienceAmenities] = useState([])
  const [environmentAmenities, setenvironmentAmenities] = useState([])
  const [sportsAmenities, setSportsAmenities] = useState([])
  const [securityAmenities, setSecurityAmenities] = useState([])


  //----------------------about bcp state and functions---------------------------------------------------------//
    const [bcpCategory, setBcpCategory] = useState('Builder')
    const [organisatioName, setOrganisatioName] = useState("")
    const [ownerName, setOwnerName] = useState("")
    const [ownerEmail, setOwnerEmail] = useState("");
    const [ownerWebsite, setOwnerWebsite] = useState("")
    const [ownerContactNo, setOwnerContactNo] = useState("")
    const [ownerAddress, setOwnerAddress] = useState("")
    const [ownerProject, setOwnerProject] = useState("")
    const [ownerEstablishment, setOwnerEstablishment] = useState("")
    const [sinceOperation, setSinceOpertaion] = useState("")
    const [ownerPropertyList, setOwnerPropertyList] = useState("")
    const [ownerBio, setOwnerBio] = useState("")

    const getBio = (value)=>{
      setOwnerBio(value)
    }


    
    const [active, setActive] = useState('first');
    
    const options=[{
      value: "Builder",
      name: "Builder"
    }, {
      value: "Agent",
      name: "Agent(CP)"
    }]
  
  
    const handleOwnerChange=(e)=>{
      if((e.target.value)==='Agent')
      {
        setActive('second')
      }
      else{
        setActive('first')
      }
      
      setBcpCategory(e.target.value)
    }


    return (
      <>
      
      {/*------- basic Info Section ------------------------------------------------*/}
      <div>
        {pId}
        <h3> Basic Info</h3>
      <div>
        <div>
          {postedBy}
          <h5>Property Name</h5>
          <input type = "text" value={propertyName} onChange={e=>setPropertyName(e.target.value)}  />
          {propertyName}
        </div>
        <div>
          <h5>Location</h5>
          <input type = "text" value={location} onChange={e=>setLocation(e.target.value)}  />
        </div>
        <div>
          <h5>Position</h5>
          <input type = "text" value={position} onChange={e=>setPosition(e.target.value)}  />
        </div>
        <div>
          <h5>Space </h5>
          <input type = "text" value={space} onChange={e=>setSpace(e.target.value)}  />
        </div>
        <div>
          <h5>Type</h5>
          <input type = "text" value={type} onChange={e=>setType(e.target.value)}  />
        </div>
        <div>
          <h5>Price</h5>
          <input type = "text" value={price} onChange={e=>setPrice(e.target.value)}  />
        </div>
        
        <div>
          <h5>Property Image</h5>
          <input type = "file" multiple onChange={handleMainImagesChange} />
          <div onClick={handleMainImagesUpload}>Upload</div>
        </div>

        <br/>
        {/* {mainImageUrls.map((url, i) => (
        <div key={i}>
          <a href=\target="_blank">
            {url}
          </a>
        </div>
      ))} */}
      </div>
        </div>
      {/* ----------About Project Section ------------------------------------------*/}
      <div>
      <h3>About Project</h3>
        <div>
          <h5>About Property:</h5>
          <TextEditor initialValue=" " getValue={getPropertyInfo}/>
        </div>
        <div>
          <h5>Property Overview:</h5>
          <div>
            <div>
              <h5>Size</h5>
              <input type='text' value={size} onChange={e=>setSize(e.target.value)}/>
            </div>
            <div>
              <h5>Price</h5>
              <input type='text' value={aboutPrice} onChange={e=>setAboutPrice(e.target.value)}/>
            </div>
            <div>
              <h5>Tower unit</h5>
              <input type='text' value={towerUnit} onChange={e=>setTowerUnit(e.target.value)}/>
            </div>
            <div>
              <h5>Status</h5>
              <input type='text' value={status} onChange={e=>setStatus(e.target.value)}/>
            </div>
            <div>
              <h5>Configuration</h5>
              <input type='text' value={configuration} onChange={e=>setConfiguration(e.target.value)}/>
            </div>
            <div>
              <h5>RERA ID</h5>
              <input type='text' value={reraId} onChange={e=>setReraId(e.target.value)}/>
            </div>
            <div>
              <h5>Specification</h5>
              <TextEditor initialValue="" getValue={getSpecification}/>
            </div>
          </div>
        </div>
      </div>
  
      {/*----------- About Pricing------------------------------------------------- */}
      <div>
        <h3>About Pricing</h3>
        <div>
         {/* <AboutPricing getPricingValue = {getPropertiesPricingList}/> */}

         <div>
      
     

        <form autoComplete="off" onSubmit={handlePricingSubmit}>
        <div>
        Type of Apartment
        <input type = 'text'  value ={apartmentType} onChange={e=>setApartmentType(e.target.value)}/>
        </div>
        <div>
        Space
        <input type = 'text' value ={apartmentSpace} onChange={e=>setApartmentSpace(e.target.value)}/>
        </div>
        <div>
        Per Sq. ft Price
        <input type = 'text'  value ={unitPrice} onChange={e=>setUnitPrice(e.target.value)}/>
        </div>
        <div>
        Total Price
        <input type = 'text'  value ={totalPrice} onChange={e=>setTotalPrice(e.target.value)}/>
        </div>
        <div>
        Image
        <input type = 'file' onChange={handlePricingImageChange}/>

        <div onClick={handlePricingImageUpload}>Upload</div>
        </div>

        <button type="submit" >
              ADD
            </button>
                </form>

                
     

    </div>
    viewing the pricnig table
    <div>
          {(propertiesPricingList.length>0)? 
          <>
            <div >
              <table >
                <thead>
                  <tr>
                    <th>Type of Apartment</th>
                    <th>Space</th>
                    <th> Per Sq. ft Price</th>
                    <th>Total Price</th>
                    <th>View Image</th>
                    <th> Delete</th>
                  </tr>
                </thead>
                <tbody>
                {propertiesPricingList.map(typePricing=>(
        
        <tr key={typePricing.apartmentType}>
            <td>{typePricing.apartmentType}</td>
            <td>{typePricing.apartmentSpace}</td>
            <td>{typePricing.unitPrice}</td>
            <td>{typePricing.totalPrice}</td>
            <td>{typePricing.pricingImageUrl}</td>
           
            <td>
                <button onClick={()=>deletePricing(typePricing.apartmentType)}>delete</button>
            </td>           
        </tr>     
    ))  }
                  
                </tbody> 
              </table>
            </div>
            <button 
            onClick={()=>setPropertiesPricingList([])}>Remove All</button>
          </> :""}
          </div>
    
         
        </div>
      </div>
  
      {/*-------------- About Location ---------------------------------------------*/}
      <div>
        <h3>About Location</h3>
        <div>
          <div>
           
            <form autoComplete="off" onSubmit={handleLocationSubmit}>
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
                <button type="submit" >
              ADD
            </button>
                </form>
          </div>

          
          <div>
          {(locationList.length>0)? 
          <>
            <div >
              <table >
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>FeatureName</th>
                    <th>FeatureDistance</th>
                    <th>delete</th>
                  </tr>
                </thead>
                <tbody>
                {locationList.map(featureLocation=>(
        
        <tr key={featureLocation.featureId}>
            <td>{featureLocation.feature}</td>
            <td>{featureLocation.featureName}</td>
            <td>{featureLocation.featureDistance}</td>
            <td >
                <button onClick={()=>deletefeatureLocation(featureLocation.featureName)}>delete</button>
            </td>           
        </tr>     
    ))  }
                  
                </tbody> 
              </table>
            </div>
            <button 
            onClick={()=>setLocationList([])}>Remove All</button>
          </> :""}
          </div>
        </div>
      </div>
      {console.log(propertiesPricingList)}
      {console.log(locationList)}
  
      {/*------------- ABout Amenities--------------------------------------------- */}
      <div>
        <h3>About Amenities</h3>
        <AboutAmenities/>
      </div>
  
      {/*--------------------- about B/cp------------------------------------------ */}
  
      <div>
        <h3>About B/cp</h3>
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
        {active ==='second' &&
         <div>
          <h6>Name</h6>
          <div>
            <input type='text' value = {ownerName} onChange={e=>setOwnerName(e.target.value)}/>
          </div>
        </div>
        }
        {active ==='first' &&
         <div>
          <h6>Organisation Name</h6>
          <div>
            <input type='text' value = {organisatioName} onChange={e=>setOrganisatioName(e.target.value)}/>
          </div>
        </div>
        }
        
        <div>
        <div>
          <h6>E-mail</h6>
          <div>
          <input type='email' value = {ownerEmail} onChange={e=>setOwnerEmail(e.target.value)}/> 
          </div>
        </div>
        <div>
          <h6>Website</h6>
          <div>
          <input type='text' value = {ownerWebsite} onChange={e=>setOwnerWebsite(e.target.value)}/>
          </div>
        </div>
        <div>
          <h6>Contact No.</h6>
          <div>
          <input type='number' value = {ownerContactNo} onChange={e=>setOwnerContactNo(e.target.value)}/>
          </div>
        </div>
       {active === 'first' &&
       <>
        <div>
          <h6>Project</h6>
          <div>
          <input type='text' value = {ownerProject} onChange={e=>setOwnerProject(e.target.value)}/>
          </div>
        </div>
        <div>
          <h6>Year Of Establishment</h6>
          <div>
          <input type='text' value = {ownerEstablishment} onChange={e=>setOwnerEstablishment(e.target.value)}/>
          </div>
        </div>
        </>
       }
  
  {active==='second' && 
        <>
         <div>
          <h6>Since Operation</h6>
          <div>
          <input type='text' value = {sinceOperation} onChange={e=>setSinceOpertaion(e.target.value)}/>
          </div>
        </div>
  
        <div>
          <h6>Property List</h6>
          <div>
          <input type='text' value = {ownerPropertyList} onChange={e=>setOwnerPropertyList(e.target.value)}/>
          </div>
        </div>
        </>}
       
        </div>
  
  
  
  
        <div>
          <h6>Address</h6>
          <div>
          <input type='text' value = {ownerAddress} onChange={e=>setOwnerAddress(e.target.value)}/>
          </div>
        </div>
  
        <div>
          <h6>Bio</h6>
          <div>
            <TextEditor initialValue="" getValue={getBio}/>
          </div>
        </div>
  
      </div>
  
      {/* ----------------------buttons--------------------------------------------- */}
      <div>
      <button onClick={handleDraftsProperties}>Draft</button>
      <button onClick={handlSubmission}>Submit for Review</button>
      </div>
  
      </>
    )
  }
  
  export default AddProperty