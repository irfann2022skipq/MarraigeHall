import { StyleSheet, Text, View,TextInput, Image,ScrollView ,Button, StatusBar} from 'react-native'
import colors from '../components/colors';
import React,{useState,useContext} from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import {UserContext} from '../Contexts'
import { useNavigation } from '@react-navigation/native';


const EditProfile = () => {

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


  const handleUpload = (picture)=>{
    const data = new FormData()
    data.append('file',picture)
    data.append('upload_preset','BluejayUsers')
    data.append('cloud_name','bluejaymobapp')

    fetch('https://api.cloudinary.com/v1_1/bluejaymobapp/image/upload',{
      method:'post',
      body:data
    }).then(res=>res.json()).then(async(data)=>{
      console.log('url',data.url)
      setImage(data.url)
      
    })

  }


  return (
    <View style={{flex:1, backgroundColor:'#fff', justifyContent:'center',
    alignItems:'center'}} >
   

      {/* Form Inputs View */}
   <View style={{marginTop:20, }}>
          <Formik
      initialValues={{username:user.username, email: user.email, phone_no: user.phone_no ,city:user.city }}
      onSubmit={
        (values) => {

         SecureStore.getItemAsync('token').then(token=>{

          console.log('update Profile',token)
         
          const value = {username:values.username, email: values.email ,
                         phone_no: values.phone_no , city: values.city,
                         image:image }

          console.log(value)

          fetch(`https://bluejay-mobile-app.herokuapp.com/users/updateProfile`,{
                        method: "patch",
                        body: JSON.stringify(value),
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                            token
                        }
                      
                  }).then(res=>res.json()).then((result)=>{
        
    
                    if( result.status == 'ok'){
                      setUser(result.data)
                      navigation.navigate("UserStack")
                       
                    }else{
                      console.log(result.status)
                    }
    
    
                  }).catch(err=>console.log('catch',err.message))
        })  
         
         
          }}

          validationSchema={yup.object().shape({
            username: yup
            .string()
            .required('Name is required.'),  
            email: yup
            .string()
            .email()
            .required('Email is required.'),  
            username: yup
            .string()
            .required('Name is required.'),  
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
      {({ handleChange, handleSubmit, values,errors,touched, setFieldTouched }) => (
        <View style={{paddingTop:20}}>


        
        <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.profileImage}  />}
        </View>
        
        <View style={styles.button}>
         <Button title="Change Image" onPress={pickImage} color={colors.primary}/>
         </View>



        <View style={styles.inputContainer} >
        <MaterialCommunityIcons name="account"  size={34} style={styles.icon}/>
        <TextInput
             style={styles.input}
             name="username"
             placeholder='User Name'
             onChangeText={handleChange('username')}
             onBlur={()=>setFieldTouched('username')}
            value={values.username}
           
           />
           </View>
           {touched.username && errors.username &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.username}</Text>
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
            keyboardType="numeric"
            
           /></View>
            {touched.phone_no && errors.phone_no &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.phone_no}</Text>
            }
            <View style={styles.inputContainer} >
        <MaterialCommunityIcons name="city"  size={34} style={styles.icon}/>
            <TextInput
             style={styles.input}
             name="city"
             placeholder="City"
             onChangeText={handleChange('city')}
             onBlur={()=>setFieldTouched('city')}
             value={values.city}
           /></View>
           
           {touched.city && errors.city &&
              <Text style={{ justifyContent:'center',alignContent:'center',fontSize: 18, color: 'red' }}>{errors.city}</Text>
            }
           
          
            {/*Save Button  */}
          <View style={styles.container}>
          <View style={styles.updateButton}>
           <Button  onPress={handleSubmit} 
           title="Update"
           color='purple'
           /> 
          </View>
          </View>
       
        </View>
      )}
    </Formik>


     </View>

  
    
 </View>
  );
}

const styles = StyleSheet.create({
  

   input:{
   borderColor :colors.white,
   margin:6,
   padding:8,
   width:280,
   fontSize:20,
   borderWidth:2,
   elevation:20,
   borderRadius:15,
   backgroundColor:'white'
   

   },

   container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
   
  
  },
   button:{

    backgroundColor: colors.primary,
    width: '40%',
    height: 35,
    marginBottom:35,
    marginLeft:'30%',
    marginTop:10
     
 },
 updateButton:{

  backgroundColor: colors.primary,
  width: '40%',
  height: 38,

   
},
buttonContainer:{
  justifyContent:'center',
  alignItems:'center',

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
 
  height: 180,
  width: '50%',
  borderRadius: 20,
  marginBottom:20,
},
  imageContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      marginTop:40
 
  }, 

});
export default EditProfile;