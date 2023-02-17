import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView ,Button,Image,StatusBar, InputAccessoryView} from 'react-native'
import colors from '../../components/colors';
import { Formik } from 'formik';
import * as yup from 'yup';
import { RadioButton } from 'react-native-paper';
import React,{useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';



const SafetyConcerns= ({navigation}) => {
  const [checked, setChecked] = React.useState('')
  const [orderNumber, setOrderNumber]=React.useState('')
  
  console.log(checked)



  return (
    <View style={{flex:1, backgroundColor:'#fff', }} contentContainerStyle={{justifyContent:'center',
    alignItems:'center'}} >
   

   <View style={{marginTop:15, marginLeft:15}}>

     
         <Text style={{marginBottom:18,fontWeight:'bold', fontSize:20 ,marginTop:50 }}>
         We want you to have a seamless experience with your order.If you have safety issues with you order or company, please reach out to us below, we will get back to you as soon as possible.
         </Text>
      

   

  <View  style={styles.options}> 
    <RadioButton
     value="harassment"
     status={ checked === 'harassment' ? 'checked' : 'unchecked' }
     onPress={() => setChecked('harassment')}
     uncheckedColor={colors.primary}
     color={colors.primary} />
    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
    <Text style={{  fontSize: 18,  color: colors.dark,   }}>Harassment involving my order</Text>
    </View>
  </View>

  <View  style={styles.options}> 
    <RadioButton
     value="data_privacy"
     status={ checked === 'data_privacy' ? 'checked' : 'unchecked' }
     onPress={() => setChecked('data_privacy')}
     uncheckedColor={colors.primary}
     color={colors.primary} />
    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
    <Text style={{  fontSize: 18,  color: colors.dark,   }}>Data Privacy Concerns</Text>
    </View>
  </View>

  <View  style={styles.options}> 
    <RadioButton
     value="food_hygiene"
     status={ checked === 'food_hygiene' ? 'checked' : 'unchecked' }
     onPress={() => setChecked('food_hygiene')}
     uncheckedColor={colors.primary}
     color={colors.primary} />
    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
    <Text style={{  fontSize: 18,  color: colors.dark,   }}>Food Hygiene Concerns</Text>
    </View>
  </View>

  <Text style={{marginTop:30, fontSize:18,fontWeight:'bold', }}>Enter your order number (if relevant):    </Text>

 


     </View>

     {/* Formik */}

     <Formik
      initialValues={{ordernumber:'',details:''}}
      onSubmit={
        (values) => {
        console.log(values)}}
          validationSchema={yup.object().shape({
            ordernumber : yup
             .string(), 
             details:yup
             .string()  
               
          })}    >
      {({ handleChange, handleSubmit, values,errors,touched, setFieldTouched }) => (
    <View>
        <View style={styles.inputContainer} >
            <TextInput
             style={styles.input}
             name="ordernumber"
             placeholder='Enter Order Number'
             onChangeText={handleChange('ordernumber')}
             onBlur={()=>setFieldTouched('ordernumber')}
             value={values.ordernumber}
           /></View>
            {touched.ordernumber && errors.ordernumber &&
              <Text style={{ marginLeft:70,fontSize: 18, color: 'red' }}>{errors.ordernumber}</Text>
            }
           {/* Further Details */}
            <Text style={{marginTop:30, marginLeft:10, fontSize:18,fontWeight:'bold', }}>Further Details:   </Text>
             
            <View style={styles.inputContainer} >
            <TextInput
             style={styles.input}
             name="details"
             placeholder='Enter Further Details'
             onChangeText={handleChange('details')}
             onBlur={()=>setFieldTouched('details')}
             value={values.details}
           /></View>
            {touched.details && errors.details &&
              <Text style={{ marginLeft:70,fontSize: 18, color: 'red' }}>{errors.details}</Text>
            }


           {/* Button  */}
            
           <View style={styles.buttonContainer}> 
            <TouchableOpacity onPress={()=>{  handleSubmit}} style={styles.editButton}>
            <Text style={{  fontSize: 25,  fontWeight: 'bold',  color: colors.white,   }}> Submit</Text>
            </TouchableOpacity>
            </View>


            </View>
     )}
    </Formik>
    
  
    
 </View>
  );
}

const styles = StyleSheet.create({
  

  input:{
    borderColor :colors.white,
    margin:6,
    padding:13,
    width:'95%',
    fontSize:20,
    borderWidth:2,
    elevation:20,
    borderRadius:15,
    backgroundColor:colors.white
   },
   inputContainr:{
    flexDirection:'row',
    color:colors.white, 
   },

 
 icon:{
 color:colors.primary,
 margin:20,

 },


options: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop:10,
  width:'98%',
  borderColor :colors.white,
  elevation:20,
  borderRadius:15,
  backgroundColor:colors.white
  },

  buttonContainer:{
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
 
  },
 
editButton:{
  justifyContent:'center',
  alignItems:'center',
  marginTop:40,
  width:280,
  borderColor :colors.primary,
  borderWidth:4,
  elevation:15,
  borderRadius:15,
  backgroundColor:colors.primary,
},


 inputContainer:{
  flexDirection:'row',

 },


});
export default SafetyConcerns;