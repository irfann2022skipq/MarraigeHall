import React from 'react';
import {Dimensions,Alert,FlatList,SafeAreaView, ScrollView, StyleSheet, Text,View,   Image,Animated,Button,TouchableOpacity,StatusBar} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useState,useEffect,useContext} from 'react';
import COLORS from '../components/colors';
import colors from '../components/colors';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import {OrderContext} from '../Contexts'


const {width}= Dimensions.get('screen');
const cardWidth=width/1.12;

const AcceptedOrders=({navigation})=>{
 
  const [orderC,setOrderC] = useContext(OrderContext)
  const [myOrders, setMyOrders] = React.useState([]);
  const [completedOrder, setCompletedOrder] = React.useState([]);


  const categories = ['Current', 'Completed'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  

  useEffect(()=>{

    
    SecureStore.getItemAsync('token').then(token=>{

      console.log('My orders',token)

      fetch(`https://bluejay-mobile-app.herokuapp.com/company/myOrders`,{
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

    completedOrders()
   },[orderC]);

   

   const completedOrders = ()=>{

    SecureStore.getItemAsync('token').then(token=>{

      console.log('Completed orders',token)

      fetch(`https://bluejay-mobile-app.herokuapp.com/company/completedOrders`,{
                    method: "get",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        token
                    }
                  
              }).then(res=>res.json()).then(result=>{

                if( result.status == 'ok'){
                  setCompletedOrder(result.data)
                        if(result.data == ''){
                            console.log('No completed orders found')
                            alert('No completed orders yet')
                        }
                }else{
                  console.log(result.status)
                }

              }).catch(err=>console.log('catch',err.message))
    })    
   }




const showcompleteAlert = (o_id)=>{
    // console.log(o_id)
 Alert.alert(
  "Are your sure?",
  "Are you sure you want to complete this order?",
  [
    
    {
      text: "Yes",
      onPress: ()=>{checkSubOrders(o_id)}
    },
    
    {
      text: "No",
      onPress: () => {
        console.log('order not completed')
      },
    },
  ]
);

}

const checkSubOrders= (o_id)=>{

  SecureStore.getItemAsync('token').then(token=>{

    console.log('check Sub Order Complete',token,o_id)

    const value = {o_id: o_id}

    fetch(`https://bluejay-mobile-app.herokuapp.com/company/checkSubComplete`,{
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
                    completeOrder(o_id)
                   
              }else{
                console.log(result.error)
                alert('Cant complete the order because Vendor orders are not completed yet')
              }

            }).catch(err=>console.log('catch',err.message))

  })    

}

const completeOrder= (o_id)=>{

  SecureStore.getItemAsync('token').then(token=>{

    console.log('Complete Order',token,o_id)

    const value = {o_id: o_id}

    fetch(`https://bluejay-mobile-app.herokuapp.com/company/completeOrder`,{
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
                      alert('Order completed sucessfully')
                      setOrderC(!orderC)
              }else if(result.status == 'date-error'){
                      alert(`You can't complete this order yet`)
              }else{
                console.log(result.status)
              }

            }).catch(err=>console.log('catch',err.message))

  })    


}

const showdeleteAlert = (o_id)=>{
        // console.log(o_id)
     Alert.alert(
      "Are your sure?",
      "Are you sure you want to cancell this order?",
      [
        
        {
          text: "Yes",
          onPress: ()=>{cancelOrder(o_id)}
        },
        
        {
          text: "No",
          onPress: () => {
            console.log('order not cancelled')
          },
        },
      ]
    );

   }



const cancelOrder = (o_id)=>{
    

    
    SecureStore.getItemAsync('token').then(token=>{

      console.log('Cancell Order',token,o_id)

      const value = {o_id: o_id}

      fetch(`http://10.0.2.2:5000/company/cancelOrder`,{
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


   const CategoryList = () => {

    return (
      <View style={style.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedCategoryIndex(index)
              console.log(index,item)
              if(item=='Current'){
                setOrderC(!orderC)
              }else if(item=='Completed'){
                completedOrders()
              }
            
            }}>
  
            <View>
  
                  <Text
                    style={{
                      ...style.categoryListText,
                      color:
                        selectedCategoryIndex == index
                          ? colors.primary
                          : colors.grey,
                    }}>{item}</Text>
  
              {selectedCategoryIndex == index && (
                <View
                  style={{
                    height: 3,
                    width: 30,
                    backgroundColor: colors.primary,
                    marginTop: 2,
                  }}
                />
  
              )}
  
            </View>
  
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  




// Card

const Card=({order})=>{

  const navigation = useNavigation();
  
  function handleClick(){
    // console.log("Card clicked")
    navigation.navigate('HireVendors',{order})
  }

  if(order){

return(
   
    <TouchableOpacity style={{...style.card}} onPress={handleClick}>
      

          <View style={style.completeTag}>
                  <View style={{color:COLORS.white }}>
                  <MaterialCommunityIcons name="check" size={35} color={ COLORS.white} onPress={()=>{showcompleteAlert(order._id)}}/>
                  </View>
          </View>
          <View style={style.priceTag}>
                  <View style={{color:COLORS.white }}>
                  <MaterialCommunityIcons name="delete-outline" size={30} color={ COLORS.white} onPress={()=>{showdeleteAlert(order._id)}}/>
                  </View>
          </View>

      
    
          <View style={{flexDirection:'row'}}>
                
                  <Text style={{ marginLeft:20, marginTop:25,marginBottom:20}}>

                  <Text style={{color:COLORS.primary,fontSize:22, fontWeight:"bold"}}>Order :</Text>{'\n'}{'\n'}
            
                  <Text style={{fontSize:20, fontWeight:"bold"}}>Event: </Text> <Text style={{fontSize:20}}>{order.event_type}</Text>{'\n'}{'\n'}
                 
                  <Text style={{fontSize:20,fontWeight:"bold"}}>Date:</Text> <Text style={{fontSize:20}}>{order.date}</Text>
                  
                  <Text style={{fontWeight:"bold",fontSize:22,paddingTop:20}}>                 {order.status}</Text>{'\n'}{'\n'}
                  
                  <Text style={{fontWeight:"bold",fontSize:20,paddingLeft:15}}>Total :</Text> <Text style={{fontSize:20}}> Rs.{order.available_budget}</Text>
            
                  
                  </Text>
          </View>


    </TouchableOpacity> 

)

}else{
  return(
    <>
    </>
  )
}
};




const CompletedCard=({order})=>{

  const navigation = useNavigation();
  
  function handleClick(){
    navigation.navigate('CompanyOrderDetails',{order})
  }
  if(order){

    return(
       
        <TouchableOpacity style={{...style.card}} onPress={handleClick}>
        
        
              <View >
                    
                      <Text style={{ marginLeft:20, marginTop:25}}>
    
                      <Text style={{color:COLORS.primary,fontSize:22, fontWeight:"bold"}}>Order :</Text>
    
                      <Text style={{fontWeight:"bold",fontSize:22}}>                         {order.status}</Text>{'\n'}{'\n'}
              
                      <Text style={{fontSize:20, fontWeight:"bold"}}>Event: </Text> <Text style={{fontSize:20}}>{order.event_type}</Text>  {'\n'}{'\n'}
    
                      <Text style={{fontSize:20,fontWeight:"bold"}}>Date:</Text> <Text style={{fontSize:20}}>{order.date}</Text>{'\n'}{'\n'}
                    
                      <Text style={{fontWeight:"bold",fontSize:20,paddingLeft:15}}>Total :</Text> <Text style={{fontSize:20}}> Rs.{order.available_budget}</Text>
                
                    
                      </Text>
    
                        <TouchableOpacity  
                         style={style.editButton}
                         onPress={()=>{ navigation.navigate('RateVendors',{order}) 
                         }} 
                         >
                        <Text style={{  fontSize: 20,  fontWeight: 'bold',  color: COLORS.white,   }}> Rate Vendors </Text>
                        </TouchableOpacity>
             
                     
              </View>
    
             
    
    
        </TouchableOpacity> 
    
    )
    
    }else{
      return(
        <>
        </>
      )
    }
};


    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
      
      <CategoryList/>

      {selectedCategoryIndex == 0 &&
         <View style={{marginBottom:40}}>
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
      }

      {selectedCategoryIndex == 1 &&
         <View style={{marginBottom:40}}>
         <Animated.FlatList
          data={completedOrder}
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
          justifyContent:'center',
          alignItems:'center',
                        
          }}
          renderItem={({item}) => <CompletedCard order={item}  />}
          />
          </View>
      }




         
     </SafeAreaView>
   
 )
}

const style = StyleSheet.create({

  card: {
    height: 275,
    width: cardWidth,
    elevation: 15,
    borderRadius: 15,
    marginBottom:10,
    marginTop:10,
    backgroundColor: COLORS.white,
    
  },
  cardImage: {
    height: 160,
    width: '50%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
  },
    buttonContainer:{
      justifyContent:'center',
      alignItems:'center',
    
    },
    editButton:{
      justifyContent:'center',
      alignItems:'center',
      width:180,
      marginLeft:175,
      borderColor :COLORS.primary,
      borderWidth:4,
      elevation:15,
      borderRadius:15,
      backgroundColor:COLORS.primary,
      },
    priceTag: {
      height: 50,
      width: 80,
      backgroundColor: COLORS.primary,
      position: 'absolute',
      zIndex: 1,
      right: 0,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    completeTag: {
      height: 50,
      width: 80,
      backgroundColor: COLORS.primary,
      position: 'absolute',
      zIndex: 1,
      right: 0,
      marginRight:90,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardDetails: {
      height: 80,
      borderRadius: 15,
      backgroundColor: COLORS.white,
      position: 'absolute',
      bottom: 0,
      padding: 20,
      width: '100%',
    },
    categoryListContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: 20,
      marginTop: 10,
      paddingBottom:10
    },
    categoryListText: {
      fontSize: 16,
      fontWeight: 'bold',
    },

  
   
  });

export default AcceptedOrders;