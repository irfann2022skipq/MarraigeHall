import React from 'react'
import {useState,useEffect,useContext} from 'react';
import {ImageBackground,Alert,Dimensions,SafeAreaView,FlatList,StatusBar,Image,TouchableOpacity,StyleSheet, Text, View,} from 'react-native';
import COLORS from '../../components/colors';
import {CvOrderContext} from '../../Contexts'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const {width}= Dimensions.get('screen');
const cardWidth=width/1.16;


const RateVendors = ({route}) => {

    // const navigation = useNavigation();
  const [cvOrderC, setCvOrderC] = useContext(CvOrderContext)
  
  const [subOrders, setSubOrders] = React.useState([]);
  const order = route.params.order

    useEffect(()=>{

    
        SecureStore.getItemAsync('token').then(token=>{
    
          console.log('show Hired vendors',token)
    
          const value = { o_id: order._id }
    
          console.log("value",value)
    
          fetch(`https://bluejay-mobile-app.herokuapp.com/company/showHiredVendors`,{
                        method: "post",
                        body: JSON.stringify(value),
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                            token
                        }
                      
                  }).then(res=>res.json()).then(async(result)=>{
                    // console.log(result)
    
                    if( result.status == 'ok'){
                        await setSubOrders(result.data)
                            if(result.data == ''){
                                console.log('No vendors hired')
                                alert('No vendors hired')
                            }
    
                    }else{
                      console.log(result.status)
                    }
    
                  }).catch(err=>console.log('catch',err.message))
    
    
    
                 
        })    
    
    
       },[cvOrderC]);
    
    
    


const Card=({sub_order})=>{

        const navigation = useNavigation();
        
        console.log(sub_order)
    
    
        function handleClick(){
    
          switch(sub_order.required_service){
            case 'Caterer':
              navigation.navigate('CatererOrderDetails',{sub_order})
              break;
            
            case 'Decoration':
              navigation.navigate('DecorationOrderDetails',{sub_order})
              break;
    
            case 'Venue':
              navigation.navigate('VenueOrderDetails',{sub_order})
              break;
    
            case 'Photography':
              navigation.navigate('PhotographerOrderDetails',{sub_order})
              break;
            
    
          }
    
        }
        
        
      return(
       
          <TouchableOpacity style={{...style.card}} onPress={handleClick}>
            
                
      
                <View style={{flexDirection:'column'}}>
                    
                        <Text style={{ marginLeft:30, marginTop:20}}>
                          
                              <Text style={{color:COLORS.primary,fontWeight:"bold",fontSize:22,paddingLeft:15}}>{sub_order.required_service}</Text>{'\n'}{'\n'}
                               
                              <Text style={{fontWeight:"bold",fontSize:20,paddingLeft:15}}>Name :</Text> <Text style={{fontSize:20}}> {sub_order.vendor_name}</Text>{'\n'}{'\n'}
                                
                              <Text style={{fontWeight:"bold",fontSize:20,paddingLeft:15}}>Total :</Text> <Text style={{fontSize:20}}> Rs.{sub_order.available_budget}</Text>
                  
                        </Text>

                        <View style={{flexDirection:'row'}}>

                                <Text style={{fontWeight:"bold",fontSize:20,paddingLeft:30,marginTop:15}}>{sub_order.status}</Text>
                        

                                <TouchableOpacity  
                                style={style.editButton}
                                onPress={()=>{  
                                  if(sub_order.rated=='no'){
                                    navigation.navigate('Rating',{order: sub_order}) 
                                  }else{
                                    alert('Already rated this order')
                                  }
                                }} 
                                >
                                  <View style={{flexDirection:'row'}}>
                                      <Text style={{  fontSize: 23,  fontWeight: 'bold',  color: COLORS.white,   }}> {sub_order.rated=='no'? 
                                      "Give Rating" : 
                                      "Rated"}
                                      </Text>
                                      {sub_order.rated == 'yes' &&
                                        <View style={{color:COLORS.white,paddingLeft:10 }}>
                                        <MaterialCommunityIcons name="check" size={35} color={ COLORS.white} />
                                        </View>
                                      }

                                </View>
                                </TouchableOpacity>

                        </View>
             
                </View>
    
              
          </TouchableOpacity>
            
      
      )
       
      };
      


  return (
   <SafeAreaView>

    
<Text style={{color:COLORS.primary,fontWeight:"bold",fontSize:32,paddingTop:40,paddingLeft:120}}>Hired Vendors</Text>
                
            <View style={{marginTop:20}}>
            <FlatList
            data={subOrders}
            vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
            justifyContent:'center',
            alignItems:'center',
            
            }}
            renderItem={({item}) => <Card sub_order={item}  />}
            />
            </View>

        
   </SafeAreaView>
  )
}



const style = StyleSheet.create({

   
      card: {
        height: 200,
        width: cardWidth,
        elevation: 15,
        borderRadius: 15,
        marginTop:10,
        marginBottom:10,
        backgroundColor: COLORS.white,
        
      },
   
    editButton:{
    justifyContent:'center',
    alignItems:'center',
    width:160,
    marginLeft:40,
    marginTop:8,
    borderColor :COLORS.primary,
    borderWidth:4,
    elevation:15,
    borderRadius:15,
    backgroundColor:COLORS.primary,
    },

})

export default RateVendors