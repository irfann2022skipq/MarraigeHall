import React from 'react'
import {useContext} from 'react';
import { View, Text, ImageBackground,Image, TouchableOpacity} from 'react-native'
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';
import WelcomeScreen from '../screens/WelcomeScreen'
import * as SecureStore from 'expo-secure-store';


import {UserContext} from '../Contexts'


const CustomDrawer = (props) => {

    const [user,setUser] = useContext(UserContext)


if(user.role == 'customer'){
  return (
      <View style={{flex:1}}>

                <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: 'purple'}}>
                
                            <ImageBackground source={require('../assets/bg.jpg')} style={{padding:20}}>
                                <Image source={{ uri: user.image }} 
                                style={{height:100, width:100,borderRadius:60, marginBottom:10}}/>
                                <Text style={{color:'#fff',fontSize:24,fontFamily:'',marginLeft:20}}>{user.username}</Text>
                            </ImageBackground>

                            <View style={{flex:1, backgroundColor:'#fff', paddingTop: 10}}>
                                <DrawerItemList {...props} />
                            </View>

                </DrawerContentScrollView>

                <View style={{paddingTop:8,padding :20, height:110, borderTopWidth:1, borderTopColor:'#ccc' }}>

                    {/* <TouchableOpacity onPress={()=>{}} style={{paddingVertical:15}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                         <FontAwesome name='share-alt' size={22} color='grey'/>
                          <Text>    Share with friends</Text> 
                    </View>
                    </TouchableOpacity> */}
                    
                    <TouchableOpacity onPress={()=>{
                                                    SecureStore.setItemAsync('token',' ')
                                                    props.navigation.navigate(WelcomeScreen)
                                              }} 
                    style={{paddingVertical:15}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                         <FontAwesome name='sign-out' size={22} color='grey'/>
                          <Text>    Sign out</Text> 
                    </View>
                    </TouchableOpacity>
                    
                </View>

      </View>   
   
  )
}else if(user.role == 'company'){
    return (
        <View style={{flex:1}}>
  
                  <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: 'purple'}}>
                  
                              <ImageBackground source={require('../assets/bg.jpg')} style={{padding:10}} >
                                  <Image source={{ uri: user.image }} 
                                  style={{height:130, width:'96%', marginBottom:15,marginLeft:5}}/>
                                  <Text style={{color:'#fff',fontSize:24,fontFamily:''}}>  {user.company_name}</Text>
                              </ImageBackground>
  
                              <View style={{flex:1, backgroundColor:'#fff', paddingTop: 10}}>
                                  <DrawerItemList {...props} />
                              </View>
  
                  </DrawerContentScrollView>
  
                  <View style={{paddingTop:8,padding :20, height:110, borderTopWidth:1, borderTopColor:'#ccc' }}>
  
                      {/* <TouchableOpacity onPress={()=>{}} style={{paddingVertical:15}}>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                           <FontAwesome name='share-alt' size={22} color='grey'/>
                            <Text>    Share with friends</Text> 
                      </View>
                      </TouchableOpacity> */}
                      
                      <TouchableOpacity onPress={()=>{
                                                      SecureStore.setItemAsync('token',' ')
                                                      props.navigation.navigate(WelcomeScreen)
                                                }} 
                                                
                      style={{paddingVertical:15}}>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                           <FontAwesome name='sign-out' size={22} color='grey'/>
                            <Text>    Sign out</Text> 
                      </View>
                      </TouchableOpacity>
                      
                  </View>
  
        </View>   
     
    )
}else if(user.role == 'vendor'){
    return (
        <View style={{flex:1}}>
  
                  <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: 'purple'}}>
                  
                              <ImageBackground source={require('../assets/bg.jpg')} style={{padding:10}}>
                                  <Image source={{ uri: user.image }} 
                                  style={{height:130, width:'96%', marginBottom:15,marginLeft:5}}/>
                                  <Text style={{color:'#fff',fontSize:24,fontFamily:''}}>{user.vendor_name}</Text>
                              </ImageBackground>
  
                              <View style={{flex:1, backgroundColor:'#fff', paddingTop: 10}}>
                                  <DrawerItemList {...props} />
                              </View>
  
                  </DrawerContentScrollView>
  
                  <View style={{paddingTop:8,padding :20, height:110, borderTopWidth:1, borderTopColor:'#ccc' }}>
  
                      {/* <TouchableOpacity onPress={()=>{}} style={{paddingVertical:15}}>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                           <FontAwesome name='share-alt' size={22} color='grey'/>
                            <Text>    Share with friends</Text> 
                      </View>
                      </TouchableOpacity> */}
                      
                      <TouchableOpacity onPress={()=>{
                                                      SecureStore.setItemAsync('token',' ')
                                                      props.navigation.navigate(WelcomeScreen)
                                                }} 
                      style={{paddingVertical:15}}>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                           <FontAwesome name='sign-out' size={22} color='grey'/>
                            <Text>    Sign out</Text> 
                      </View>
                      </TouchableOpacity>
                      
                  </View>
  
        </View>   
     
    )
}
}

export default CustomDrawer