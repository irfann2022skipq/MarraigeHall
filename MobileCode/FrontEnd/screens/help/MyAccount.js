import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView ,Button,Image,StatusBar, InputAccessoryView} from 'react-native'
import colors from '../../components/colors';
import React,{useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';



const MyAccount= ({navigation}) => {

  




  return (
    <View style={{flex:1, backgroundColor:'#fff', }} contentContainerStyle={{justifyContent:'center',
    alignItems:'center'}} >
   

   <View style={{marginTop:15, marginLeft:15}}>

     
         <Text style={{marginBottom:20,marginTop:40, fontSize:22, fontWeight:'bold', }}>
         Please follow the steps below to change you profile details:
         </Text>
      

    <View  style={styles.options}> 
    <Text style={{fontSize:22, fontWeight:'bold',color: colors.primary,  }}>1.</Text>
    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
    <Text style={{ fontSize: 18,  color: colors.dark, marginLeft:2,marginTop:8,marginBottom:8 }}>Login to your account via our mobile app.</Text>
    </View>
    </View>

    <View  style={styles.options}> 
    <Text style={{fontSize:22, fontWeight:'bold',color: colors.primary, }}>2.</Text>
    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
    <Text style={{  fontSize: 19,  color: colors.dark, marginLeft:2 ,marginTop:8,marginBottom:8  }}>Go to Profile from side menu.</Text>
    </View>
    </View>

    <View  style={styles.options}> 
    <Text style={{fontSize:22, fontWeight:'bold',color: colors.primary,  }}>3.</Text>
    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
    <Text style={{  fontSize: 19,  color: colors.dark, marginLeft:2 ,marginTop:8,marginBottom:8 }}>Click on edit profile.</Text>
    </View>
    </View>

    <View  style={styles.options}> 
    <Text style={{fontSize:22, fontWeight:'bold',color: colors.primary,  }}>4.</Text>
    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
    <Text style={{  fontSize: 19,  color: colors.dark ,marginLeft:2,marginTop:8,marginBottom:8  }}>Change any of the desired field.</Text>
    </View>
    </View>

    <View  style={styles.options}> 
    <Text style={{fontSize:22, fontWeight:'bold',color: colors.primary,  }}>5.</Text>
    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
    <Text style={{  fontSize: 19,  color: colors.dark, marginLeft:2 ,marginTop:8,marginBottom:8 }}>Click on update button.</Text>
    </View>
    </View>

    

   

     <View style={styles.textContainer}>
         <Text style={{fontSize:20, }}>Was this helpful?</Text>
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
  marginTop:10,
  padding:7,
  width:'100%',
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
  marginTop:35,
},

});
export default MyAccount;