import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView ,Button,Image,StatusBar, InputAccessoryView} from 'react-native'
import colors from '../../components/colors';
import React,{useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';



const PaymentsandRefunds= ({navigation}) => {

  




  return (
    <View style={{flex:1, backgroundColor:'#fff', }} contentContainerStyle={{justifyContent:'center',
    alignItems:'center'}} >
   

   <View style={{marginTop:15, marginLeft:15}}>

     
         <Text style={{marginBottom:20, fontSize:24,paddingTop:30, fontWeight:'bold', }}>
         Payment and Refund
         </Text>
      

   

     </View>

  
    
 </View>
  );
}

const styles = StyleSheet.create({
  

 

 
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
 inputContainer:{
  flexDirection:'row',
  // color:colors.white, 

 },


});
export default PaymentsandRefunds;