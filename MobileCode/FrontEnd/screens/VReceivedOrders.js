import React from 'react';
import {useState,useEffect,useContext} from 'react';
import {Dimensions,FlatList,SafeAreaView, ScrollView, StyleSheet, Text,View,   Image,Animated,Button,TouchableOpacity,StatusBar} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '../components/colors';

import {OrderContext} from '../Contexts'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const {width}= Dimensions.get('screen');
const cardWidth=width/1.1;

const VReceivedOrders=()=>{
 

  const [myOrders, setMyOrders] = React.useState([]);
  const [orderC,setOrderC] = useContext(OrderContext)

  useEffect(()=>{

    
    SecureStore.getItemAsync('token').then(token=>{

      console.log('Received Orders',token)

      fetch(`https://bluejay-mobile-app.herokuapp.com/vendor/rec_Orders`,{
                    method: "get",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        token
                    }
                  
              }).then(res=>res.json()).then(result=>{
                console.log(result)

                if( result.status == 'ok'){
                         setMyOrders(result.data)
                        if(result.data == ''){
                            console.log('No orders found')
                            // alert('No orders yet')
                        }
                }else{
                  console.log(result.status)
                }

              }).catch(err=>console.log('catch',err.message))
    })    


   },[orderC]);



   const acceptOrder = (o_id)=>{

    SecureStore.getItemAsync('token').then(token=>{

      console.log('Accept Order',token,o_id)

      const value = {o_id: o_id}

      fetch(`https://bluejay-mobile-app.herokuapp.com/vendor/approveOrder`,{
                    method: "patch",
                    body: JSON.stringify(value),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        token
                    }
                  
              }).then(res=>res.json()).then(result=>{
                console.log(result)

                if( result.status == 'ok'){

                        setOrderC(!orderC)
                        alert('Order moved to My Orders')
                }else{
                  console.log(result.status)
                }

              }).catch(err=>console.log('catch',err.message))

    })    

   }


   const rejectOrder = (o_id)=>{

    SecureStore.getItemAsync('token').then(token=>{

      console.log('Reject Order',token,o_id)

      const value = {o_id: o_id}

      fetch(`https://bluejay-mobile-app.herokuapp.com/vendor/rejectOrder`,{
                    method: "patch",
                    body: JSON.stringify(value),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        token
                    }
                  
              }).then(res=>res.json()).then(result=>{
                console.log(result)

                if( result.status == 'ok'){
                        setOrderC(!orderC)
                }else{
                  console.log(result.status)
                }

              }).catch(err=>console.log('catch',err.message))

    })    

   }




  
// Card

const Card=({order})=>{
  const navigation = useNavigation();
  
  function handleClick(){
    // console.log("Card clicked")
     navigation.navigate('VendorOrderDetails',{order})
  }
if(order){
return(
   
      <TouchableOpacity style={{...style.card}} onPress={handleClick}>



           <View style={{flexDirection:'row'}}>
                 
                  <Text style={{ marginLeft:20, marginTop:20}}>
                          <Text style={{color:COLORS.primary,fontSize:24, fontWeight:"bold"}}>Order :</Text>{'\n'}{'\n'}
                          <Text style={{fontSize:20, fontWeight:"bold"}}>Event: </Text> <Text style={{fontSize:20}}>{order.event_type}</Text>{'\n'}{'\n'}
                          <Text style={{fontSize:20,fontWeight:"bold"}}>Date:</Text> <Text style={{fontSize:20}}>{order.date}</Text>
                          <Text style={{fontWeight:"bold",fontSize:22,paddingLeft:100}}>                 {order.status}</Text>{'\n'}
                         
            
                 </Text>

          </View>

      
   
           <View style={{flexDirection:'row'}}>
               
           <Text style={{fontWeight:"bold",fontSize:20,paddingLeft:15,paddingTop:2}}> Total :</Text><Text style={{fontSize:20,paddingLeft:15,paddingTop:2}}>{order.available_budget}</Text>
                          

                <View  style={{paddingLeft:50}}>
                <Button
                onPress={()=>{acceptOrder(order._id)}}
                title="Accept"
                color={COLORS.primary}
                /> 
                </View>

               <View style={{paddingLeft:15, borderRadius:12}}>
                <Button  
                onPress={()=>{rejectOrder(order._id)}}
                title="Reject"
                color={COLORS.primary}/>
              </View>
        
               
          </View>
        

    </TouchableOpacity>
    
    
    

)
}
else{
  return(
    <>
    </>
  )
}
};



    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
      
      
    
         <View>
         <Animated.FlatList
          data={myOrders}
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent:'center',
            alignItems:'center',
            
          }}
          renderItem={({item}) => <Card order={item}  />}
        />
        </View>


     </SafeAreaView>
   
 )
}

const style = StyleSheet.create({

    card: {
      height: 210,
      width: cardWidth,
      elevation: 35,
      borderRadius: 15,
      marginBottom:10,
      marginTop:10,
      backgroundColor: COLORS.white,
      
    }
   
  });

export default VReceivedOrders;