import React from 'react'
import {useState,useEffect,useContext} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../components/colors';
import { ImageBackground,StatusBar, Button, TextInput, Platform,ScrollView, StyleSheet, View, Image, Text } from "react-native";
import * as yup from 'yup';
import { Formik} from 'formik';
import COLORS from '../../components/colors';
import {CvOrderContext} from '../../Contexts'
import * as SecureStore from 'expo-secure-store';

function PhotographerBookingForm({ route, navigation}) {

  const vendor = route.params.vendor
  const myDate = route.params.myDate
  const o_id = route.params.o_id
  const v_id = vendor._id
  
  const [cvOrderC, setCvOrderC] = useContext(CvOrderContext)


  
  function handleOrder(values){


    SecureStore.getItemAsync('token').then(token=>{

      console.log('create photography order',token)

      const value = {
        o_id,
        v_id,
        available_budget: values.available_budget,
        special_instructions: values.special_instructions,
        session_time:values.session_time,
        location: values.location,
        time: values.time,
        shoot_type:values.shoot_type
        

      }
      console.log("value",value)
      
      fetch(`https://bluejay-mobile-app.herokuapp.com/company/createPhotographerOrder`,{
                    method: "post",
                    body: JSON.stringify(value),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        token
                    }
                  
              }).then(res=>res.json()).then(result=>{
                console.log(result)

                if(result.status == 'ok')
                     {
                      setCvOrderC(!cvOrderC)
                      alert('order confirmed')
                      navigation.navigate('Home',{date: myDate, o_id : o_id})
                      }

              }).catch(err=>console.log('catch',err.message))
    })    
 
  }




  return (
    <ScrollView style={{flex:1,backgroundColor:colors.white}}>
        <StatusBar barStyle="light-content"  translucent backgroundColor="rgb(147, 112, 219)"   />
       {/* <View style={styles.topView}>
        <ImageBackground
         style={styles.logo}
         source={require('../../assets/logo2.png')}
         resizeMode="cover" >
       </ImageBackground>
      </View> */}
     <Text style={{color:colors.primary, fontSize:28,fontWeight:'bold',paddingLeft:'10%',paddingTop:'20%'}}>Photographer Booking Form</Text>
    

    {/* Form */}
    <Formik
     initialValues={{session_time:'', location:'',time: '',available_budget:'', shoot_type:'', special_instructions:'',}}
     onSubmit={(values) => {
      handleOrder(values)

   }} 
     
     validationSchema={yup.object().shape({
            session_time: yup
            .string()
            .required(' Session duration is required.'),  
            time: yup
            .string()
            .required(' Time is required.'), 
            location: yup
             .string()
            .required(' Location is required.'),    
            shoot_type: yup
            .string()
            .required(' Type of shoot is required.'), 
            available_budget: yup
            .number()
            .required(' Budget is required.'),
           special_instructions: yup
             .string()  
          })}
 >
    {({ handleChange, handleSubmit, values,errors,touched, setFieldTouched }) => (
       <View style={{ alignItems:"center",justifyContent:'center', flex: 1 }}>
        <View style={{borderWidth:3, padding:12, marginTop:20,marginBottom:10, borderRadius:20,borderColor:colors.primary}}>
         
       <TextInput
             style={styles.input}
             name="session_time"
             placeholder='Enter Session duration'
             onChangeText={handleChange('session_time')}
             onBlur={()=>setFieldTouched('session_time')}
             multiline={true}
            value={values.session_time}
           
           />
           {touched.session_time && errors.session_time &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.session_time}</Text>
            }

        <TextInput
             style={styles.input}
             name="location"
             placeholder="Event Location address"
             onChangeText={handleChange('location')}
             onBlur={()=>setFieldTouched('location')}
             multiline={true}
             value={values.location}
           />
           {touched.location && errors.location &&
              <Text style={{ justifyContent:'center',alignContent:'center',fontSize: 18, color: 'red' }}>{errors.location}</Text>
            }
            


            <TextInput
             style={styles.input}
             name="time"
             placeholder='Event start Time'
             onChangeText={handleChange('time')}
             onBlur={()=>setFieldTouched('time')}
             multiline={true}
            value={values.time}
            
            
           />
            {touched.time && errors.time &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.time}</Text>
            }  
           
           <TextInput
             style={styles.input}
             name="available_budget"
            placeholder="Available Budget"
             onChangeText={handleChange('available_budget')}
             onBlur={()=>setFieldTouched('available_budget')}
            value={values.available_budget}
            multiline={true}
            keyboardType="numeric"
            />
            {touched.available_budget && errors.available_budget &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.available_budget}</Text>
            }
            
          
            <TextInput
             style={styles.input}
             name="shoot_type"
             placeholder='Enter type of shoot'
             onChangeText={handleChange('shoot_type')}
             onBlur={()=>setFieldTouched('shoot_type')}
             multiline={true}
            textAlignVertical='top'
            value={values.shoot_type}
            
           />
            {touched.shoot_type && errors.shoot_type &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.shoot_type}</Text>
            }
            
            
          
            <TextInput
             style={styles.input}
             name="special_instructions"
             placeholder="Enter special instructions"
            multiline={true}
            numberOfLines={3}
            textAlignVertical='top'
             onChangeText={handleChange('special_instructions')}
             onBlur={()=>setFieldTouched('special_instructions')}
            value={values.special_instructions}
            
            />
            {touched.special_instructions && errors.special_instructions &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.special_instructions}</Text>
            }
       
       </View>
   
                  
      <View style={styles.button}>
       <Button onPress={handleSubmit} title="Submit" color={COLORS.primary} />
       </View>
      </View>
     )}
  </Formik>


 
    </ScrollView>
  )
}

const styles = StyleSheet.create({

 
   
   input:{
    borderColor :COLORS.white,
    margin:7,
    padding:14,
    width:300,
    fontSize:20,
    borderWidth:2,
    elevation:20,
    borderRadius:15,
    backgroundColor:'white'

   },

   
   button:{
    backgroundColor:colors.primary,
    width: '40%',
     marginTop:20,

   },
   container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },


  btnContainer: {
    paddingTop: 12,
   
  },


});

export default PhotographerBookingForm