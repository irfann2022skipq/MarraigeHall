import { StyleSheet, Text, View,TextInput, ScrollView ,Button, StatusBar,Image,Platform} from 'react-native'
import colors from '../components/colors';
import React,  { useState, useContext } from 'react'
import { Formik } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import {UserContext} from '../Contexts'
import { useNavigation } from '@react-navigation/native';

const EditCompanyProfile = () => {
  const navigation = useNavigation();
  const [user,setUser] = useContext(UserContext)
  const [image, setImage] = useState(user.image);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
     let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.All,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
     });
 
     console.log(result);
 
     if (!result.cancelled) {
       let newfile = {uri:result.uri, 
                      type:`test/${result.uri.split('.')[1]}`,
                      name:`test/${result.uri.split('.')[1]}`
                     }
       handleUpload(newfile)
     }
   };
 
 
   const handleUpload = async (picture)=>{
  
     const data = new FormData()
     await data.append('file',picture)
     await data.append('upload_preset','BluejayUsers')
     await data.append('cloud_name','bluejaymobapp')

     fetch('https://api.cloudinary.com/v1_1/bluejaymobapp/image/upload',{
       method:'post',
       body:data
     }).then(res=>res.json()).then(async(data)=>{
       
       console.log('url',data.url)
       setImage(data.url)
       
     }).catch(err=>{console.log(err)})
 
   }
 
 


  return (
    <ScrollView  style={{flex:1, backgroundColor:'#fff', }} contentContainerStyle={{justifyContent:'center',
    alignItems:'center'}} >
   

      {/* Form Inputs View */}
   <View style={{marginTop:20}}>

          <Formik
      initialValues={{vendor_name:user.vendor_name,
                      email: user.email, 
                      phone_no: user.phone_no,
                      city:user.city,
                      address:user.address,
                      price_range:user.price_range,
                      available_hours:user.available_hours
                    }}
      onSubmit={
          (values) => {

            SecureStore.getItemAsync('token').then(token=>{
   
             console.log('update Profile',token)
            
             const value = {vendor_name:values.vendor_name, 
                            email: values.email ,
                            phone_no: values.phone_no , 
                            city: values.city,
                            address:values.address,
                            price_range:values.price_range,
                            available_hours:values.available_hours,
                            image:image
                            }
   
             console.log(value)
   
             fetch(`https://bluejay-mobile-app.herokuapp.com/vendor/updateProfile`,{
                           method: "patch",
                           body: JSON.stringify(value),
                           headers: {
                               Accept: "application/json, text/plain, */*",
                               "Content-Type": "application/json",
                               token
                           }
                         
                     }).then(res=>res.json()).then((result)=>{
           console.log(result)
       
                       if( result.status == 'ok'){
                         setUser(result.data)
                         navigation.navigate("VendorStack")
                          
                       }else{
                         console.log(result.status)
                       }
       
       
                     }).catch(err=>console.log('catch',err.message))
           })  

      }
    }

          validationSchema={yup.object().shape({
            vendor_name: yup
            .string()
            .required('Vendor Name is required.'),  
            email: yup
            .string()
            .email()
            .required('Email is required.'),  
            phone_no: yup
            .string()
            .required('Phone number is required.'),
            city : yup
            .string()
            .required('City is required.'),  
            address: yup
            .string()
            .required('Address is required'),
            price_range: yup
            .string()
            .required('Price Range is required.'), 
            available_hours: yup
            .string()
            .required('Available hours required')
                
         
          })}

    
    >
      {({ handleChange, handleSubmit, values,errors,touched, setFieldTouched }) => (
        <View >


        <View style={styles.imageContainer}>
        {<Image source={{ uri: image }} style={styles.profileImage}  />}
  
  </View>
  <View style={styles.button}>
    <Button title="Change Image" onPress={pickImage} color={colors.primary}/>
    </View>



      <View style={styles.inputContainer} >
        <MaterialCommunityIcons name="account"  size={34} style={styles.icon}/>
        <TextInput
             style={styles.input}
             name="vendor_name"
             placeholder='Vendor Name'
             onChangeText={handleChange('vendor_name')}
             onBlur={()=>setFieldTouched('vendor_name')}
            value={values.vendor_name}
           
           />
            </View>
           {touched.vendor_name && errors.vendor_name &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.vendor_name}</Text>
            }


       
       <View style={styles.inputContainer} >
          <MaterialCommunityIcons name="email"  size={34} style={styles.icon}/>
           <TextInput
             style={styles.input}
             name="email"
             placeholder='Email'
             onChangeText={handleChange('email')}
             onBlur={()=>setFieldTouched('email')}
            value={values.email}
            keyboardType="email-address"
            
           /></View>
            {touched.email && errors.email &&
              <Text style={{  justifyContent:'center',alignContent:'center',fontSize: 18, color: 'red'}}>{errors.email}</Text>
            }


            
        <View style={styles.inputContainer} >
          <MaterialCommunityIcons name="phone"  size={34} style={styles.icon}/>
            <TextInput
             style={styles.input}
             name="phone_no"
             placeholder='Phone Number'
             onChangeText={handleChange('phone_no')}
             onBlur={()=>setFieldTouched('phone_no')}
            value={values.phone_no}
            
           /></View>
            {touched.phone_no && errors.phone_no &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.phone_no}</Text>
            }



        <View style={styles.inputContainer} >
          <MaterialCommunityIcons name="city"  size={34} style={styles.icon}/>
            <TextInput
             style={styles.input}
             name="city"
             placeholder="Enter City"
             onChangeText={handleChange('city')}
             onBlur={()=>setFieldTouched('city')}
             value={values.city}
           /></View>
           {touched.city && errors.city &&
              <Text style={{ justifyContent:'center',alignContent:'center',fontSize: 18, color: 'red' }}>{errors.city}</Text>
            }

            
            
        <View style={styles.inputContainer} >
            <MaterialCommunityIcons name="home"  size={34} style={styles.icon}/>
            <TextInput
             style={styles.input}
             name="address"
             placeholder='Address '
             onChangeText={handleChange('address')}
             onBlur={()=>setFieldTouched('address')}
            value={values.address}
            
           /></View>
            {touched.address && errors.address &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.address}</Text>
            }
            


           <View style={styles.inputContainer} >
            <MaterialCommunityIcons name="currency-usd"  size={34} style={styles.icon}/>
            <TextInput
             style={styles.input}
             name="price_range"
             placeholder='Price Range '
             onChangeText={handleChange('price_range')}
             onBlur={()=>setFieldTouched('price_range')}
            value={values.price_range}
           /></View>
            {touched.price_range && errors.price_range &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.price_range}</Text>
            }

             
            <View style={styles.inputContainer} >
            <MaterialCommunityIcons name="clock"  size={34} style={styles.icon}/>
            <TextInput
             style={styles.input}
             name="available_hours"
             placeholder='Available Hours '
             onChangeText={handleChange('available_hours')}
             onBlur={()=>setFieldTouched('available_hours')}
            value={values.available_hours}
            
            
           /></View>
            {touched.available_hours && errors.available_hours &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.available_hours}</Text>
            }
           

          
            {/*Save Button  */}
        
          <View style={styles.button}>
           <Button  onPress={handleSubmit}
           title="Update"
           color={colors.primary}
           /> 
          </View>
       
       </View>
    
      )}
    </Formik>
    

     </View>

  
    
 </ScrollView>
  );
}

const styles = StyleSheet.create({
  

  input:{
  
    borderColor :colors.white,
      paddingLeft:20,
      height:60,
      width:280,
      fontSize:20,
      elevation:30,
      borderRadius:15,
      backgroundColor:'white'
  
  
     },
  
  
     button:{
      backgroundColor: colors.primary,
      width: '45%',
      height: 35,
     marginBottom:10,
      marginLeft:'30%',
     
  
     },
     icon:{
      color:colors.primary,
      margin:20,
     
      },
      inputContainer:{
       flexDirection:'row',
       color:colors.white,
      }, 
    profileImage:{
   
      height: 140,
      width: '80%',
      borderRadius: 20,
      marginLeft:15
    },
      imageContainer:{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          marginTop:20,
          marginBottom:12
     
      }, 

});
export default EditCompanyProfile;