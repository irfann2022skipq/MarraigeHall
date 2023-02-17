import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import COLORS from '../../components/colors';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import image from '../../assets/hotel1.jpg';

 

function VenueOrderDetails({route}) {


  const navigation = useNavigation();

  const sub_order = route.params.sub_order

  console.log(sub_order)

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}   contentContainerStyle={{  backgroundColor: COLORS.white,}} >
      <StatusBar barStyle="light-content"  translucent backgroundColor={COLORS.primary}/>
             

      <View>

        <View style={{marginTop: 70,marginBottom:60, paddingHorizontal: 20}}>

        <Text style={{color:COLORS.primary, fontSize:32,fontWeight:'bold',paddingLeft:'15%',marginBottom: 25}}>Venue Order Details</Text>
    

                    <View style={style.rightTag}>
                      <Text style={{fontSize: 21, fontWeight: 'bold'}}>                       Order Status:</Text>
                      <View style={style.priceTag}> 
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{sub_order.status}</Text>
                      </View>
                    </View>


                    
                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Vendor: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{sub_order.vendor_name} </Text>
                    </View>
                    </View>

                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>phone no: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{sub_order.v_phone_no} </Text>
                    </View>
                    </View>
                    
                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Event: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{sub_order.event_type} </Text>
                    </View>
                    </View>

                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Date: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{sub_order.date} </Text>
                    </View>
                    </View>


                    <View style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>No# of guests: </Text>
                      <View style={style.priceTag}> 
                      <Text style={style.leftTag}>{sub_order.no_of_guests} </Text>
                    </View>
                    </View>

                    <View  style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Start time: </Text>
                      <View style={style.priceTag}>
                        <Text style={style.leftTag}>{sub_order.start_time}</Text>
                      </View>
                    </View>

                    <View  style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>End time: </Text>
                      <View style={style.priceTag}>
                        <Text style={style.leftTag}>{sub_order.end_time}</Text>
                      </View>
                    </View>

                      <View  style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Budget: </Text>
                      <View style={style.priceTag}>
                        <Text style={style.leftTag}>{sub_order.available_budget}</Text>
                      </View>
                    </View>


                    <View  style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Need venue catering: </Text>
                      <View style={style.priceTag}>
                        <Text style={style.leftTag}>{sub_order.venue_catering}</Text>
                      </View>
                    </View>

                {sub_order.venue_catering=='yes' &&
                    <View  style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Menu: </Text>
                      <View style={style.priceTag}>
                        <Text style={style.leftTag}>{sub_order.menu}</Text>
                      </View>
                    </View>

                }

                      <View  style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Need venue decor : </Text>
                      <View style={style.priceTag}>
                        <Text style={style.leftTag}>{sub_order.venue_decor}</Text>
                      </View>
                    </View>

                  {sub_order.venue_decor=='yes' &&
                    <View  style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Decor details: </Text>
                      <View style={style.priceTag}>
                        <Text style={style.leftTag}>{sub_order.decor_theme_detail}</Text>
                      </View>
                    </View>

                  }
                    <View  style={style.rightTag}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Special note: </Text>
                      <View style={{height: 60, alignItems: 'center', marginLeft: 20,  paddingLeft: 20, flex: 1,backgroundColor: COLORS.secondary, borderTopLeftRadius: 20, borderBottomLeftRadius: 20,flexDirection: 'row'}}>
                        <Text style={style.leftTag}>{sub_order.special_instructions}</Text>
                      </View>
                    </View>


                    



        </View>
      
      </View>

    </ScrollView>
  )
}



const style = StyleSheet.create({
 

  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 20,
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
    width:"100%",
    borderRadius:40,
    overflow: 'hidden',
  },
  rightTag:{
    marginBottom: 15,
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
header: {
  marginTop: 60,
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 20,
  justifyContent: 'space-between',
},
});

export default VenueOrderDetails;
