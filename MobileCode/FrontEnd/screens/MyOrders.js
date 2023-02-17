import React from 'react';
import {useState,useEffect,useContext} from 'react';
import {Dimensions,Alert,FlatList,SafeAreaView, ScrollView, StyleSheet, Text,View,   Image,Animated,Button,TouchableOpacity,StatusBar} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '../components/colors';
import colors from '../components/colors';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import {OrderContext} from '../Contexts'


const {width}= Dimensions.get('screen');
const cardWidth=width/1.1;

const MyOrders=()=>{
 
  const [orderC,setOrderC] = useContext(OrderContext)
  const [myOrders, setMyOrders] = React.useState([]);
  const [completedOrder, setCompletedOrder] = React.useState([]);


  const categories = ['Current', 'Completed'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  useEffect(()=>{

    
    SecureStore.getItemAsync('token').then(token=>{

      console.log('My orders',token)

      fetch(`https://bluejay-mobile-app.herokuapp.com/users/myOrders`,{
                    method: "get",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        token
                    }
                  
              }).then(res=>res.json()).then(result=>{
                //console.log(result)

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

      fetch(`https://bluejay-mobile-app.herokuapp.com/users/completedOrders`,{
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


   const showAlert = (o_id)=>{
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

  fetch(`https://bluejay-mobile-app.herokuapp.com/users/cancelOrder`,{
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
    navigation.navigate('OrderDetails',{order})
  }
return(
   
    <TouchableOpacity style={{...style.card}} onPress={handleClick}>
      
          <View style={style.priceTag}>
                  <View style={{color:COLORS.white, }}>
                  <MaterialCommunityIcons name="delete-outline" size={30} color={ COLORS.white} onPress={()=>{showAlert(order._id)}}/>
                  </View>
          </View>

          <View style={{flexDirection:'row'}}>
                  <Image source={{ uri: order.image }} style={style.cardImage} />
              
                  <Text style={{ marginLeft:10, marginTop:75,marginBottom:20}}>

                  <Text style={{fontSize:18, fontWeight:"bold"}}>Event: </Text> <Text style={{fontSize:16}}>{order.event_type}</Text>{'\n'}{'\n'}
                 
                  <Text style={{fontSize:18,fontWeight:"bold"}}>Date:</Text> <Text style={{fontSize:16}}>{order.date}</Text>
                  
                  </Text>
          </View>

    
          <View style={{flexDirection:"row"}}>
                  
                    <Text style={{fontWeight:"bold",fontSize:17,paddingLeft:15,paddingTop:15}}>Name : {order.company_name}</Text>
                     
                
          </View>   

           <View style={{flexDirection:"row", justifyContent:'space-between'}}>
                  
           <Text style={{fontWeight:"bold",fontSize:17,paddingLeft:15,marginTop:10}}>Total : Rs.{order.available_budget}</Text>
           <Text style={{fontWeight:"bold",fontSize:24,marginRight:55,paddingBottom:20}}> {order.status}</Text>
                   
          </View>      
        
    </TouchableOpacity>
    
    
    

)
};



const CompletedCard=({order})=>{

  const navigation = useNavigation();
  
  function handleClick(){
    navigation.navigate('OrderDetails',{order})
  }
return(
   
    <TouchableOpacity style={{...style.card}} onPress={handleClick}>
      
          

          <View style={{flexDirection:'row'}}>
                  <Image source={{ uri: order.image }} style={style.cardImage} />
              
                  <Text style={{ marginLeft:10, marginTop:25,marginBottom:20}}>

                  <Text style={{fontSize:18, fontWeight:"bold"}}>Event: </Text> <Text style={{fontSize:16}}>{order.event_type}</Text>{'\n'}{'\n'}
                 
                  <Text style={{fontSize:18,fontWeight:"bold"}}>Date:</Text> <Text style={{fontSize:16}}>{order.date}</Text>{'\n'}{'\n'}
                  
                  <Text style={{fontWeight:"bold",fontSize:20}}>{order.status}</Text>
          
                  </Text>
          </View>

    
          
                   
                   
           <View style={{flexDirection:'column', justifyContent:'space-between'}}>

                <Text style={{ marginLeft:10, marginTop:15}}>
                      <Text style={{fontWeight:"bold",fontSize:17,paddingLeft:15,paddingTop:10}}> Name :  {order.company_name}</Text>  
                </Text>   

                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontWeight:"bold",fontSize:17,paddingLeft:15,marginTop:10}}>Total : Rs.{order.available_budget}</Text>
                        <View style={style.buttonContainer}> 
                            <TouchableOpacity  
                            style={style.editButton}
                            onPress={()=>{ 
                              if(order.rated=='no'){
                                navigation.navigate('Rating',{order}) 
                              }else{
                                alert('Already rated this order')
                              }
                            }} 
                            >
                                  <View style={{flexDirection:'row'}}>
                                      <Text style={{  fontSize: 25,  fontWeight: 'bold',  color: COLORS.white,   }}> {order.rated == 'no'? 'Rate Company': 'Rated'} </Text>
                                      {order.rated == 'yes' &&
                                        <View style={{color:COLORS.white,paddingLeft:10 }}>
                                        <MaterialCommunityIcons name="check" size={35} color={ COLORS.white} />
                                        </View>
                                      }

                                </View>
                            </TouchableOpacity>
                        </View> 
                </View>
          </View>      
        
    </TouchableOpacity>
    
    
    

)
};




    return(
        <SafeAreaView style={{flex:1,marginBottom:20,backgroundColor:COLORS.white}}>
            <StatusBar barStyle="light-content"  translucent backgroundColor={COLORS.primary}/>
                
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
      height: 255,
      width: cardWidth,
      elevation: 15,
      borderRadius: 15,
      marginBottom:10,
      marginTop:15,
      backgroundColor: COLORS.white,
      
    },
    cardImage: {
      height: 160,
      width: '45%',
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
      width:190,
      marginRight:9,
      marginBottom:10,
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

export default MyOrders;