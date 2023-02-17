import React,{useState,useEffect} from 'react';
import {Dimensions,FlatList,SafeAreaView, ScrollView, StyleSheet, Text,View,   Image,Animated,Button,TouchableOpacity,StatusBar} from 'react-native';
import { Searchbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '../components/colors';
import colors from '../components/colors';
import hotels from '../components/companies';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { LogBox } from 'react-native';


const {width}= Dimensions.get('screen');
const cardWidth=width/1.2;
const bcardWidth=width/1.1;


LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const CompanyHome=({route})=>{

console.log(route.params.o_id)
  useEffect(()=>{

    if(myDate===' ' && route.params.date === undefined){
      // showPicker()
      next(myDate,myCity)
    }else{
      //console.log(route.params.date)
      //console.log(route.params.o_id)
      setMyDate(myDate=>{
        myDate=route.params.date
        next(myDate,myCity)
        return myDate
      })
    }
    
    

   },[]);

   const categories = ['All', 'Caterers', 'Decoration', 'Venue', 'Photography'];
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [vendors, setVendors] = React.useState([]);
    const [myCity, setMyCity] = React.useState('');
    const [catName, setCatName] = React.useState('');

    const cities = ["Islamabad", "Karachi", "Sukkur", "Lahore","Quetta"]

   //Date
   const [date, setDate] = useState(new Date());
   const [myDate, setMyDate] = useState(" ");
   const [isPickerShow, setIsPickerShow] = useState(false);
   var minDate = new Date()

    //console.log(route.params)
    const onChangeSearch = (query) => {
      setSearchQuery(query)
    }
      
  
     
//  console.log(date);
   const showPicker = () => {

if(route.params.date === undefined){
  setIsPickerShow(true);
}else{
  alert('Date already selected')
}

  };

  const fetchSearch = ()=>{

    SecureStore.getItemAsync('token').then(token=>{

      console.log('search by name',token)

      const value = {date: myDate, search_text: searchQuery, city: myCity}

      fetch(`https://bluejay-mobile-app.herokuapp.com/company/searchVendor`,{

                    method: "post",
                    body: JSON.stringify(value),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        token
                    }
                  
              }).then(res=>res.json()).then(async(result)=>{
                //console.log(result)

                if( result.status == 'ok'){
                      await setVendors(result.data)
                      setMyDate(myDate)
                      if(result.data == ''){
                      alert('No vendors found')
                      }
                }else{
                  console.log(result.status)
                }


              }).catch(err=>console.log('catch',err.message))

    })    


  }

   const onChange = (event, value) => {

              setIsPickerShow(false);
              setDate(value)
              //console.log('date',date)

              const year = value.getFullYear()
              const  month = value.getMonth()+1; 
              const  day= value.getDate();

              const  dateString = `${day}-${month}-${year}`;
            
              setMyDate(myDate=>{
                myDate=dateString
                //console.log(myDate)
                next(myDate,myCity)
                return myDate
              })
  };



  const next = async (myDate,myCity)=>{

    SecureStore.getItemAsync('token').then(token=>{

      console.log('search by date',token)
     
      const value = {date: myDate, city: myCity}

      fetch(`https://bluejay-mobile-app.herokuapp.com/company/searchByDate`,{

                    method: "post",
                    body: JSON.stringify(value),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        token
                    }
                  
              }).then(res=>res.json()).then(async(result)=>{
                 //console.log("result",result)

                if( result.status == 'ok'){

                         await setVendors(result.data)
                         setMyDate(myDate)
                         if(result.data == ''){
                         alert('No vendors found')
                         }

                }else{
                  console.log(result.status)
                }


              }).catch(err=>console.log('catch',err.message))
    })    

    setMyDate(myDate)

  };




  const fetchCompany=(myDate,myCity,catName)=>{
    console.log(myDate,myCity,catName)
               if(catName=='All' || catName==''){
                 next(myDate,myCity)
               }
               else if(catName=='Caterers'){
                 
                 SecureStore.getItemAsync('token').then(token=>{

                   console.log('Caterers',token)
                  
                   const value = {date: myDate, city: myCity}

                   fetch(`https://bluejay-mobile-app.herokuapp.com/company/caterers`,{
                                 method: "post",
                                 body: JSON.stringify(value),
                                 headers: {
                                     Accept: "application/json, text/plain, */*",
                                     "Content-Type": "application/json",
                                     token
                                 }
                               
                           }).then(res=>res.json()).then(async(result)=>{
                              //console.log(result)
             
                             if( result.status == 'ok'){
                                  // console.log(result)
                                  await setVendors(result.data)
                                  setMyDate(myDate)
                                  if(result.data == ''){
                                    alert('No vendors found')
                                  }
                             
                             }else{
                               console.log(result.status)
                             }
             
             
                           }).catch(err=>console.log('catch',err.message))
                 })    
             
             
           }else if(catName=='Decoration'){
                 
             SecureStore.getItemAsync('token').then(token=>{

               console.log('Decoration',token)
              
               
               const value = {date: myDate, city: myCity}
               fetch(`https://bluejay-mobile-app.herokuapp.com/company/decoration`,{
                             method: "post",
                             body: JSON.stringify(value),
                             headers: {
                                 Accept: "application/json, text/plain, */*",
                                 "Content-Type": "application/json",
                                 token
                             }
                           
                       }).then(res=>res.json()).then(async(result)=>{
                         //console.log(result)
         
                         if( result.status == 'ok'){
                              await setVendors(result.data)
                              setMyDate(myDate)
                              if(result.data == ''){
                                alert('No vendors found')
                              }
                         }else{
                           console.log(result.status)
                         }
         
         
                       }).catch(err=>console.log('catch',err.message))
             })    
         

       }else if(catName=='Venue'){
                 
         SecureStore.getItemAsync('token').then(token=>{

           console.log('Venue',token)
          
           const value = {date: myDate, city: myCity}
           fetch(`https://bluejay-mobile-app.herokuapp.com/company/venue`,{
                         method: "post",
                         body: JSON.stringify(value),
                         headers: {
                             Accept: "application/json, text/plain, */*",
                             "Content-Type": "application/json",
                             token
                         }
                       
                   }).then(res=>res.json()).then(async(result)=>{
                    //console.log(result)
     
                     if( result.status == 'ok'){
                          await setVendors(result.data)
                          setMyDate(myDate)
                          if(result.data == ''){
                            alert('No vendors found')
                          }
     
                     }else{
                       console.log(result.status)
                     }
     
     
                   }).catch(err=>console.log('catch',err.message))
         })  
         
         
       }else if(catName=='Photography'){
           
        SecureStore.getItemAsync('token').then(token=>{

          console.log('Photography',token)
         
          const value = {date: myDate, city: myCity}
          fetch(`https://bluejay-mobile-app.herokuapp.com/company/photographers`,{
                        method: "post",
                        body: JSON.stringify(value),
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                            token
                        }
                      
                  }).then(res=>res.json()).then(async(result)=>{
                   //console.log(result)
    
                    if( result.status == 'ok'){
                          await setVendors(result.data)
                          setMyDate(myDate)
                          if(result.data == ''){
                            alert('No vendors found')
                          }
                    }else{
                      console.log(result.status)
                    }
    
    
                  }).catch(err=>console.log('catch',err.message))
        })  
        
       }

               
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
                setCatName(catName=>{
                  catName=item
                  fetchCompany(myDate,myCity,catName)
                  return catName
                })
                
              }}>
              <View>
                <Text
                  style={{
                    ...style.categoryListText,
                    color:
                      selectedCategoryIndex == index
                        ? COLORS.primary
                        : COLORS.grey,
                  }}>
                  {item}
                </Text>
                {selectedCategoryIndex == index && (
                  <View
                    style={{
                      height: 3,
                      width: 30,
                      backgroundColor: COLORS.primary,
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

const Card=({vendor,index,})=>{

  const navigation = useNavigation();

  const filled = []
  const rating = vendor.rating.toFixed(0)
 
  for (var i = 0; i < rating; i++) {
    filled.push(i);
  }

const emp = []
 const empty = 5-rating
  for (var i = 0; i < empty; i++) {
    emp.push(i);
  }


  function handleClick(){
    console.log("Card clicked")
    let o_id=route.params.o_id
    console.log(o_id)
    navigation.navigate('VendorDetails',{vendor,myDate,o_id,filled,emp})
  }
return(

 <TouchableOpacity onPress={handleClick}>
    <View style={{...style.card}}>
      <View style={{...style.cardOverLay, opacity:0}}/>
    <View style={style.priceTag}>

    <Text style={{color:COLORS.white, fontSize:15,fontWeight:'bold'}}>
        ${vendor.price_range}

    </Text>
     </View>
         <Image source={{uri : vendor.image}} style={style.cardImage} />
         <View style={style.cardDetails}>
          <View style={{flexDirection:"row", justifyContent:'space-between'}}>
           <View>

               <Text style={{fontWeight:"bold",fontSize:17}}>{vendor.vendor_name}</Text>
                <Text style={{color:COLORS.grey,fontSize:12}}>{vendor.address}</Text> 

            </View>
             <MaterialCommunityIcons name="bookmark-outline" size={30}/>
          </View>
          <View  style={{flexDirection:"row", marginTop:6, justifyContent:'space-between'}}>
             <View  style={{flexDirection:"row"}}>
             {
                filled.map((i,key)=>{

                   return <View key={i}><MaterialCommunityIcons name="star" size={20} color={colors.orange}/></View>
                })
                
              }

              {
                emp.map((i,key)=>{
                  return <View key={i}><MaterialCommunityIcons name="star" size={20} color={colors.gray}/></View>
                })
                
              }
              </View>
             

          </View>
         </View>        
    </View>
  </TouchableOpacity>

)
};


    return(
        <ScrollView style={{flex:1,backgroundColor:COLORS.white, }}>
       
        <View style={style.header}>
        
        
            <View style={{paddingBottom:8}}>

                            <View style={{flexDirection:'row'}}>
                                  <Text style={{fontSize:23, fontWeight:'bold'}}> Search For Vendors </Text> 
                                  <Text style={{fontSize:20, fontWeight:'bold',paddingLeft:50,paddingTop:5}}>Pick date </Text>
                            
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:23, fontWeight:'bold'}} > in  </Text>
                                <Text style={{fontSize:23, fontWeight:'bold', color: COLORS.primary}} >your City </Text>
                            


                                  {/* The button that used to trigger the date picker */}
                                    <View style={style.btnContainer}>
                                        <MaterialCommunityIcons name="calendar"  size={45} color={COLORS.primary} onPress={showPicker}/>
                                    </View>
                                

                                  {/* The date picker */}
                                  { isPickerShow && (
                                    <DateTimePicker
                                      value={date}
                                      mode={'date'}
                                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                      // is24Hour={true}
                                      onChange={onChange}
                                      minimumDate = {new Date(minDate)}
                                      style={style.datePicker}
                                    />
                                  )}


                            </View>

                            <View style={{flexDirection:'row'}}>
                                                <Text style={{fontSize:20, fontWeight:'bold',paddingTop:5}}>  Selected Date :</Text>
                                                <Text style={{fontSize:20, fontWeight:'bold',paddingTop:5,color: COLORS.primary}}> {myDate}</Text>
                    

                            </View>

            </View>


        </View>



                <View style={style.dropdownContainer}>
                        
                        <SelectDropdown
                          data={cities}
                          defaultButtonText="Select a city"
                          buttonStyle={style.dropdown}
                          buttonTextStyle={{color:COLORS.white}}
                          onSelect={(selectedItem, index) => {
                            //console.log(selectedItem, index)
                            setMyCity(myCity=>{
                              myCity=selectedItem
                              fetchCompany(myDate,myCity,catName)
                              return myCity
                            })
                          }}
                          renderDropdownIcon={()=>{
                            return  <MaterialCommunityIcons name="arrow-down"  size={38} color={COLORS.white} onPress={showPicker}/>        
                          }}
                          buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem	}}
                          rowTextForSelection={(item, index) => {
                          return item}}
                          />
                          
                </View>



                <View style={style.searchInputContainer}>
                    <Searchbar 
                         placeholder="Search"
                         onChangeText={onChangeSearch}
                         onIconPress = {fetchSearch}
                         onSubmitEditing = {fetchSearch}
                         value={searchQuery}
                    />
                </View>
         
         <CategoryList/>
         
         <View>

         <Animated.FlatList
          data={vendors}
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent:'center',
            alignItems:'center',
            
          }}
          renderItem={({item}) => <Card vendor={item}  />}
        />
        </View>


         
     </ScrollView>
   
 )
}

const style = StyleSheet.create({
    header: {
      marginTop: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
      paddingTop:5,
    },
    searchInputContainer: {
     height: 30,
      backgroundColor: COLORS.light,
      marginTop:5,
      marginLeft:20,
      flexDirection: 'row',
      alignItems: 'center',
      width:'90%',
    },
    categoryListContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginTop: 28,
      paddingBottom:20
    },
    categoryListText: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    card: {
      height: 250,
      width: bcardWidth,
      elevation: 15,
      marginBottom: 20,
      borderRadius: 15,
      backgroundColor: colors.white,
      flexDirection:'column',
      
    },
    btnContainer: {
      // paddingTop: 12,
      paddingRight:0,
      paddingHorizontal:"43%"
     
    },
    cardImage: {
      height: 180,
      width: '100%',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    priceTag: {
      height: 60,
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
      height: 100,
      borderRadius: 15,
      backgroundColor: COLORS.white,
      position: 'absolute',
      bottom: 0,
      padding: 20,
      width: '100%',
    },
    cardOverLay: {
      height: 250,
      backgroundColor: COLORS.white,
      position: 'absolute',
      zIndex: 100,
      width: cardWidth,
      borderRadius: 15,
    },
  dropdownContainer:{
  //justifyContent:'center',
  alignItems:"center", 
  },

  dropdown:{
    justifyContent:'center',
          alignItems:'center',
          marginBottom:18,
          width:'90%',
          borderColor :colors.primary,
          borderWidth:1,
          elevation:0,
          borderRadius:10,
          backgroundColor:colors.primary,  
  },
  
   
  });

export default CompanyHome;