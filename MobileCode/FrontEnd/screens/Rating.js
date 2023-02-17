import React,{useState,useContext} from 'react'
import { SafeAreaView,StyleSheet,Text, TouchableOpacity,View,Image } from 'react-native'
import COLORS from '../components/colors'
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import {UserContext,OrderContext,CvOrderContext} from '../Contexts'

const Rating = ({route}) => {

    const order = route.params.order
    const navigation = useNavigation();

    const [user,setUser] = useContext(UserContext)
    const [orderC,setOrderC] = useContext(OrderContext)
    const [cvOrderC, setCvOrderC] = useContext(CvOrderContext)
    
    const [defaultRating, setDefaultRating] = useState(1)
    const [maxtRating, setMaxtRating] = useState([1,2,3,4,5])

    const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true'
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png' 


    const CustomRatingBar = () =>{
        return(
            <View style={Styles.customRatingBarStyle}>
                {
                    maxtRating.map((item,key)=>{
                        return(
                            <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={()=>setDefaultRating(item)}
                            >

                            <Image 
                            style={Styles.starImgStyle}
                            source={
                                item <= defaultRating ?
                                {uri: starImgFilled} : {uri: starImgCorner}
                            }
                            />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }


    const SubmitCompanyRating = ()=>{
        SecureStore.getItemAsync('token').then(token=>{

            console.log('My orders',token)
            const value = {o_id:order._id,c_id: order.company_id,order_rating: defaultRating }
      
            fetch(`https://bluejay-mobile-app.herokuapp.com/users/rateCompany`,{
                          method: "post",
                          body: JSON.stringify(value),
                          headers: {
                              Accept: "application/json, text/plain, */*",
                              "Content-Type": "application/json",
                              token
                          }
                        
                    }).then(res=>res.json()).then(result=>{
                      //console.log(result)
      
                      if( result.status == 'ok'){
                            setOrderC(!orderC)
                            alert('Rating Submitted')
                            navigation.goBack()
                       }
                     
      
                    }).catch(err=>console.log('catch',err.message))
          })    


    }


    const SubmitVendorRating = ()=>{
        SecureStore.getItemAsync('token').then(token=>{

            console.log('My orders',token)
            const value = {o_id:order._id,v_id: order.vendor_id,order_rating: defaultRating }
      
            fetch(`https://bluejay-mobile-app.herokuapp.com/company/rateVendor`,{
                          method: "post",
                          body: JSON.stringify(value),
                          headers: {
                              Accept: "application/json, text/plain, */*",
                              "Content-Type": "application/json",
                              token
                          }
                        
                    }).then(res=>res.json()).then(result=>{
                      //console.log(result)
      
                      if( result.status == 'ok'){
                            setCvOrderC(!cvOrderC)
                            alert('Rating Submitted')
                            navigation.goBack()
                       }
                     
      
                    }).catch(err=>console.log('catch',err.message))
          })    

    }

if(user.role == 'customer'){

  return (
   <SafeAreaView style={Styles.container}>
        <Text style={Styles.textStyle}>Please Rate the company</Text>
        <CustomRatingBar/>
        <Text style={Styles.textStyle}>
        {defaultRating+'/'+maxtRating.length}
        </Text>
       
         <TouchableOpacity  
                     style={Styles.editButton}
                     onPress={()=>{ SubmitCompanyRating() }} 
                     >
                    <Text style={{  fontSize: 25,  fontWeight: 'bold',  color: COLORS.white,   }}> Submit Rating </Text>
         </TouchableOpacity>

   </SafeAreaView>
  )
}else if(user.role == 'company'){
    return (
        <SafeAreaView style={Styles.container}>
             <Text style={Styles.textStyle}>Please Rate the vendor</Text>
             <CustomRatingBar/>
             <Text style={Styles.textStyle}>
             {defaultRating+'/'+maxtRating.length}
             </Text>
            
              <TouchableOpacity  
                          style={Styles.editButton}
                          onPress={()=>{ SubmitVendorRating() }} 
                          >
                         <Text style={{  fontSize: 25,  fontWeight: 'bold',  color: COLORS.white,   }}> Submit Rating </Text>
              </TouchableOpacity>
     
        </SafeAreaView>
       )
}
}

const Styles = StyleSheet.create({
    container:{
        flex:1,
        margin:10,
        justifyContent:'center'
    },
    textStyle:{
        textAlign:'center',
        fontSize:23,
        marginTop:20
    },
    customRatingBarStyle:{
        justifyContent:'center',
        flexDirection:'row',
        marginTop:30
    },
    buttonContainer:{
        justifyContent:'center',
        alignItems:'center',
      
      },
      editButton:{
        justifyContent:'center',
        alignItems:'center',
        width:220,
        height:50,
        marginLeft:100,
        marginVertical:20,
        borderColor :COLORS.primary,
        borderWidth:4,
        elevation:15,
        borderRadius:15,
        backgroundColor:COLORS.primary,
        },
    starImgStyle:{
        width:40,
        height:40,
        resizeMode:'cover'
    },
    buttonStyle:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        padding:15,
        backgroundColor:COLORS.primary
    }
})


export default Rating
