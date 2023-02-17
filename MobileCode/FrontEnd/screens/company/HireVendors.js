import React from 'react';
import {useState,useEffect,useContext} from 'react';
import {ImageBackground,Alert,Dimensions,SafeAreaView,ScrollView,FlatList,StatusBar,Image,TouchableOpacity,StyleSheet, Text, View,} from 'react-native';
import COLORS from '../../components/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {CvOrderContext} from '../../Contexts'
import * as SecureStore from 'expo-secure-store';
import { LogBox } from 'react-native';


const {width}= Dimensions.get('screen');
const cardWidth=width/1.16;



function HireVendors({route}) {


  const navigation = useNavigation();

  const order = route.params.order

  const [cvOrderC, setCvOrderC] = useContext(CvOrderContext)
  const [subOrders, setSubOrders] = React.useState([]);
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

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
                            console.log('No orders found')
                        }

                }else{
                  console.log(result.status)
                }

              }).catch(err=>console.log('catch',err.message))



             
    })    


   },[cvOrderC]);




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

  fetch(`https://bluejay-mobile-app.herokuapp.com/company/cancelVendorOrder`,{
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
                    setCvOrderC(!cvOrderC)
            }else{
              console.log(result.status)
            }

          }).catch(err=>console.log('catch',err.message))

})    



}




  
  
  
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
        
            <View style={style.deleteTag}>
                    <View style={{color:COLORS.white, }}>
                    <MaterialCommunityIcons name="delete-outline" size={30} color={ COLORS.white} onPress={()=>{showAlert(sub_order._id)}}/>
                    </View>
            </View>
  
            <View style={{flexDirection:'row'}}>
                    {/* <Image source={{uri : sub_order.image}} style={style.cardImage} /> */}
                
                    <Text style={{ marginLeft:30, marginTop:20,marginBottom:10}}>
                      
                          <Text style={{fontWeight:"bold",fontSize:22,paddingLeft:15}}>{sub_order.required_service}</Text>{'\n'}{'\n'}
                           
                          <Text style={{fontWeight:"bold",fontSize:20,paddingLeft:15}}>Name :</Text> <Text style={{fontSize:20}}> {sub_order.vendor_name}</Text>{'\n'}{'\n'}
                            
                          <Text style={{fontWeight:"bold",fontSize:20,paddingLeft:15}}>Total :</Text> <Text style={{fontSize:20}}> Rs.{sub_order.available_budget}</Text>
                    
                          <Text style={{fontWeight:"bold",fontSize:20,paddingTop:20,paddingLeft:80}}>               {sub_order.status}</Text>
            
                    </Text>
            </View>

          
      </TouchableOpacity>
        
  
  )
   
  };
  
  

  return (
  
    <ScrollView
    showsVerticalScrollIndicator={false}   contentContainerStyle={{  backgroundColor: COLORS.white,}} >
      <StatusBar barStyle="light-content"  translucent backgroundColor={COLORS.primary}/>
       
  <View>

    <View style={{marginTop: 50, paddingHorizontal: 20}}>

        <Text style={{color:COLORS.primary, fontSize:32,fontWeight:'bold',paddingLeft:'26%',marginBottom: 4}}>Order Details</Text>


            <View style={style.rightTag}>
              <Text style={{fontSize: 21, fontWeight: 'bold'}}>                    Order Status:</Text>
              <View style={style.priceTag}> 
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{order.status}</Text>
              </View>
            </View>


            <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Customer: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{order.customer_name} </Text>
                    </View>
                    </View>

                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Phone no: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{order.u_phone_no} </Text>
                    </View>
                    </View>

                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>City: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{order.city} </Text>
                    </View>
                    </View>
                    

                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Event: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{order.event_type}</Text>
                    </View>
                    </View>
                    

                      <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Date: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}> {order.date}</Text>
                    </View>
                    </View>

                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>No# of guests: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{order.no_of_guests} </Text>
                    </View>
                    </View>

                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Catering: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{order.catering} </Text>
                    </View>
                    </View>

                    {order.catering=='yes' &&
                      <View style={style.rightTag}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Menu: </Text>
                        <View style={style.WideTag}> 
                        <Text style={style.leftTag}>{order.menu} </Text>
                      </View>
                      </View>

                    }

                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Decor: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{order.decor} </Text>
                    </View>
                    </View>

                    {order.catering=='yes' &&
                      <View style={style.rightTag}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Decor theme: </Text>
                        <View style={style.WideTag}> 
                        <Text style={style.leftTag}>{order.decor_theme} </Text>
                      </View>
                      </View>

                    }


                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Venue: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{order.venue} </Text>
                    </View>
                    </View>

                    {order.venue=='yes' &&
                      <View style={style.rightTag}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Venue Preference: </Text>
                        <View style={style.WideTag}> 
                        <Text style={style.leftTag}>{order.venue_preference} </Text>
                      </View>
                      </View>

                    }

                    {order.venue=='no' &&
                      <View style={style.rightTag}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Location: </Text>
                        <View style={style.WideTag}> 
                        <Text style={style.leftTag}>{order.location} </Text>
                      </View>
                      </View>

                    }

                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Photographer: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{order.photographer} </Text>
                    </View>
                    </View>

                    {order.photographer=='yes' &&
                      <View style={style.rightTag}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Photo shoot: </Text>
                        <View style={style.WideTag}> 
                        <Text style={style.leftTag}>{order.photoShoot_details} </Text>
                      </View>
                      </View>

                    }


                     <View  style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Start time: </Text>
                      <View style={style.priceTag}>
                        <Text style={style.leftTag}>{order.start_time}</Text>
                      </View>
                    </View>


                    <View  style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Event duration: </Text>
                      <View style={style.priceTag}>
                        <Text style={style.leftTag}>{order.event_duration}</Text>
                      </View>
                    </View>


                      <View  style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Budget: </Text>
                      <View style={style.priceTag}>
                        <Text style={style.leftTag}>{order.available_budget}</Text>
                      </View>
                    </View>

                   

                    <View  style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Special Instructions:</Text>
                      <View style={style.WideTag}>
                        <Text style={style.leftTag}>{order.special_instructions}</Text>
                      </View>
                    </View>

    </View>

</View>




       
       <View style={style.buttonContainer}> 
       <TouchableOpacity  onPress={()=>{ navigation.navigate('Home',{date: order.date, o_id : order._id}) }} style={style.editButton}>
       <Text style={{  fontSize: 25,  fontWeight: 'bold',  color: COLORS.white,   }}> Hire Vendor </Text>
       </TouchableOpacity>
   </View> 

   <View>
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


   </ScrollView>


  )
}



const style = StyleSheet.create({
 
  WideTag: {
    height: 60,
    alignItems: 'center',
    marginLeft: 8,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  card: {
    height: 150,
    width: cardWidth,
    elevation: 15,
    borderRadius: 15,
    marginBottom:25,
    backgroundColor: COLORS.white,
    
  },
  cardImage: {
    height: 180,
    width: '48%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
  },
  deleteTag: {
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
 

  priceTag: {
    height: 44,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 280,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  rightTag:{
    marginTop: 10,
    flexDirection: 'row',
   justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom:5,
  },
leftTag:{
  fontSize: 18,
  fontWeight: 'bold',
  color: COLORS.dark,
  marginLeft: 5,
  paddingBottom:5,
}, 
buttonContainer:{
  justifyContent:'center',
  alignItems:'center',
  paddingTop:20,
  paddingBottom:20

},
editButton:{
justifyContent:'center',
alignItems:'center',
width:280,
borderColor :COLORS.primary,
borderWidth:4,
elevation:15,
borderRadius:15,
backgroundColor:COLORS.primary,
},
});

export default HireVendors;
