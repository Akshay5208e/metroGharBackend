import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from '../../independentComponents/textEditor/TextEditor';
import AboutAmenities from './subComponent/AboutAmenities'
import {storage} from '../../../backend/firebase/utils'
import { fetchProductStart,fetchProductsStart,addProductStart } from '../../../backend/redux/products/products.actions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {BasicAmenitiesData, ConvenienceAmenitiesData, EnvironmentAmenitiesData, SecurityAmenitiesData, SportsAmenitiesData} from './amenitiesData/AmenitiesData'
import Select from 'react-select'
import "./style.css"
import { height } from '@mui/system';
import Navbar from '../../independentComponents/Navbar';
import { FormLabel, InputBase, InputLabel } from '@mui/material';
import { firestore } from '../../../backend/firebase/utils';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { configurationOptions, featureOptions, maxPriceAbbOptions, minPriceAbbOptions, positionOptions, statusOptions, typeOptions } from './options';
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


const StyledButton = styled(Button)({
  padding: "5px 10px",
  background: "#FFF",
  borderRadius: "3px",
  fontSize: "10px",
  lineHeight: "12px",
  color: "#000",
  textTransform: "capitalize"
})

const StyledInputLabel = styled(InputLabel)({
  fontSize: "10px",
  lineHeight: "12px",
  fontWeight: "600",
  marginBottom: "3px"
})

const StyledInputBase = styled(InputBase)({
  border: "0.5px solid #E5E5E5",
  height: "25px"
})
 

function AddProperty() {

  const {currentUser} = useSelector(mapState);
  const history = useHistory();
  



   
  const getPostedBy = ()=>{
    if(currentUser){
      return currentUser.displayName;
    }
     return 'no user'
  }





  //-----------------------global States---------------------------------------------//
  
  const [propertyApproval, setPropertyApproval] = useState(false)
  //  const [propertyApproval1, setPropertyApproval1] = useState("Pending")
  const [isSubmitted, setIsSubmitted] = useState(true)
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
    setminSpace(0)
    setmaxSpace(0)
    setType('')
    setPrice1(0)
    setPrice2(0)
    setminPriceAbb('')
    setmaxPriceAbb('')
    setminPriceAmount(0)
    setmaxPriceAmount(0)
    setMainImageUrls([])  
    

    setSize('')
    setAboutPrice('')
    setTowerUnit('')
    setConfiguration([])
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

      tempId: Math.floor(Date.now() * Math.random()+ Math.random()*Math.random()),
      postedBy,
      propertyApproval,
      isSubmitted,

      //basic info
      propertyName,
      location,
      position,
      minspace,
      maxspace,
      type,
      minPriceAmount,
      maxPriceAmount,
      minPriceAbb,
      maxPriceAbb,
      price1,
      price2,
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

    // history.push('/')
    setTimeout(function(){history.push('/')},1000)
  
  }


  
  
  
  
  //--------------------submission for reveiew---------------------------------//
  const handlSubmission = (e)=>{
    
    e.preventDefault();
    

    let property={
      tempId: Math.floor(Math.random()* 1000000000000000+1),
      postedBy,
      createdAt: new Date() ,
      propertyApproval,
      isSubmitted,

      //basic info
      propertyName,
      location,
      position,
      minspace,
      maxspace,
      type,
      minPriceAmount,
      maxPriceAmount,
      minPriceAbb,
      maxPriceAbb,
      price1,
      price2,
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
      };
     
      firestore.collection('properties').doc().set(property);
    //   try {
    //     firestore.collection().doc().set(property)
    //   } catch (error) {
    //       console.log
    //   }
    resetForm();
    history.push('/')
   }

  
  //saving Data to local Storage
  useEffect(()=>{

    localStorage.setItem('draftProperties',JSON.stringify(draftProperties));

  },[draftProperties])



  
  //-----------------------basic info states and functions------------------------------------------------------//
  const [propertyName, setPropertyName] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("")
  const [minspace, setminSpace] = useState(0)
  const [maxspace, setmaxSpace] = useState(0)
  const [type, setType] = useState("")

  const handleminSpace=(e)=>{
    const mis= parseFloat(e.target.value);
    setminSpace(mis)
  }
  const handlemaxSpace=(e)=>{
    const mas=parseFloat(e.target.value)
    setmaxSpace(mas)
  }

  const [price1, setPrice1] = useState(0)
  const [price2, setPrice2] = useState(0)
  const [minPriceAbb, setminPriceAbb] = useState("")
  const [maxPriceAbb, setmaxPriceAbb] = useState("")
  const [maxPriceAmount, setmaxPriceAmount] = useState(0)
  const [minPriceAmount, setminPriceAmount] = useState(0)
  

  const   [mainImages, setMainImages] = useState([]);
    const [mainImageUrls, setMainImageUrls] = useState([]);
    const [mainImagesProgress, setMainImagesProgress] = useState(0);
  
useEffect(() => {
  setminPriceAmount(minPriceAbb === "L."? price1*100000 : (minPriceAbb==="Cr."? price1*10000000:price1*0))
}, [price1,minPriceAbb])
useEffect(() => {
  setmaxPriceAmount(maxPriceAbb === "L."? price2*100000 : (maxPriceAbb === "Cr."?price2*10000000: price2*0))
}, [price2,maxPriceAbb])

    const handleMinPriceChange =(e)=>{

      setPrice1(e.target.value)
    }

    const handleMinPriceAbbChange=(e)=>{
      setminPriceAbb(e.target.value)
    }
    const handleMaxPriceChange=(e)=>{
      setPrice2(e.target.value)
    }
    const handleMaxPriceAbbChange=(e)=>{
      setmaxPriceAbb(e.target.value)
    }
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

  const deleteMainImagefromFirebase=(url)=>{
    let pictureRef = storage.refFromURL(url);
    //2.
     pictureRef.delete()
     .then(() => {
      //3.
      setMainImageUrls(mainImageUrls.filter((image) => image !== url));
      alert("Picture is deleted successfully!");
    })

    
  }
  //--------------------------About porject info states and functions----------------------------------------------//
 
  const [size, setSize] = useState("")
  const [aboutPrice, setAboutPrice] = useState("")
  const [towerUnit, setTowerUnit] = useState("")
  const [configuration, setConfiguration] = useState([])
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

  const handleConfigurationChange=(val)=>{
    setConfiguration(val)
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


  const handleBasicAmenitiesChange=(val)=>{
    setBasicAmenities(val)
  }

  const handleConvenienceAmenitiesChange=(val)=>{
    setConvenienceAmenities(val)
  }

  const handleEnvironmentAmenitiesChange=(val)=>{
    setenvironmentAmenities(val)
  }

  const handleSportsAmenitiesChange=(val)=>{
    setSportsAmenities(val)
  }

  const handleSecurityAmenitiesChange=(val)=>{
    setSecurityAmenities(val)
  }


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

 

    const [basicInfo,setBasicInfo] = useState(false);
    const [aboutProjectD,setAboutProjectD] = useState(false);
    const [aboutPriceD,setAboutPriceD] = useState(false);
    const [aboutLocationD,setAboutLocationD] = useState(false);
    const [aboutAmenitiesD,setAboutAmenitiesD] = useState(false);
    const [aboutBCPD,setAboutBCPD] = useState(false);


    const customStyles = {
      control: ()=>({
        height: "25px",
        border: "1px solid #e5e5e5",
        display: "flex",
        fontSize: "12px",

      }),
    }

    return (
      <>
      <Navbar />
      <div className="addPropBox">
        <p className="text-center  fs-2 mb-3">Add New Property</p>
      {/*------- basic Info Section ------------------------------------------------*/}
      <div>
        <div className="blockBox mb-1" onClick={()=>{
          (basicInfo) ? setBasicInfo(false) : setBasicInfo(true)          
          }} >
          <p>Basic Info</p>
          <KeyboardArrowDownIcon sx={{height: "14px"}} />
        </div>
      <div style={basicInfo ? {display: "block",padding: "14px"}: {display: "none"}}>
        <div className="row gx-4">
          <div className="col-6">
            <StyledInputLabel>Property Name</StyledInputLabel>
            <StyledInputBase type = "text" value={propertyName} onChange={e=>setPropertyName(e.target.value)}  />
          </div>
          <div className="col-6">
            <StyledInputLabel>Location</StyledInputLabel>
            <StyledInputBase type = "text" value={location} onChange={e=>setLocation(e.target.value)}  />
          </div>
        </div>
        <div className="row gx-4 my-3">
          <div className="col-6">
            <StyledInputLabel>Position</StyledInputLabel>
            
            <select className='selectBox' value={position} onChange={e=>setPosition(e.target.value)} >
            {positionOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
          
          </div>
          <div className="col-6">
            <StyledInputLabel>Type</StyledInputLabel>
            {/* <StyledInputBase type = "text" value={type} onChange={e=>setType(e.target.value)}  /> */}
            <select value={type} onChange={e=>setType(e.target.value)} className="selectBox" >
            {typeOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
           
          </div>
          <div className="col-6 mt-3">
            <StyledInputLabel>Min Space (sqft) </StyledInputLabel>
            <StyledInputBase type = "number"  value={minspace} onChange={handleminSpace}  style={{width:"80px"}} />
          </div>
          <div className="col-6 mt-3">
            <StyledInputLabel>Max Space (sqft)</StyledInputLabel>
            <StyledInputBase type = "number"  value={maxspace} onChange={handlemaxSpace}  style={{width:"80px"}} />
          </div>
          
        </div>
        <div className='row gx-4'>
          <div className='col-6 mb-3'>
            <StyledInputLabel>Min Price</StyledInputLabel>
            <div className='d-flex '>
            <StyledInputBase type = "number" value={price1} onChange={handleMinPriceChange} />
            <select value={minPriceAbb} onChange={handleMinPriceAbbChange} className="selectBox" style={{width: "40px"}} >
            {minPriceAbbOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
            </div>
            
          

          </div>   
          <div className='col-6'>
            <StyledInputLabel> Max Price</StyledInputLabel>
            <div className='d-flex'>
            <StyledInputBase type = "number" value={price2} onChange={handleMaxPriceChange}  />
            <select value={maxPriceAbb} onChange={handleMaxPriceAbbChange}  className="selectBox" style={{width: "40px"}}>
            {maxPriceAbbOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
            </div>
            
        
          </div>      
          <div className='col-8'>
            <StyledInputLabel>Property Image</StyledInputLabel>
            <input type = "file"  onChange={handleMainImagesChange} multiple />
          </div>
          <div className="col-2">
            <StyledButton sx={{border: "1px solid #000",marginTop: "20px"}} onClick={handleMainImagesUpload}>Upload</StyledButton>
          </div>
        </div>
        <br/>
        {/* {mainImageUrls.map((url, i) => (
        <div key={i}>
          <a href=\target="_blank">
            {url}
          </a>
        </div>
      ))} */}
      <div className='w-100 d-flex' style={{overflowX: 'scroll'}}>
      {mainImageUrls.length>0 && mainImageUrls.map((url,i)=>(
        <div className='position-relative mx-1'>
          <img src={url} style={{height:"50px", width:"auto"}}/>
          <CancelOutlinedIcon  onClick={()=>deleteMainImagefromFirebase(url)} sx={{position: "absolute",right: "0",fontSize: "12px"}} />
        </div>
      ))}
      </div>

      </div>
        </div>
      {/* ----------About Project Section ------------------------------------------*/}
      <div>
        <div className="blockBox mb-1" onClick={()=>{
          (aboutProjectD) ? setAboutProjectD(false) : setAboutProjectD(true)          
          }} >
          <p>About Project</p>
          <KeyboardArrowDownIcon  sx={{height: "14px"}} />
        </div>
        <div style={aboutProjectD ? {display: "block",padding: "14px"}: {display: "none"}}>
        <div>
          <StyledInputLabel>About Property:</StyledInputLabel>
          <TextEditor initialValue=" " getValue={getPropertyInfo}/>
        </div>
        <div className='my-3'>
          <StyledInputLabel>Property Overview:</StyledInputLabel>
          <div>
            <div className='row gx-4 my-3'>
              <div className='col-4'>
                <StyledInputLabel>Size</StyledInputLabel>
                <StyledInputBase type='text' value={size} onChange={e=>setSize(e.target.value)}/>
              </div>
              <div className='col-4'>
                <StyledInputLabel>Price</StyledInputLabel>
                <StyledInputBase type='text' value={aboutPrice} onChange={e=>setAboutPrice(e.target.value)}/>
              </div>
              <div className='col-4'>
                <StyledInputLabel>Tower unit</StyledInputLabel>
                <StyledInputBase type='text' value={towerUnit} onChange={e=>setTowerUnit(e.target.value)}/>
              </div>
            </div>
            <div className='row gx-4'>
              <div className='col-4'>
                <StyledInputLabel>Status</StyledInputLabel>
                {/* <StyledInputBase type='text' value={status} onChange={e=>setStatus(e.target.value)}/> */}
                <select onChange={e=>setStatus(e.target.value)} className="selectBox" >
                  {statusOptions.map((option, index) => {
                  const { value, name } = option;
  
               return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
              </div>
              <div className='col-4'>
                <StyledInputLabel>Configuration</StyledInputLabel>
                {/* <StyledInputBase type='text' value={configuration} onChange={e=>setConfiguration(e.target.value)}/> */}
                <Select styles={customStyles} options={configurationOptions} displayValue="label" onChange={handleConfigurationChange} isMulti/>
              </div>
              <div className='col-4'>
                <StyledInputLabel>RERA ID</StyledInputLabel>
                <StyledInputBase type='text' value={reraId} onChange={e=>setReraId(e.target.value)}/>
              </div>
            </div>
            <div className='mt-3'>
              <StyledInputLabel>Specification:</StyledInputLabel>
              <TextEditor initialValue="" getValue={getSpecification}/>
            </div>
          </div>
        </div>
        </div>
      </div>
  
      {/*----------- About Pricing------------------------------------------------- */}
      <div>
        <div className="blockBox mb-1" onClick={()=>{
          (aboutPriceD) ? setAboutPriceD(false) : setAboutPriceD(true)          
          }} >
          <p>About Pricing</p>
          <KeyboardArrowDownIcon sx={{height: "14px"}}  />
        </div>
        <div style={aboutPriceD ? {display: "block",padding: "14px"}: {display: "none"}}>
         {/* <AboutPricing getPricingValue = {getPropertiesPricingList}/> */}
         <div>
          <form className='row gx-2' autoComplete="off" onSubmit={handlePricingSubmit}>
            <div className='col-3'>
              <StyledInputLabel>Type of Apartment</StyledInputLabel>
              <StyledInputBase type = 'text'  value ={apartmentType} onChange={e=>setApartmentType(e.target.value)}/>
            </div>
            <div className='col-2'>
              <StyledInputLabel>Space</StyledInputLabel>
              <StyledInputBase type = 'text' value ={apartmentSpace} onChange={e=>setApartmentSpace(e.target.value)}/>
            </div>
            <div className='col-2'>
              <StyledInputLabel>Per Sq. ft Price</StyledInputLabel>
              <StyledInputBase type = 'text'  value ={unitPrice} onChange={e=>setUnitPrice(e.target.value)}/>
            </div>
            <div className='col-2'>
              <StyledInputLabel>Total Price</StyledInputLabel>
              <StyledInputBase type = 'text'  value ={totalPrice} onChange={e=>setTotalPrice(e.target.value)}/>
            </div>
            <div className='col-2'>
              <StyledInputLabel>Image</StyledInputLabel>
              <StyledInputBase type = 'file' onChange={handlePricingImageChange}/>
              <StyledButton sx={{border: "1px solid #000"}} onClick={handlePricingImageUpload}>Upload</StyledButton>
            </div>
            <div className='col-1 mt-2'>
              <IconButton type="submit" ><AddCircleOutlineIcon /></IconButton>
            </div>            
          </form>
        </div>
      <StyledInputLabel>View Pricing</StyledInputLabel>
      <div>
          {(propertiesPricingList.length>0)? 
          <>
            <div >
              <table className='border w-100' >
                <thead>
                  <tr>
                    <th style={{fontSize: "10px"}}>Type of Apartment</th>
                    <th style={{fontSize: "10px"}}>Space</th>
                    <th style={{fontSize: "10px"}}> Per Sq. ft Price</th>
                    <th style={{fontSize: "10px"}}>Total Price</th>
                    <th style={{fontSize: "10px"}}>View Image</th>
                    <th style={{fontSize: "10px"}}> Delete</th>
                  </tr>
                </thead>
                <tbody>
                {propertiesPricingList.map(typePricing=>(
        
        <tr key={typePricing.apartmentType}>
            <td style={{fontSize: "8px"}}>{typePricing.apartmentType}</td>
            <td style={{fontSize: "8px"}}>{typePricing.apartmentSpace}</td>
            <td style={{fontSize: "8px"}}>{typePricing.unitPrice}</td>
            <td style={{fontSize: "8px"}}>{typePricing.totalPrice}</td>
            <td style={{fontSize: "8px"}}>{typePricing.pricingImageUrl}</td>
           
            <td>
                <CancelOutlinedIcon onClick={()=>deletePricing(typePricing.apartmentType)} />
            </td>           
        </tr>     
    ))  }
                  
                </tbody> 
              </table>
            </div>
            <div className='d-flex justify-content-center'>
            <StyledButton  sx={{border: "1px solid #000"}}
            onClick={()=>setPropertiesPricingList([])}>Remove All</StyledButton>
            </div>
            
          </> :""}
          </div>
    
         
        </div>
      </div>
  
      {/*-------------- About Location ---------------------------------------------*/}
      <div>
        <div className="blockBox mb-1" onClick={()=>{
          (aboutLocationD) ? setAboutLocationD(false) : setAboutLocationD(true)          
          }} >
          <p>About Location</p>
          <KeyboardArrowDownIcon sx={{height: "14px"}}  />
        </div>
        <div style={aboutLocationD ? {display: "block",padding: "14px"}: {display: "none"}}>
          <div>           
            <form autoComplete="off" className='row gx-3' onSubmit={handleLocationSubmit}>
              <div className='col-4'>
                <StyledInputLabel>Feature</StyledInputLabel>
                {/* <StyledInputBase type = 'text' value={feature} onChange={e=>setFeature(e.target.value)}/> */}
                <select className='selectBox' value={feature} onChange={e=>setFeature(e.target.value)} >
                  {featureOptions.map((option, index) => {
                  const { value, name } = option;
  
               return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>

              </div>
              <div className='col-4'>
                <StyledInputLabel>Name of Feature</StyledInputLabel>
                <StyledInputBase type = 'text' value={featureName} onChange={e=>setFeatureName(e.target.value)}/>
              </div>
              <div className='col-3'>
                <StyledInputLabel>Distance</StyledInputLabel>
                <StyledInputBase type = 'number' value={featureDistance} onChange={e=>setFeatureDistance(e.target.value)}/>
              </div>
              <IconButton className='col-1 mt-2' type="submit" ><AddCircleOutlineIcon /></IconButton>
            </form>
          </div>

          
          <div>
          {(locationList.length>0)? 
          <>
            <div >
              <table className='w-100 border'>
                <thead>
                  <tr>
                    <th style={{fontSize: "12px"}}>Feature</th>
                    <th style={{fontSize: "12px"}}>FeatureName</th>
                    <th style={{fontSize: "12px"}}>FeatureDistance</th>
                    <th style={{fontSize: "12px"}}>delete</th>
                  </tr>
                </thead>
                <tbody>
                {locationList.map(featureLocation=>(
        
        <tr key={featureLocation.featureId}>
            <td style={{fontSize: "10px"}}>{featureLocation.feature}</td>
            <td style={{fontSize: "10px"}}>{featureLocation.featureName}</td>
            <td style={{fontSize: "10px"}}>{featureLocation.featureDistance}</td>
            <td style={{fontSize: "10px"}} >
                <CancelOutlinedIcon  onClick={()=>deletefeatureLocation(featureLocation.featureName)} />
            </td>           
        </tr>     
    ))  }
                  
                </tbody> 
              </table>
            </div>
            <div className='d-flex justify-content-center mt-3'>
            <StyledButton sx={{border: "1px solid #000"}}
            onClick={()=>setLocationList([])}>Remove All</StyledButton>
            </div>
            
          </> :""}
          </div>
        </div>
      </div>
      {/* {console.log(propertiesPricingList)}
      {console.log(locationList)} */}
  
      {/*------------- ABout Amenities--------------------------------------------- */}
      <div>
        <div className="blockBox mb-1" onClick={()=>{
          (aboutAmenitiesD) ? setAboutAmenitiesD(false) : setAboutAmenitiesD(true)          
          }} >
          <p>About Amenities</p>
          <KeyboardArrowDownIcon sx={{height: "14px"}}  />
        </div>
        <div style={aboutAmenitiesD ? {display: "block",padding: "14px"}: {display: "none"}}>
        <div >
          <StyledInputLabel>Basic Amenities</StyledInputLabel>
          <Select  options={BasicAmenitiesData} displayValue="label" onChange={handleBasicAmenitiesChange} isMulti/>
        </div>
        <div className='my-3'>
          <StyledInputLabel>Convenience Amenities</StyledInputLabel>
          <Select  options={ConvenienceAmenitiesData} displayValue="label" onChange={handleConvenienceAmenitiesChange} isMulti/>
          {/* {console.log(convenienceAmenities)} */}
        </div>
        <div className='my-3'>
          <StyledInputLabel>Environment Amenities</StyledInputLabel>
          <Select  options={EnvironmentAmenitiesData} displayValue="label" onChange={handleEnvironmentAmenitiesChange} isMulti/>
          {/* {console.log(environmentAmenities)} */}
        </div>
        <div className='my-3'>
          <StyledInputLabel>Sports Amenities</StyledInputLabel>
          <Select  options={SportsAmenitiesData} displayValue="label" onChange={handleSportsAmenitiesChange} isMulti/>
          {/* {console.log(sportsAmenities)} */}
        </div>
        <div>
          <StyledInputLabel>Security Amenities</StyledInputLabel>
          <Select  options={SecurityAmenitiesData} displayValue="label" onChange={handleSecurityAmenitiesChange} isMulti/>
          {/* {console.log(securityAmenities)} */}
        </div>
        </div>
      </div>
  
      {/*--------------------- about B/cp------------------------------------------ */}
  
      <div>
        <div className="blockBox mb-1" onClick={()=>{
          (aboutBCPD) ? setAboutBCPD(false) : setAboutBCPD(true)          
          }} >
          <p>About B/CP</p>
          <KeyboardArrowDownIcon sx={{height: "14px"}}  />
        </div>
        <div style={aboutBCPD ? {display: "block",padding: "14px"}: {display: "none"}}>
          <div>
            <StyledInputLabel>Property Owner</StyledInputLabel>
            <div>
              <select className='selectBox w-25' onChange={ handleOwnerChange}>
              {options.map((option, index) => {
              const { value, name } = option;
    
              return (
                <option key={index} value={value}>{name}</option>
              );
            })}
            </select>
          </div> 
          </div>
          <div className='row gx-4 my-3'>
            {active ==='second' &&
            <div className='col-4'>
              <StyledInputLabel>Name</StyledInputLabel>
              <StyledInputBase type='text' value = {ownerName} onChange={e=>setOwnerName(e.target.value)}/>
            </div>
            }
            {active ==='first' &&
              <div className='col-4'>
                <StyledInputLabel>Organisation Name</StyledInputLabel>
                <StyledInputBase type='text' value = {organisatioName} onChange={e=>setOrganisatioName(e.target.value)}/>
              </div>
            }     
            <div className='col-4'>
              <StyledInputLabel>Email</StyledInputLabel>
              <StyledInputBase type='email' value = {ownerEmail} onChange={e=>setOwnerEmail(e.target.value)}/>
            </div>
            <div className='col-4'>
              <StyledInputLabel>Website</StyledInputLabel>
              <StyledInputBase type='text' value = {ownerWebsite} onChange={e=>setOwnerWebsite(e.target.value)}/>
            </div>
          </div>
          <div  className='row gx-4 '>
            <div className='col-4'>
              <StyledInputLabel>Contact No.</StyledInputLabel>
              <StyledInputBase type='number' value = {ownerContactNo} onChange={e=>setOwnerContactNo(e.target.value)}/>
            </div>
          {active === 'first' &&
          <>
            <div className='col-4'>
              <StyledInputLabel>Project</StyledInputLabel>
              <StyledInputBase type='text' value = {ownerProject} onChange={e=>setOwnerProject(e.target.value)}/>
            </div>
            <div className='col-4'>
              <StyledInputLabel>Year Of Establishment</StyledInputLabel>
              <StyledInputBase type='text' value = {ownerEstablishment} onChange={e=>setOwnerEstablishment(e.target.value)}/>
            </div>
            </>
          }
      
          {active==='second' && 
            <>
            <div className='col-4'>
              <StyledInputLabel>Since Operation</StyledInputLabel>
              <StyledInputBase type='text' value = {sinceOperation} onChange={e=>setSinceOpertaion(e.target.value)}/>
            </div>    
            <div className='col-4'>
              <StyledInputLabel>Property List</StyledInputLabel>
              <StyledInputBase type='text' value = {ownerPropertyList} onChange={e=>setOwnerPropertyList(e.target.value)}/>
            </div>
            </>}
          </div>  
          <div className='row my-3 mx-1'>
            <StyledInputLabel>Address</StyledInputLabel>
            <StyledInputBase type='text' value = {ownerAddress} onChange={e=>setOwnerAddress(e.target.value)}/>
          </div>
          <div  className='row my-3'>
            <StyledInputLabel className='mx-3'>Bio</StyledInputLabel>
            <TextEditor initialValue="" getValue={getBio}/>
          </div>
       </div>
      </div>
  
      {/* ----------------------buttons--------------------------------------------- */}
      <div className="mt-4 d-flex justify-content-around">
        <StyledButton sx={{border: "1px solid #1ADDFF"}} onClick={handleDraftsProperties}>Draft</StyledButton>
        <StyledButton sx={{border: "1px solid #FEAA7B"}} onClick={handlSubmission}>Submit for Review</StyledButton>
      </div>
  
      </div>
      </>
    )
  }
  
  export default AddProperty