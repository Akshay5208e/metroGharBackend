import React, { useState, useEffect } from 'react';
import { firestore } from '../../../backend/firebase/utils';

export const EditContext = React.createContext();

export const EditContextAPi=({children})=> {
    const [all, setAll] = useState([])
    async function getDataformDatabase(){
    
        try {
            const properties = await firestore.collection('properties').get();
            const propertyArray =[];
        properties.forEach((doc)=>{
            const obj ={
                id:doc.id,
                ...doc.data()
            }
            propertyArray.push(obj)
            console.log("conext",propertyArray)
            setAll(propertyArray)
        });
        } catch (error) {
          console.log(error)  
        }
    }

    console.log("all",all)
    useEffect(()=>{
        getDataformDatabase()
    },[all])
    return <EditContext.Provider value = {all}>{children}</EditContext.Provider>
}

export default EditContextAPi