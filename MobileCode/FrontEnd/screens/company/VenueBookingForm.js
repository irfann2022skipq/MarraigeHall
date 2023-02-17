import React from 'react'
import {useState,useEffect,useContext} from 'react';
import colors from '../../components/colors';
import { ImageBackground,StatusBar, Button, TextInput, Platform,ScrollView, StyleSheet, View, Image, Text } from "react-native";
import * as yup from 'yup';
import { Formik} from 'formik';
import { RadioButton } from 'react-native-paper';
import COLORS from '../../components/colors';
import {CvOrderContext} from '../../Contexts'
import * as SecureStore from 'expo-secure-store';

function VenueBookingForm({ route, navigation}) {

  const vendor = route.params.vendor
  const myDate = route.params.myDate
  const o_id = route.params.o_id
  const v_id = vendor._id
  
  
  const [cvOrderC, setCvOrderC] = useContext(CvOrderContext)

  const [catering, setCatering] = React.useState('no');
  const [decor, setDecor] = React.useState('no');


  
  function handleOrder(values){


    SecureStore.getItemAsync('token').then(token=>{

      console.log('create venue order',token)

      const value = {
        o_id,
        v_id,
        no_of_guests: values.no_of_guests,
        available_budget: values.available_budget,
        special_instructions: values.special_instructions,
        start_time: values.start_time,
        end_time: values.end_time,
        venue_catering: catering,
        venue_decor: decor,
        menu:values.menu,
        decor_theme_detail:values.decor_theme_detail

      }
      console.log("value",value)
      
      fetch(`https://bluejay-mobile-app.herokuapp.com/company/createVenueOrder`,{
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
     <Text style={{color:colors.primary, fontSize:28,fontWeight:'bold',paddingLeft:'20%',paddingTop:'16%'}}>Venue Booking Form</Text>
    

    {/* Form */}
    <Formik
     initialValues={{no_of_guests:'', start_time:'',end_time: '',menu:'',decor_theme_detail:'',available_budget:'', special_instructions:'',}}
     onSubmit={(values) => {
    
      handleOrder(values)

      }} 
     
     validationSchema={yup.object().shape({
            no_of_guests: yup
            .number()
            .required(' No of guests is required.'),  
            start_time: yup
             .string()
            .required(' Start time is required.'),
            end_time: yup
            .string()
            .required(' End time is required.'), 
            menu: yup
             .string(),
            decor_theme_detail: yup
            .string(),
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
             name="start_time"
             placeholder="Event start time"
             onChangeText={handleChange('start_time')}
             onBlur={()=>setFieldTouched('start_time')}
             multiline={true}
             value={values.start_time}
           />
           {touched.start_time && errors.start_time &&
              <Text style={{ justifyContent:'center',alignContent:'center',fontSize: 18, color: 'red' }}>{errors.start_time}</Text>
            }
            
    

            <TextInput
             style={styles.input}
             name="end_time"
             placeholder='Event end_time'
             onChangeText={handleChange('end_time')}
             onBlur={()=>setFieldTouched('end_time')}
             multiline={true}
            value={values.end_time}
            
            
           />
            {touched.end_time && errors.end_time &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.end_time}</Text>
            }  
           



           
     <View style={{flexDirection:'row'}}>

        
         <Text style={{color:colors.primary, fontSize:20,paddingLeft:12,paddingTop:8}}>Catering:     </Text>
    

                  <View style={styles.rightTag}>
                        
                        <View style={styles.leftTag}>
                            <RadioButton
                              value="yes"
                              status={ catering === 'yes' ? 'checked' : 'unchecked' }
                              onPress={() => setCatering('yes')}
                              uncheckedColor={COLORS.primary}
                              color={COLORS.primary}
                            />
                        </View>
                        <Text style={{fontSize: 18,color:COLORS.grey, fontWeight: 'bold'}}>Yes</Text>

                  </View>

                  <View style={styles.rightTag}>
                        
                        <View style={styles.leftTag}>
                            <RadioButton
                              value="no"
                              status={ catering === 'no' ? 'checked' : 'unchecked' }
                              onPress={() => setCatering('no')}
                              uncheckedColor={COLORS.primary}
                              color={COLORS.primary}
                            />
                        </View>
                        <Text style={{fontSize: 18,color:COLORS.grey, fontWeight: 'bold'}}>No</Text>
                        
                  </View>

     </View>


      {
        catering == 'yes' &&

        <TextInput
             style={styles.input}
             name="menu"
             placeholder='Enter Menu'
             onChangeText={handleChange('menu')}
             onBlur={()=>setFieldTouched('menu')}
             multiline={true}
             numberOfLines={3}
            textAlignVertical='top'
             value={values.menu}
            
            
           />
            

      }





     <View style={{flexDirection:'row'}}>

        
         <Text style={{color:colors.primary, fontSize:20,paddingLeft:12,paddingTop:8}}>Decoration: </Text>
    

                  <View style={styles.rightTag}>
                        
                        <View style={styles.leftTag}>
                            <RadioButton
                              value="yes"
                              status={ decor === 'yes' ? 'checked' : 'unchecked' }
                              onPress={() => setDecor('yes')}
                              uncheckedColor={COLORS.primary}
                              color={COLORS.primary}
                            />
                        </View>
                        <Text style={{fontSize: 18,color:COLORS.grey, fontWeight: 'bold'}}>Yes</Text>

                  </View>

                  <View style={styles.rightTag}>
                        
                        <View style={styles.leftTag}>
                            <RadioButton
                              value="no"
                              status={ decor === 'no' ? 'checked' : 'unchecked' }
                              onPress={() => setDecor('no')}
                              uncheckedColor={COLORS.primary}
                              color={COLORS.primary}
                            />
                        </View>
                        <Text style={{fontSize: 18,color:COLORS.grey, fontWeight: 'bold'}}>No</Text>
                        
                  </View>

     </View>




     {
        decor == 'yes' &&

        <TextInput
             style={styles.input}
             name="decor_theme_detail"
             placeholder='Enter decor theme'
             onChangeText={handleChange('decor_theme_detail')}
             onBlur={()=>setFieldTouched('decor_theme_detail')}
             multiline={true}
             numberOfLines={3}
            textAlignVertical='top'
             value={values.decor_theme_detail}
            
            
           />
            

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

  rightTag:{
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    

  },
leftTag:{
 
  color: COLORS.grey,
  marginLeft: 18,
  // paddingBottom:5,
}, 
   
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

export default VenueBookingForm