import React from 'react'
import {Dimensions,FlatList,SafeAreaView, ScrollView, StyleSheet, Text,View,Image,Animated,Button,TouchableOpacity,StatusBar} from 'react-native';
import colors from '.././components/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useState, useEffect,useContext}  from 'react'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import {UserContext} from '../Contexts'
import {OrderContext} from '../Contexts'


const {width}= Dimensions.get('screen');
const cardWidth=width/1.1;


const Notifications = () => {



   const [notiData, setNotiData] = useState([]);
  const [orderC,setOrderC] = useContext(OrderContext)
  const [user,setUser] = useContext(UserContext)

   useEffect(()=>{

      let route = ''
  
      if(user.role=='customer'){
        route = 'users'
        console.log(route)
      }else if(user.role=='company'){
        route = 'company'
        console.log(route)
      }else if(user.role=='vendor'){
        route = 'vendor'
        console.log(route)
      }

    
      SecureStore.getItemAsync('token').then(token=>{
  
        console.log('Noti Data',token)
  
        fetch(`https://bluejay-mobile-app.herokuapp.com/${route}/getNotiData`,{
                      method: "get",
                      headers: {
                          Accept: "application/json, text/plain, */*",
                          "Content-Type": "application/json",
                          token
                      }
                    
                }).then(res=>res.json()).then(result=>{
                  console.log(result)
  
                  if( result.status == 'ok'){
                           setNotiData(result.data.notifications)
                        //   if(result.data == ''){
                        //       console.log('No Notifications yet')
                              // alert('No Notifications yet')
                        //   }
                  }
  
                }).catch(err=>console.log('catch',err.message))
      })    
  
  
     },[orderC]);
 
     

const Card=({noti})=>{

    return(
        
       
            <View  style={styles.notificationContainer} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}> 
               <Image source={require('.././assets/order1.png')} style={styles.profileImage} />
               <View style={{ margin:20, }}>
               <Text style={{  fontSize: 23,  color: colors.primary,fontStyle:'italic', marginBottom:10   }}>{noti.title}</Text>
               <Text style={{  fontSize: 20,  color: colors.dark, paddingRight:60 }}>{noti.description}</Text>
               </View>
            </View>
     
        
    
    )
      
    };
    
    
     

  
  return (
   
<>



    <SafeAreaView style={{flex:1, backgroundColor:colors.white,}} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
      
    
            <View>
            <Animated.FlatList
            data={notiData}
            vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
               justifyContent:'center',
               alignItems:'center',
               
            }}
            renderItem={({item}) => <Card noti={item}  />}
         />
         </View>


 </SafeAreaView>


</>


  )
}

const styles = StyleSheet.create({
notificationContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   height:130,
   marginTop:10,
   marginBottom:10,
   width:cardWidth,
   borderColor :colors.white,
   elevation:20,
   borderRadius:25,
   backgroundColor:colors.grey
   },
 
 
  profileImage:{
  height: '55%',
    width: '20%',
    borderRadius: 100,
    marginLeft:8,

 },
 });

export default Notifications