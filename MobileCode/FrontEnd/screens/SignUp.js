import React from "react";
import {useState, useEffect}  from 'react'

import { ImageBackground, Button, TextInput, Platform,ScrollView,StyleSheet, View, Image, Text } from "react-native";

import colors from "../components/colors";
import { Formik } from 'formik';
import * as yup from 'yup';
import { FacebookSocialButton } from "react-native-social-buttons";
import {GoogleSocialButton } from "react-native-social-buttons";
import * as ImagePicker from 'expo-image-picker';
import COLORS from "../components/colors";

import { useNavigation } from '@react-navigation/native';
// import {PORT} from"@env"





const SignUp = ()=> {


  const navigation = useNavigation();
  const [image, setImage] = useState(null);

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
 
 
   const handleUpload = (picture)=>{
     const data = new FormData()
     data.append('file',picture)
     data.append('upload_preset','BluejayUsers')
     data.append('cloud_name','bluejaymobapp')
 
     fetch('https://api.cloudinary.com/v1_1/bluejaymobapp/image/upload',{
       method:'post',
       body:data
     }).then(res=>res.json()).then(async(data)=>{
      //  console.log('url',data.url)
       setImage(data.url)
       
     })
 
   }



   function handleLogin(values){

    const value = {username:values.username, 
                   email: values.email ,
                   password: values.password,
                   phone_no: values.phone_no, 
                   city: values.city,
                   image:image 
                  }

     console.log(value)

      fetch(`https://bluejay-mobile-app.herokuapp.com/users/signUp`,{
        method: "post",
        body: JSON.stringify(value),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }   
        
      
   }).then(res=>res.json()).then(result=>{console.log(result)
    if(result.status == 'ok')
    {
      navigation.navigate("LoginScreen")
    }
    else{
      //refresh this form and show error
    }
    

   
  }).catch(err=>console.log(err.message))
  
 
  }


  return (
    
   <View style={{flex:1,backgroundColor:'#fff'}} >
   <View style={styles.topView}>
   <View style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
   <ImageBackground
   style={styles.logo}
     source={require('../assets/logo2.1.png')}
     resizeMode="cover" >
    </ImageBackground>
     <Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>SignUp</Text>
     </View>
 </View>

      {/* Form Inputs View */}
   <View style={{marginTop:20}}>
          <Formik
             initialValues={{ username:'', email: '', password: '', phone_no:'', city:'' }}
             onSubmit={
              (values) => {
             //console.log(values)
             handleLogin(values)
             }}
            

              validationSchema={yup.object().shape({
            username: yup
            .string()
            .required('Name is required.'),  
            email: yup
            .string()
            .email()
            .required('Email is required.'), 
             password: yup
            .string()
            .min(5, 'More than 5 characters are needed.')
            .max(11, 'More than 12 characters are not allowed.')
            .required(),
            phone_no: yup
            .number()
            .min(1111111111, 'min 11 digits are required')
            .max(11111111111, 'max 11 digits are required')
            .required('Phone Number is required.'), 
            city : yup
            .string()
            .required('City is required.'),  
          })}
          
           >
      {({  handleChange, handleSubmit, values,errors,touched, setFieldTouched}) => (
        
        
        <View style={{ alignItems:"center",justifyContent:'center' }}>


      
           <TextInput
             style={styles.input}
             name="username"
             placeholder='Enter User Name'
             onChangeText={handleChange('username')}
             onBlur={()=>setFieldTouched('username')}
            value={values.username}
           
           />
           {touched.username && errors.username &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.username}</Text>
            }
              <TextInput
             style={styles.input}
             name="email"
             placeholder='Enter Email'
             onChangeText={handleChange('email')}
             onBlur={()=>setFieldTouched('email')}
            value={values.email}
            keyboardType="email-address"
            
           />
            {touched.email && errors.email &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.email}</Text>
            }


            <TextInput
             style={styles.input}
             name="password"
            placeholder="Enter Password"
             onChangeText={handleChange('password')}
             onBlur={() => setFieldTouched('password')}
            value={values.password}
            secureTextEntry />
            {touched.password && errors.password &&
              <Text style={{ justifyContent:'center',alignContent:'center',fontSize: 18, color: 'red' }}>{errors.password}</Text>
            }
            <TextInput
             style={styles.input}
             name="phone_no"
             placeholder='Enter Phone Number'
             onChangeText={handleChange('phone_no')}
             onBlur={()=>setFieldTouched('phone_no')}
            value={values.phone_no}
            keyboardType="numeric"
            
           />
            {touched.phone_no && errors.phone_no &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.phone_no}</Text>
            }

            <TextInput
             style={styles.input}
             name="city"
             placeholder="Enter City"
             onChangeText={handleChange('city')}
             onBlur={()=>setFieldTouched('city')}
             value={values.city}
           />
           {touched.city && errors.city &&
              <Text style={{ justifyContent:'center',alignContent:'center',fontSize: 18, color: 'red' }}>{errors.city}</Text>
            }
         
     
      
        <View style={styles.imageContainer} >
        
        <Image source={{uri: image}} style={styles.profileImage}  />
      </View>
         <Button title="Upload Image" onPress={pickImage} color={colors.primary} style={styles.button}/>
       
        
      

          <View style={styles.button}>

           <Button
           onPress={handleSubmit}
           title="SignUp"
           color={colors.primary}
           /> 

           
          </View>

        </View>
      )}
    </Formik>

     </View>

                  <Text style={{marginLeft:70,fontSize:15,marginTop:2,marginBottom:10}}>Already Have an Account?   
                 
              
                      <Text style={{fontWeight: "bold",fontSize:15}}  onPress={()=>{navigation.navigate('LoginScreen')}}>    SignIn</Text>
                
                  </Text>


            
        
      </View>
  );
}

const styles = StyleSheet.create({

  topView:{
    backgroundColor :COLORS.primary,
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
    width:"100%",
    height:210,
    
   },
   
 logo: {
  width: 200,
  height: 110,
  // marginLeft:90,

},
center:{
  paddingTop:30,
  justifyContent:'center',
   alignItems:'center',
},
   
   input:{
    borderColor :COLORS.white,
    marginBottom:10,
    padding:10,
    width:280,
    fontSize:20,
    borderWidth:2,
    elevation:20,
    borderRadius:15,
    backgroundColor:'white'
   },
   button:{
    backgroundColor:COLORS.primary,
     marginTop:10,
    justifyContent:'center',
    alignItems:'center',
    // borderRadius:'2px',

  
   },
  
 profileImage:{
  height: 100,
  width: 175,
  borderRadius: 20,
  marginTop:2,
  // marginLeft:'1%'
},
  buttonContainer:{
    justifyContent:'center',
    alignItems:'center',
  
},
imageContainer:{
  borderColor :COLORS.white,
  marginBottom:3,
  // padding:10,
  width:180,
  fontSize:20,
  borderWidth:2,
  elevation:20,
  borderRadius:15,
  backgroundColor:'white'
}
});

export default SignUp;