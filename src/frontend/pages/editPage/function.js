// import { firestore } from '../../../backend/firebase/utils';
// export async function getDataformDatabase(){
    
//     try {
//         const properties = await firestore.collection('properties').get();
//         const propertyArray =[];
//     properties.forEach((doc)=>{
//         const obj ={
//             id:doc.id,
//             ...doc.data()
//         }
//         propertyArray.push(obj)
        
//         return propertyArray
//     });
//     } catch (error) {
//       console.log(error)  
//     }
// }