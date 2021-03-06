import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from '../../independentComponents/textEditor/TextEditor';

import {storage} from '../../../backend/firebase/utils'
import { fetchProductStart,fetchProductsStart,addProductStart } from '../../../backend/redux/products/products.actions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles'

import {BasicAmenitiesData, ConvenienceAmenitiesData, EnvironmentAmenitiesData, SecurityAmenitiesData, SportsAmenitiesData} from '../addProperty/amenitiesData/AmenitiesData'
import Select from 'react-select'
import "./../addProperty/style.css"
import { height } from '@mui/system';
import Navbar from '../../independentComponents/Navbar';
import { FormLabel, InputBase, InputLabel } from '@mui/material';
import { firestore } from '../../../backend/firebase/utils';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { configurationOptions, featureOptions, maxPriceAbbOptions, minPriceAbbOptions, positionOptions, statusOptions, typeOptions } from '../addProperty/options';
const getDataFromLocalStorage = ()=>{
  const data = localStorage.getItem('draftProperties');
  if(data){
    return JSON.parse(data);
  }
  else{
    return([])
  }
}


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

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

const productsMapState = ({ productsData }) => ({
  products: productsData.products
});

function DraftEdit() {

    const {currentUser} = useSelector(mapState)
  
  
  const {tempId}  = useParams();
    console.log(tempId)

    const history = useHistory();
    const propertyTempId= parseFloat(tempId)
 

 

   
  const getPostedBy = ()=>{
    if(currentUser){
      return currentUser.displayName;
    }
     return 'no user'
  }





  //-----------------------global States---------------------------------------------//
  
  const [propertyApproval, setPropertyApproval] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(true)
  const [submitError, setsubmitError] = useState("")
  const [postedBy, setPostedBy] = useState("")
  const [pId, setPId] = useState()
  
  


  useEffect(() => {
    if(currentUser)
    setPostedBy(currentUser.displayName)

  }, [currentUser]);

  //-----------------main array of objects in local storage----------------------------//
  const [draftProperties, setDraftProperties] = useState(getDataFromLocalStorage());
  const [draftPrpoertyIdSelection, setDraftPrpoertyIdSelection] = useState('');


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

      tempId: tempId,
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
      ownerBio
      }

    setDraftProperties([...draftProperties,draftProperty])

    //reseeting form 

    resetForm();
  
  }

  const handleDraftsPropertiesChange=(e)=>{
    setDraftProperties(
      draftProperties.map((elemProperty)=>{
        if(elemProperty.tempId===draftPrpoertyIdSelection)
        {
            return {...elemProperty,
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
              ownerBio}
        }
        return elemProperty
      })
  
      
    )
    setDraftPrpoertyIdSelection('')
    resetForm();

    setTimeout(function(){history.push('/')},1000)
  
    }
  const handleDraftsPropertiesChangeStart=(tempId)=>{
      let newEditProperty = draftProperties.find((elemProperty)=>{
          return elemProperty.tempId===tempId
      });
    //   console.log(draftProperties)
    //  console.log(newEditProperty);

     setPropertyName(newEditProperty.propertyName)
     setLocation(newEditProperty.location)
     setPosition(newEditProperty.position)
     setminSpace(newEditProperty.minspace)
     setmaxSpace(newEditProperty.maxspace)
     setType(newEditProperty.type)
     setPrice1(newEditProperty.price1)
    setPrice2(newEditProperty.price2)
    setminPriceAbb(newEditProperty.minPriceAbb)
    setmaxPriceAbb(newEditProperty.maxPriceAbb)
    setminPriceAmount(newEditProperty.minPriceAmount)
    setmaxPriceAmount(newEditProperty.maxPriceAmount)
     setMainImageUrls(newEditProperty.mainImageUrls)  
     
 
     setSize(newEditProperty.size)
     setAboutPrice(newEditProperty.aboutPrice)
     setTowerUnit(newEditProperty.towerUnit)
     setConfiguration(newEditProperty.configuration)
     setReraId(newEditProperty.reraId)
     setStatus(newEditProperty.status)
     setAboutProject(newEditProperty.aboutProject)
     setSpecifications(newEditProperty.specification)
 
     setPropertiesPricingList(newEditProperty.propertiesPricingList)
     setLocationList(newEditProperty.locationList)
 
     setBasicAmenities(newEditProperty.basicAmenities)
     setConvenienceAmenities(newEditProperty.convenienceAmenities)
     setenvironmentAmenities(newEditProperty.environmentAmenities)
     setSecurityAmenities(newEditProperty.securityAmenities)
     setSportsAmenities(newEditProperty.sportsAmenities)  
     
     setBcpCategory(newEditProperty.bcpCategory)
     setOrganisatioName(newEditProperty.organisatioName)
     setOwnerName(newEditProperty.ownerName)
     setOwnerEmail(newEditProperty.ownerEmail)
     setOwnerWebsite(newEditProperty.ownerWebsite)
     setOwnerContactNo(newEditProperty.ownerContactNo)
     setOwnerAddress(newEditProperty.ownerAddress)
     setOwnerProject(newEditProperty.ownerProject)
     setOwnerEstablishment(newEditProperty.ownerEstablishment)
     setSinceOpertaion(newEditProperty.sinceOperation)
     setOwnerPropertyList(newEditProperty.ownerPropertyList)
     setOwnerBio(newEditProperty.ownerBio)
      

     setDraftPrpoertyIdSelection(tempId)

    }

 

    const DeleteDraftProperty=(tempId)=>{
      const filteredDraftsProperties=draftProperties.filter((element,index)=>{
        return element.tempId !== tempId
      })
      setDraftProperties(filteredDraftsProperties);
    }

  useEffect(()=>{

    localStorage.setItem('draftProperties',JSON.stringify(draftProperties));

  },[draftProperties])

  //--------------------submission for reveiew---------------------------------//
  
    
    const handlSubmission = (e)=>{
    
      e.preventDefault();
      
  
      let property={
        tempId: tempId,
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
      DeleteDraftProperty(tempId);
      history.push('/')
     }
  
   

  
  //saving Data to local Storage
  useEffect(()=>{

    localStorage.setItem('draftProperties',JSON.stringify(draftProperties));

  },[draftProperties])



  
  //-----------------------basic info states and functions------------------------------------------------------//
  const [propertyName, setPropertyName] = useState(tempId.propertyName);
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [minspace, setminSpace] = useState(0);
  const [maxspace, setmaxSpace] = useState(0);

  const handleminSpace=(e)=>{
    const mis= parseFloat(e.target.value);
    setminSpace(mis)
  }
  const handlemaxSpace=(e)=>{
    const mas=parseFloat(e.target.value)
    setmaxSpace(mas)
  }
  
  const [type, setType] = useState("")
  const [price1, setPrice1] = useState(0)
  const [price2, setPrice2] = useState(0)
  const [minPriceAbb, setminPriceAbb] = useState("")
  const [maxPriceAbb, setmaxPriceAbb] = useState("")
  const [maxPriceAmount, setmaxPriceAmount] = useState(0)
  const [minPriceAmount, setminPriceAmount] = useState(0)

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

  const handleConfigurationChange=(val)=>{
    setConfiguration(val)
  }

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
  
    useEffect(() => {
      handleDraftsPropertiesChangeStart(propertyTempId)
    }, [])
    
  
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

    // ;
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
          <div className="col-4">
            <StyledInputLabel>Position</StyledInputLabel>
            <StyledInputBase type = "text" value={position} onChange={e=>setPosition(e.target.value)}  />
            {/* <select value={position} onChange={e=>setPosition(e.target.value)} >
                  {positionOptions.map((option, index) => {
                  const { value, name } = option;
  
               return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select> */}
          
          <select value={position} onChange={e=>setPosition(e.target.value)} >
            {positionOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
          
          </div>
          <div className="col-4">
            <StyledInputLabel>Minimum Space </StyledInputLabel>
            <StyledInputBase type = "number"  value={minspace} onChange={handleminSpace}  style={{width:"80px"}} /> Sq.Ft
          </div>
          <div className="col-4">
            <StyledInputLabel>Maximum Space </StyledInputLabel>
            <StyledInputBase type = "number"  value={maxspace} onChange={handlemaxSpace}  style={{width:"80px"}} /> Sq.Ft
          </div>
          <div className="col-4">
            <StyledInputLabel>Type</StyledInputLabel>
            {/* <StyledInputBase type = "text" value={type} onChange={e=>setType(e.target.value)}  /> */}
            <select value={type} onChange={e=>setType(e.target.value)} >
            {typeOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
           
          </div>
        </div>
        <div className='row gx-4'>
          <div className='col-4'>
            <StyledInputLabel>Min Price</StyledInputLabel>
            <StyledInputBase type = "number" value={price1} onChange={handleMinPriceChange}  />
            <select value={minPriceAbb} onChange={handleMinPriceAbbChange} >
            {minPriceAbbOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
          

          </div>   
          <div className='col-4'>
            <StyledInputLabel> Max Price</StyledInputLabel>
            <StyledInputBase type = "number" value={price2} onChange={handleMaxPriceChange}  />
            <select value={maxPriceAbb} onChange={handleMaxPriceAbbChange} >
            {maxPriceAbbOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
        
          </div>      
          <div className='col-4'>
            <StyledInputLabel>Property Image</StyledInputLabel>
            <StyledInputBase type = "file"  onChange={handleMainImagesChange} multiple/>
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
       {mainImageUrls.length>0 && mainImageUrls.map((url,i)=>(
    <div>
      <img src={url} style={{height:"100px", width:"auto"}}/>
      <button onClick={()=>deleteMainImagefromFirebase(url)}>Delete</button>
    </div>
  ))}
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
          <TextEditor initialValue={aboutProject} getValue={getPropertyInfo}/>
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
                <select onChange={e=>setStatus(e.target.value)} >
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
                <Select  options={configurationOptions}  value={configuration}displayValue="label" onChange={handleConfigurationChange} isMulti/>
              </div>
              <div className='col-4'>
                <StyledInputLabel>RERA ID</StyledInputLabel>
                <StyledInputBase type='text' value={reraId} onChange={e=>setReraId(e.target.value)}/>
              </div>
            </div>
            <div className='mt-3'>
              <StyledInputLabel>Specification:</StyledInputLabel>
              <TextEditor initialValue={specification} getValue={getSpecification}/>
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
            <div onClick={handlePricingImageUpload}>Upload</div>
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
                <select value={feature} onChange={e=>setFeature(e.target.value)} >
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
            <TextEditor initialValue={ownerBio} getValue={getBio}/>
          </div>
       </div>
      </div>
  
      {/* ----------------------buttons--------------------------------------------- */}
      <div className="mt-4 d-flex justify-content-around">
        <StyledButton sx={{border: "1px solid #1ADDFF"}} onClick={()=>handleDraftsPropertiesChange()}>Update Draft</StyledButton>
        <StyledButton sx={{border: "1px solid #FEAA7B"}} onClick={handlSubmission}>Submit for Review</StyledButton>
      </div>
  
      </div>
      </>
    )
}

export default DraftEdit