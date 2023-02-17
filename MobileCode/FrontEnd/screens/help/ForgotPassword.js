import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView ,Button,Image,StatusBar, InputAccessoryView} from 'react-native'
import colors from '../../components/colors';
import React,{useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';



const ForgotPassword= ({navigation}) => {

  




  return (
    <View style={{flex:1, backgroundColor:'#fff', }} contentContainerStyle={{justifyContent:'center',
    alignItems:'center'}} >
   

   <View style={{marginTop:15, marginLeft:15}}>

     
         <Text style={{marginBottom:20,paddingTop:40, fontSize:20, fontWeight:'bold', }}>
         To reset your password follow the steps:
         </Text>
      

    <View  style={styles.options}> 
    <Text style={{fontSize:22, fontWeight:'bold',color: colors.primary,  }}>1.</Text>
    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
    <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2 }}>Go to the Login Screen.</Text>
    </View>
    </View>

    <View  style={styles.options}> 
    <Text style={{fontSize:22, fontWeight:'bold',color: colors.primary, }}>2.</Text>
    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
    <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2   }}>Click on "Forgot Password".</Text>
    </View>
    </View>

    <View  style={styles.options}> 
    <Text style={{fontSize:22, fontWeight:'bold',color: colors.primary,  }}>3.</Text>
    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
    <Text style={{  fontSize: 19,  color: colors.dark, marginLeft:2  }}>Enter your email address.</Text>
    </View>
    </View>

    <View  style={styles.options}> 
    <Text style={{fontSize:22, fontWeight:'bold',color: colors.primary,  }}>4.</Text>
    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
    <Text style={{  fontSize: 19,  color: colors.dark ,marginLeft:2  }}>You will receive an email with instructions on how to reset your password.</Text>
    </View>
    </View>

  

    

   

     <View style={styles.textContainer}>
         <Text style={{fontSize:20,fontWeight: 'bold' }}>Be careful and not to share your password with anyone. Our Customer care team will never ask for your password.</Text>
      </View>


      <View style={styles.textContainer}>
         <Text style={{fontSize:20, fontWeight: 'bold'}}>Was this helpful?</Text>
      </View>


     </View>

           <View style={styles.buttonContainer}> 
            <TouchableOpacity  style={styles.editButton}>
            <Text style={{  fontSize: 23,    color: colors.primary,   }}> Yes, I got my answer </Text>
            </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}> 
            <TouchableOpacity  style={styles.editButton}>
            <Text style={{  fontSize: 23,    color: colors.primary,   }}> No, add more information </Text>
            </TouchableOpacity>
            </View>

  
    
 </View>
  );
}

const styles = StyleSheet.create({
  

 

 
 


options: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop:12,
  padding:10,
  // marginRight:50,
  width:'95%',
  borderColor :colors.white,
  elevation:20,
  borderRadius:15,
  backgroundColor:colors.white
  },

  buttonContainer:{
      justifyContent:'center',
      alignItems:'center',
      
 
  },
  
editButton:{
  justifyContent:'center',
  alignItems:'center',
  marginTop:30,
  padding:10,
  width:'80%',
  borderColor :colors.primary,
  borderWidth:2,
  elevation:15,
  borderRadius:15,
  backgroundColor:colors.white,
},
 inputContainer:{
  flexDirection:'row',
  // color:colors.white, 

 },
textContainer:{
  justifyContent:'center',
  alignItems:'center',
  marginTop:40,
},

});
export default ForgotPassword;