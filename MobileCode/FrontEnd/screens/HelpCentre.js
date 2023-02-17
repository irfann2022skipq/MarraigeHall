import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView ,Button,Image,StatusBar, InputAccessoryView} from 'react-native'
import colors from '.././components/colors';
import React,{useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';



const HelpCentre= ({navigation}) => {

  




  return (
    <View style={{flex:1, backgroundColor:'#fff', }} contentContainerStyle={{justifyContent:'center',
    alignItems:'center'}} >
   

   <View style={{marginTop:15, marginLeft:15}}>

     
         <Text style={{marginBottom:20, fontSize:24, fontWeight:'bold', color:'red'}}>
          How can we help?
         </Text>
      

    <View  style={styles.options}> 
    <MaterialCommunityIcons name="account"  size={34} style={styles.icon}/> 
    <TouchableOpacity style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}
    onPress={()=> navigation.navigate('MyAccount') } >
    <Text style={{  fontSize: 23,  color: colors.dark,   }}> Update My Account</Text>
    <MaterialCommunityIcons name="arrow-right"  size={34} style={styles.icon}/> 
    </TouchableOpacity>
    </View>

    <View  style={styles.options}> 
    <MaterialCommunityIcons name="medical-bag"  size={34} style={styles.icon}/> 
    <TouchableOpacity style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}
    onPress={()=> navigation.navigate('SafetyConcerns') } >
    <Text style={{  fontSize: 23,  color: colors.dark,   }}> Safety Concerns</Text>
    <MaterialCommunityIcons name="arrow-right"  size={34} style={styles.icon}/> 
    </TouchableOpacity>
    </View>

    <View  style={styles.options}> 
    <MaterialCommunityIcons name="cash-refund"  size={34} style={styles.icon}/> 
    <TouchableOpacity style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}
    onPress={()=> navigation.navigate('PaymentsandRefunds') } >
    <Text style={{  fontSize: 23,  color: colors.dark,   }}> Payments and Refunds</Text>
    <MaterialCommunityIcons name="arrow-right"  size={34} style={styles.icon}/> 
    </TouchableOpacity>
    </View>

    <View  style={styles.options}> 
    <MaterialCommunityIcons name="onepassword"  size={34} style={styles.icon}/> 
    <TouchableOpacity style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}
    onPress={()=> navigation.navigate('ForgotPassword') } >
    <Text style={{  fontSize: 23,  color: colors.dark,   }}>Forgot my Password?</Text>
    <MaterialCommunityIcons name="arrow-right"  size={34} style={styles.icon}/> 
    </TouchableOpacity>
    </View>


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
export default HelpCentre;