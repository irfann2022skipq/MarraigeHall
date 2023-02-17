import React from "react";;
import {useState, useEffect,useRef, useReducer,useContext}  from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { ImageBackground,Pressable, Platform, Button,TextInput, TouchableOpacity, StyleSheet, View,Text } from "react-native";
import { Company_Home, User_Home, Admin_Home,Vendor_Home } from "../constants";
import { RadioButton } from 'react-native-paper';
import COLORS, { colors } from "../components/colors";
import { Formik } from 'formik';
import * as yup from 'yup';
// Social buttons
import * as SecureStore from 'expo-secure-store';


import {UserContext} from '../Contexts'



// import {PORT} from"@env"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


function LoginScreen({navigation}) {

  
  const [user,setUser] = useContext(UserContext)

  const [checked, setChecked] = React.useState('customer');
  const [expoPushToken, setExpoPushToken] = useState('');
   const [notification, setNotification] = useState(false);
   const notificationListener = useRef();
   const responseListener = useRef();


   useEffect(() => {
    registerForPushNotification().then(token=>setExpoPushToken(token));
  
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
  
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
  })


// token
async function registerForPushNotification(){
    
   
  let token;
  if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
              const { status } = await Notifications.requestPermissionsAsync();
              finalStatus = status;
            }
            if (finalStatus !== 'granted') {
              alert('Failed to get push token for push notification!');
              return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token,"Token for mobile device");
            
  } else {
    // alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
} 

// const sendRequestNotification = (token, title, body) => {
//   let response = fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       to: token,
//       sound: 'default',
//       title: title,
//       body: body
//     })
//   });
// };

  
  console.log(expoPushToken)
  console.log(checked)

  
  async function handleLogin(values){

    const role= checked

    const value = {
      email: values.email,
      password: values.password,
      noti_token: expoPushToken
    }

    if(role=='customer'){
      
           fetch(`https://bluejay-mobile-app.herokuapp.com/users/logIn`,{
                    method: "post",
                    body: JSON.stringify(value),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    }   
                  
              }).then(res=>res.json()).then(result=>{
                console.log(result)

                if(result.status === 'ok')
                      {
                          
                          SecureStore.setItemAsync('token',result.token)
                          setUser(result.data)
                          navigation.navigate(User_Home)
                      }
                      else{
                        console.log(result.error)
                        alert('Invalid username or password')
                      }

              }).catch(err=>console.log(err.message))

             // console.log('login')
    }

    else if (role=='company'){
      
                    fetch(`https://bluejay-mobile-app.herokuapp.com/company/logIn`,{
                      method: "post",
                      body: JSON.stringify(value),
                      headers: {
                          Accept: "application/json, text/plain, */*",
                          "Content-Type": "application/json"
                      }   
                    
                }).then(res=>res.json()).then(result=>{
                  console.log(result)

                  if(result.status === 'ok')
                        {
                            
                            SecureStore.setItemAsync('token',result.token);
                            setUser(result.data)
                            navigation.navigate(Company_Home)
                        }
                        else{
                          console.log(result.error)
                          alert('Invalid username or password')
                        }

                }).catch(err=>console.log(err.message))
    }

    else if(role=='vendor'){
                      fetch(`https://bluejay-mobile-app.herokuapp.com/vendor/logIn`,{
                        method: "post",
                        body: JSON.stringify(value),
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json"
                        }   
                      
                  }).then(res=>res.json()).then(result=>{
                    console.log(result)

                    if(result.status === 'ok')
                          {
                              
                              SecureStore.setItemAsync('token',result.token);
                              setUser(result.data)
                              navigation.navigate(Vendor_Home)
                          }
                          else{
                            console.log(result.error)
                            alert('Invalid username or password')
                          }

                  }).catch(err=>console.log(err.message))

    }

    else{
      console.log('no role')
    }
    
   
  }
  return (
   <View style={{display:"flex", backgroundColor:'#fff',}} >
     {/* <StatusBar barStyle="light-content"  translucent backgroundColor="#fff"/> */}
   <View style={styles.topView}>
   <View style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
   <ImageBackground
   style={styles.logo}
     source={require('../assets/logo2.1.png')}
     resizeMode="cover" >
    </ImageBackground>

     <Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>Sign In</Text>

     </View>
 </View>

      {/* Form Inputs View */}
   <View style={styles.center}>
          <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={
        (values) => {
          //console.log(values)
          handleLogin(values)}}


          validationSchema={yup.object().shape({
            email: yup
            .string()
            .email()
            .required('Email is required.'),           
          password: yup
            .string()
            .min(5, 'More than 5 characters are needed.')
            .max(11, 'Less than 12 characters are allowed.')
            .required(),
          })}

    
    >
      {({ handleChange, handleSubmit, values,errors,touched, setFieldTouched }) => (
        <>
        <View style={{marginTop:30}}>
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
              <Text style={{ marginLeft:10,fontSize: 18, color: 'red'}}>{errors.email}</Text>
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
              <Text style={{ marginLeft:10,fontSize: 18, color: 'red' }}>{errors.password}</Text>
            }

        </View>
            <Text style={{fontSize: 18,padding:10,marginTop:20}} >Forgot Password?</Text>

           
            {/* Radio Button */}
 
            <View style={{flexDirection:'row',marginTop:20}}>

                  <View style={styles.rightTag}>
                        
                        <View style={styles.leftTag}>
                            <RadioButton
                              value="customer"
                              status={ checked === 'customer' ? 'checked' : 'unchecked' }
                              onPress={() => setChecked('customer')}
                              uncheckedColor={COLORS.primary}
                              color={COLORS.primary}
                            />
                        </View>
                        <Text style={{fontSize: 18,color:COLORS.grey, fontWeight: 'bold'}}>Customer</Text>

                  </View>

                  <View style={styles.rightTag}>
                        
                        <View style={styles.leftTag}>
                            <RadioButton
                              value="company"
                              status={ checked === 'company' ? 'checked' : 'unchecked' }
                              onPress={() => setChecked('company')}
                              uncheckedColor={COLORS.primary}
                              color={COLORS.primary}
                            />
                        </View>
                        <Text style={{fontSize: 18,color:COLORS.grey, fontWeight: 'bold'}}>Company</Text>
                        
                  </View>
     

                  <View style={styles.rightTag}>
                        
                        <View style={styles.leftTag}>
                            <RadioButton
                              value="vendor"
                              status={ checked === 'vendor' ? 'checked' : 'unchecked' }
                              onPress={() => setChecked('vendor')}
                              uncheckedColor={COLORS.primary}
                              color={COLORS.primary}
                            />
                        </View>
                        <Text style={{fontSize: 18,color:COLORS.grey, fontWeight: 'bold'}}>Vendor</Text>

                  </View>
     
</View>     
    
            {/*SignIn Button  */}
          <View style={styles.center}>
          <View style={styles.button}>
           <Button  onPress={handleSubmit} 
           title=" Sign In "
           color='purple'
           /> 
          </View>
          </View>

      
          <Text style={{marginLeft:25,fontSize:15,marginTop:2, flexDirection:'row',marginBottom:60}}>Don't Have an Account?   
                 <Text style={{fontWeight: "bold",fontSize:15}} onPress={()=>{navigation.navigate('SignUp')}}> SignUp</Text>
             </Text>
        </>
      )}
    </Formik>


     </View>

 </View>
  );
}

const styles = StyleSheet.create({
  
  topView:{
    backgroundColor :COLORS.primary,
    display:"flex",
    justifyContent:'center',
    alignContent:'center',
    width:'100%',
    height:250,
    
   },

 logo: {
  width: 200,
  height: 130,
  display:"flex",
  justifyContent:'center',
  alignContent:'center',
  
},
   
   input:{
    borderColor :COLORS.white,
    margin:10,
    padding:18,
    width:280,
    fontSize:20,
    borderWidth:2,
    elevation:20,
    borderRadius:15,
    backgroundColor:'white'

   },

   button:{
    backgroundColor: 'purple',
    width: '120%',
    height: 37,
    marginTop:20,

   },
   
center:{
  paddingTop:25,justifyContent:'center',
   alignItems:'center',
},
  socialbTag:{
     marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  radioButton:{
    uncheckedColor:COLORS.primary,
    color:COLORS.primary,
  },
  rightTag:{
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    

  },
leftTag:{
 
  color: COLORS.grey,
  marginLeft: 5,
 
}, 

buttonContainer:{
  justifyContent:'center',
  alignItems:'center',

},
editButton:{
justifyContent:'center',
alignItems:'center',
marginTop:5,
width:180,
borderColor :COLORS.primary,
borderWidth:4,
elevation:15,
borderRadius:15,
backgroundColor:COLORS.primary,
},

});

export default LoginScreen;