import React from 'react'
import {useState,useEffect,useContext} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../components/colors';
import { ImageBackground,StatusBar, Button, TextInput,ScrollView, StyleSheet, View, Image, Text } from "react-native";
import * as yup from 'yup';
import { Formik} from 'formik';
import COLORS from '../../components/colors';
import {CvOrderContext} from '../../Contexts'
import * as SecureStore from 'expo-secure-store';

function DecorationBookingForm({ route, navigation}) {

  const vendor = route.params.vendor
  const myDate = route.params.myDate
  const o_id = route.params.o_id
  const v_id = vendor._id

  
  const [cvOrderC, setCvOrderC] = useContext(CvOrderContext)


  function handleOrder(values){


    SecureStore.getItemAsync('token').then(token=>{

      console.log('create decoration order',token)

      const value = {
        o_id,
        v_id,
        no_of_guests: values.no_of_guests,
        available_budget: values.available_budget,
        special_instructions: values.special_instructions,
        location_address: values.location_address,
        time: values.time,
        location_details:values.location_details,
        decor_theme_detail:values.decor_theme_detail

      }
      console.log("value",value)
      
      fetch(`https://bluejay-mobile-app.herokuapp.com/company/createDecorationOrder`,{
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
     <Text style={{color:colors.primary, fontSize:28,fontWeight:'bold',paddingLeft:'14%',paddingTop:'16%'}}>Decorator Booking Form</Text>
    

    {/* Form */}
    <Formik
     initialValues={{no_of_guests:'', location_address:'', location_details:'',decor_theme_detail:'',time: '',available_budget:'', special_instructions:'',}}
     onSubmit={(values) => {
      handleOrder(values)

   }} 
   
     validationSchema={yup.object().shape({
            no_of_guests: yup
            .number()
            .required(' No of guests is required.'),  
            time: yup
            .string()
            .required(' Time is required.'), 
            location_address: yup
             .string()
            .required(' Location address is required.'),    
            location_details: yup
            .string()
            .required(' Location details is required.'), 
            decor_theme_detail: yup
            .string()
            .required(' Decor theme is required.'), 
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
             name="no_of_guests"
             placeholder='No of guests'
             onChangeText={handleChange('no_of_guests')}
             onBlur={()=>setFieldTouched('no_of_guests')}
             multiline={true}
            value={values.no_of_guests}
           
           />
           {touched.no_of_guests && errors.no_of_guests &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.no_of_guests}</Text>
            }


      
            

        <TextInput
             style={styles.input}
             name="location_address"
             placeholder="Event location address"
             onChangeText={handleChange('location_address')}
             onBlur={()=>setFieldTouched('location_address')}
             multiline={true}
             value={values.location_address}
           />
           {touched.location_address && errors.location_address &&
              <Text style={{ justifyContent:'center',alignContent:'center',fontSize: 18, color: 'red' }}>{errors.location_address}</Text>
            }
            
            <TextInput
             style={styles.input}
             name="location_details"
             placeholder='Enter location details'
             onChangeText={handleChange('location_details')}
             onBlur={()=>setFieldTouched('location_details')}
             multiline={true}
            textAlignVertical='top'
            value={values.location_details}
            
           />
            {touched.location_details && errors.location_details &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.location_details}</Text>
            }




        <TextInput
             style={styles.input}
             name="decor_theme_detail"
             placeholder='Enter Decoration theme'
             onChangeText={handleChange('decor_theme_detail')}
             onBlur={()=>setFieldTouched('decor_theme_detail')}
             multiline={true}
            value={values.decor_theme_detail}
           
           />
           {touched.decor_theme_detail && errors.decor_theme_detail &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.decor_theme_detail}</Text>
            }

            <TextInput
             style={styles.input}
             name="time"
             placeholder='Enter event Time'
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

export default DecorationBookingForm