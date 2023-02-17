import React from 'react'
import colors from '../components/colors';
import { useState,useContext } from 'react';
import { ImageBackground,StatusBar, Button, TextInput, Platform,ScrollView, StyleSheet, View, Image, Text } from "react-native";
import Tooltip from 'react-native-walkthrough-tooltip';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as yup from 'yup';
import { Formik} from 'formik';
import COLORS from '../components/colors';
import { RadioButton } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import {OrderContext,DateContext} from '../Contexts'
import {UserContext} from '../Contexts'

function BookingForm({ route}) {

  const navigation = useNavigation();

  const company = route.params.company
  const myDate = route.params.myDate
  // console.log("myDate",myDate)


  const [catering, setCatering] = React.useState('no');
  const [venue, setVenue] = React.useState('no');
  const [decor, setDecor] = React.useState('no');
  const [photographer, setPhotographer] = React.useState('no');
  
  
  const [user,setUser] = useContext(UserContext)
  const [orderC,setOrderC] = useContext(OrderContext)
  const [date,setDate] = useContext(DateContext)
  const [toolTipVisible, setToolTipVisible] = useState(false);

// console.log(toolTipVisible)
// console.log('order',company.noti_token)

console.log('date',date)


  const c_id = company._id
 
  const SendToDb = ()=>{

    SecureStore.getItemAsync('token').then(token=>{

      console.log('noti db store',token)

      const noti_obj= {
       
        c_id: c_id,
        title: "Order Received",
        body:  "You have received a order.",
        compDate: new Date()
      }

      
      fetch(`https://bluejay-mobile-app.herokuapp.com/company/orderCreateNoti`,{
                    method: "post",
                    body: JSON.stringify(noti_obj),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        token
                    }
                  
              }).then(res=>res.json()).then(result=>{
                console.log(result)
                if(result.status=='ok'){
                console.log('stored in db')
                }

              }).catch(err=>console.log('catch',err.message))
    
  })  
  }
  
  function handleOrder(values){

    SecureStore.getItemAsync('token').then(token=>{

      console.log('create order',token)

      const value = {
        c_id,
        date: myDate,
        compDate: date,
        event_type:values.event_type,
        no_of_guests: values.no_of_guests,
        catering: catering,
        menu:values.menu,
        decor: decor,
        decor_theme:values.decor_theme,
        photographer: photographer,
        photoShoot_details:values.photoShoot_details,
        venue:venue,
        venue_preference:values.venue_preference,
        location:values.location,
        start_time:values.start_time,
        event_duration:values.event_duration,
        available_budget: values.available_budget,
        special_instructions: values.special_instructions
       
      }
      console.log("value",value)
      
      fetch(`https://bluejay-mobile-app.herokuapp.com/users/createOrder`,{
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
                      setOrderC(!orderC)
                      alert('order confirmed')
                      sendRequestNotification()
                      navigation.navigate("UserStack")
                      }

              }).catch(err=>console.log('catch',err.message))
    
  })    
  }

const sendRequestNotification = () => {
  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: company.noti_token,
      sound: 'default',
      title: "Order Received",
      body:  "You have a received a order.",
    })
  }).then(res=>res.json()).then(result=>{
    console.log(result)
    if(result.data.status=='ok'){
        SendToDb()
      }
  }).catch(err=>console.log('catch',err.message))
  
  

};



  return (
    <ScrollView style={{flex:1,backgroundColor:colors.white}}>
        <StatusBar barStyle="light-content"  translucent backgroundColor={COLORS.primary}   />
       <View style={styles.topView}>
        <ImageBackground
         style={styles.logo}
         source={require('../assets/logo2.png')}
         resizeMode="cover" >
       </ImageBackground>
      </View>
     <Text style={{color:colors.primary, fontSize:28,fontWeight:'bold',paddingLeft:'30%'}}>Booking Form</Text>
    


     <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:20, fontWeight:'bold',paddingTop:15,paddingLeft:95}}> Selected Date :</Text>
                <Text style={{fontSize:20, fontWeight:'bold',paddingTop:15,color: COLORS.primary}}> {myDate}</Text>
      
    </View>


    {/* Form */}
    <Formik
     initialValues={{event_type:'',
                     no_of_guests:'',
                     menu:'',
                     decor_theme:'',
                     photoShoot_details:'',
                     venue_preference:'',
                     location:'',
                     start_time:'',
                     event_duration:'',
                     available_budget:'',
                     special_instructions:''
                    }}
     onSubmit={values => {
      // console.log(values)
      handleOrder(values)

    }} 
     validationSchema={yup.object().shape({
             
            event_type : yup
            .string()
            .required('Event Type is required.'),  
           
            no_of_guests: yup
            .number()
            .required('Number of guests is required.'),
            
            menu: yup
            .string(),

            decor_theme: yup
            .string(),

            photoShoot_details: yup
            .string(),

            venue_preference: yup
            .string(),

            location: yup
            .string(),
            
            start_time: yup
            .string()
            .required('Start time is required.'), 

            event_duration: yup
            .string()
            .required('Event duration is required.'), 

            available_budget: yup
            .number()
            .required('Budget is required.'), 

            special_instructions : yup
            .string(),
          })}
 >
    {({ handleChange, handleSubmit, values,errors,touched, setFieldTouched }) => (
       <View style={{ alignItems:"center",justifyContent:'center', flex: 1 }}>
       
       <View style={{borderWidth:3, padding:12, marginTop:20,marginBottom:10, borderRadius:20,borderColor:colors.primary}}>
            <TextInput
             style={styles.input}
             name="event_type"
             placeholder='Event Type'
             onChangeText={handleChange('event_type')}
             onBlur={()=>setFieldTouched('event_type')}
             multiline={true}
            value={values.event_type}
           
           /> 
            {touched.event_type && errors.event_type &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.event_type}</Text>
            }
              
          <TextInput
             style={styles.input}
             name="no_of_guests"
            placeholder="Number of Guests"
             onChangeText={handleChange('no_of_guests')}
             onBlur={()=>setFieldTouched('no_of_guests')}
            value={values.no_of_guests}
            keyboardType="numeric"
            multiline={true}
            />
             {touched.no_of_guests && errors.no_of_guests &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.no_of_guests}</Text>
            }




<View style={{flexDirection:'row'}}>

        
<Text style={{color:colors.primary, fontSize:20,paddingLeft:12,paddingTop:8}}>Catering:         </Text>


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
    placeholder='Enter Menu items'
    onChangeText={handleChange('menu')}
    onBlur={()=>setFieldTouched('menu')}
    multiline={true}
    numberOfLines={3}
   textAlignVertical='top'
    value={values.menu}
   
   
  />
   

}


<View style={{flexDirection:'row'}}>

        
<Text style={{color:colors.primary, fontSize:20,paddingLeft:12,paddingTop:8}}>Decoration:     </Text>


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
    name="decor_theme"
    placeholder=' Enter Decor Theme'
    onChangeText={handleChange('decor_theme')}
    onBlur={()=>setFieldTouched('decor_theme')}
    multiline={true}
    numberOfLines={1}
   textAlignVertical='top'
    value={values.decor_theme}
   
  />


}




<View style={{flexDirection:'row'}}>

        
<Text style={{color:colors.primary, fontSize:20,paddingLeft:12,paddingTop:8}}>Photographer:</Text>


         <View style={styles.rightTag}>
               
               <View style={styles.leftTag}>
                   <RadioButton
                     value="yes"
                     status={ photographer === 'yes' ? 'checked' : 'unchecked' }
                     onPress={() => setPhotographer('yes')}
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
                     status={ photographer === 'no' ? 'checked' : 'unchecked' }
                     onPress={() => setPhotographer('no')}
                     uncheckedColor={COLORS.primary}
                     color={COLORS.primary}
                   />
               </View>
               <Text style={{fontSize: 18,color:COLORS.grey, fontWeight: 'bold'}}>No</Text>
               
         </View>

</View>


{
photographer == 'yes' &&

<TextInput
    style={styles.input}
    name="photoShoot_details"
    placeholder='Full event/couple shoot'
    onChangeText={handleChange('photoShoot_details')}
    onBlur={()=>setFieldTouched('photoShoot_details')}
    multiline={true}
    numberOfLines={1}
   textAlignVertical='top'
    value={values.photoShoot_details}
   
  />


}






<View style={{flexDirection:'row'}}>

        
<Text style={{color:colors.primary, fontSize:20,paddingLeft:12,paddingTop:8}}>Venue:              </Text>


         <View style={styles.rightTag}>
               
               <View style={styles.leftTag}>
                   <RadioButton
                     value="yes"
                     status={ venue === 'yes' ? 'checked' : 'unchecked' }
                     onPress={() => setVenue('yes')}
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
                     status={ venue === 'no' ? 'checked' : 'unchecked' }
                     onPress={() => setVenue('no')}
                     uncheckedColor={COLORS.primary}
                     color={COLORS.primary}
                   />
               </View>
               <Text style={{fontSize: 18,color:COLORS.grey, fontWeight: 'bold'}}>No</Text>
               
         </View>

</View>


{
venue == 'yes' &&

<TextInput
    style={styles.input}
    name="venue_preference"
    placeholder=' Enter Venue Preference
    Indoor/Outdoor/Hall/Beach'
    onChangeText={handleChange('venue_preference')}
    onBlur={()=>setFieldTouched('venue_preference')}
    multiline={true}
    numberOfLines={2}
   textAlignVertical='top'
    value={values.venue_preference}
   
  />


}
{
venue == 'no' &&

<TextInput
    style={styles.input}
    name="location"
    placeholder='Enter your selected Event location'
    onChangeText={handleChange('location')}
    onBlur={()=>setFieldTouched('location')}
    multiline={true}
    numberOfLines={2}
   textAlignVertical='top'
    value={values.location}
   
  />


}
{/* {
  touched.venue_preference && errors.venue_preference && venue=='yes' &&
  <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.venue_preference}</Text>
           
} */}



            <TextInput
             style={styles.input}
             name="start_time"
             placeholder='Event start time'
             onChangeText={handleChange('start_time')}
             onBlur={()=>setFieldTouched('start_time')}
             value={values.start_time}
             multiline={true}
           
           />
           {touched.start_time && errors.start_time &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.start_time}</Text>
            }


            <TextInput
             style={styles.input}
             name="event_duration"
             placeholder='Event Duration'
             onChangeText={handleChange('event_duration')}
             onBlur={()=>setFieldTouched('event_duration')}
             value={values.event_duration}
             multiline={true}
           
           />
           {touched.event_duration && errors.event_duration &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.event_duration}</Text>
            }







            
            <TextInput
             style={styles.input}
             name="available_budget"
            placeholder="Available Budget"
             onChangeText={handleChange('available_budget')}
             onBlur={()=>setFieldTouched('available_budget')}
            value={values.available_budget}
            keyboardType="numeric"
            multiline={true}
            />
            {touched.available_budget && errors.available_budget &&
              <Text style={{ justifyContent:'center',alignContent:'center', fontSize: 18, color: 'red'}}>{errors.available_budget}</Text>
            }
            
           <Tooltip
           animated={true}
           arrowSize={{width: 11, height: 8}}
           backgroundColor="rgba(0,0,0,0.2)"
           isVisible={toolTipVisible}
           content={<Text>Let us know if you want anything else other than above specified things: Like Flowers and so on.</Text>}
           placement="top"
           onClose={() => setToolTipVisible(false)}
           >
           <View style={styles.inputContainer} > 
          
            <TextInput
             style={styles.inputInstruction}
             name="special_instructions"
             placeholder='Special instructions '
             onChangeText={handleChange('special_instructions')}
             onBlur={()=>setFieldTouched('special_instructions')}
             value={values.special_instructions}
             multiline={true}/>
              <MaterialCommunityIcons name="help"  size={20} style={styles.icon}   onPress={() => setToolTipVisible(true)}/>   
             </View> 
          </Tooltip>
       


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
  marginLeft: 6,
  // paddingBottom:5,
}, 
  topView:{
  
    paddingTop:"2%",
    paddingLeft:"25%",
    width:410,
    height:170,
    
   },

 logo: {
  width: 200,
  height: 200,


},
   
   input:{
  borderColor :COLORS.white,
  margin:7,
  padding:12,
  width:280,
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
     marginBottom:30
     
   },
   container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  icon:{
    color:colors.primary,

   
    },
    inputContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      borderColor :COLORS.white,
      margin:7,
      padding:12,
      width:280,
      fontSize:20,
      borderWidth:2,
      elevation:20,
      borderRadius:15,
      backgroundColor:'white'
      
     },
     inputInstruction:{
      borderColor :COLORS.white,
      fontSize:20,
      borderWidth:2,
       },
    

});

export default BookingForm