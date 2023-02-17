import React,{useState,useEffect,useContext} from 'react';
import {Dimensions,FlatList,SafeAreaView, ScrollView, StyleSheet, Text,View,   Image,Animated,Button,TouchableOpacity,StatusBar} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import COLORS from '../components/colors';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import colors from '../components/colors';
import * as SecureStore from 'expo-secure-store';
import {DateContext,UserContext} from '../Contexts'
import { LogBox } from 'react-native';



const {width}= Dimensions.get('screen');
const tcardWidth=width/1.8;
const bcardWidth=width/1.1;


LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.'
,'fontFamily "MaterialCommunityIcons" is not a system font and has not been loaded through Font.loadAsync.']);


const HomeScreen=({route})=>{
  

  useEffect(()=>{

    if(myDate===' ' && route.params.params === undefined){
      showPicker()
      
    }
    

   },[]);

    const [user,setUser] = useContext(UserContext)
    const categories = ['All', 'Popular', 'Low Price', 'High Price', 'Favorites'];
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [companies, setCompanies] = React.useState([]);
    const [myCity, setMyCity] = React.useState('');
    const [catName, setCatName] = React.useState('');
    
    const cities = ["Islamabad", "Karachi", "Sukkur", "Lahore","Quetta"]

    //Date
    const [date,setDate] = useContext(DateContext)
    const [myDate, setMyDate] = useState(" ");
    const [isPickerShow, setIsPickerShow] = useState(false);
    var minDate = new Date()

   const onChangeSearch = (query) => {
    setSearchQuery(query)
  }
    

   
    // console.log(date);
   const showPicker = () => {
    setIsPickerShow(true);
  };


  const AddToFav = (c_id) => {

SecureStore.getItemAsync('token').then(token=>{

      console.log('Add to favs',token)

      const value = {c_id: c_id}

      fetch(`https://bluejay-mobile-app.herokuapp.com/users/addToFavs`,{
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
                      console.log('added')
                      alert('Added to favorites')
                      setUser(result.data)
                      setCompanies(companies)
                }else{
                  console.log(result.status)
                }


              }).catch(err=>console.log('catch',err.message))
    })    

  }

  const RemoveFromFav = (c_id) => {
    SecureStore.getItemAsync('token').then(token=>{

      console.log('Remove from favs',token)

      const value = {c_id: c_id}

      fetch(`https://bluejay-mobile-app.herokuapp.com/users/removeFromFavs`,{
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
                      console.log('removed')
                      alert('Removed from favorites')
                      setUser(result.data)
                      setCompanies(companies)
                }else{
                  console.log(result.status)
                }


              }).catch(err=>console.log('catch',err.message))
    })    

  }


  const fetchSearch = ()=>{
    console.log('search pressed')
    SecureStore.getItemAsync('token').then(token=>{

      console.log('search by name',token)

      const value = {date: myDate, search_text: searchQuery, city: myCity}

      fetch(`https://bluejay-mobile-app.herokuapp.com/users/searchCompany`,{
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

                       if(result.data == ''){
                            console.log('No companies found')
                            alert('No companies found')
                            setCompanies(result.data)
                            setMyDate(myDate)
                        }else{
                          await setCompanies(result.data)
                          console.log(companies)
                        }
                }else{
                  console.log(result.status)
                }


              }).catch(err=>console.log('catch',err.message))
    })    

  }

   const onChange =  (event, value) => {

              setIsPickerShow(false);
              setDate(value)
              //console.log('date',date)

              const year = value.getFullYear()
              const  month = value.getMonth()+1; 
              const  day= value.getDate();

              const  dateString = `${day}-${month}-${year}`;
            
              setMyDate(myDate=>{
                myDate=dateString
                next(myDate,myCity)
                return myDate
              })
            
   }



   const next = async (myDate,myCity)=>{

    SecureStore.getItemAsync('token').then(token=>{

      console.log('search by date',token)
     
      const value = {date: myDate, city: myCity}
      fetch(`https://bluejay-mobile-app.herokuapp.com/users/searchByDate`,{
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

                        if(result.data == ''){
                            console.log('No companies found')
                            alert('No companies found')
                            setCompanies(result.data)
                            setMyDate(myDate)
                        }else{
                          await setCompanies(result.data)
                         // console.log(companies)
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
                else if(catName=='Popular'){
                  
                  SecureStore.getItemAsync('token').then(token=>{

                    console.log('poppular',token)
                   
                    const value = {date: myDate, city: myCity}

                    fetch(`https://bluejay-mobile-app.herokuapp.com/users/topRated`,{
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
              
                                if(result.data == ''){
                                  console.log('No companies found')
                                  
                                  setCompanies(result.data)
                                  setMyDate(myDate)
                              }else{
                                await setCompanies(result.data)
                                //console.log(companies)
                              }
              
                              }else{
                                console.log(result.status)
                              }
              
              
                            }).catch(err=>console.log('catch',err.message))
                  })    
              
              
            }else if(catName=='Low Price'){
                  
              SecureStore.getItemAsync('token').then(token=>{

                console.log('Low Price',token)
               
                
                const value = {date: myDate, city: myCity}
                fetch(`https://bluejay-mobile-app.herokuapp.com/users/lowPrice`,{
                              method: "post",
                              body: JSON.stringify(value),
                              headers: {
                                  Accept: "application/json, text/plain, */*",
                                  "Content-Type": "application/json",
                                  token
                              }
                            
                        }).then(res=>res.json()).then(async(result)=>{
                          console.log(result)
          
                          if( result.status == 'ok'){
          
                            if(result.data == ''){
                              console.log('No companies found')
                              
                              setCompanies(result.data)
                              setMyDate(myDate)
                          }else{
                            await setCompanies(result.data)
                            //console.log(companies)
                          }
          
                          }else{
                            console.log(result.status)
                          }
          
          
                        }).catch(err=>console.log('catch',err.message))
              })    
          

        }else if(catName=='High Price'){
                  
          SecureStore.getItemAsync('token').then(token=>{

            console.log('High Price',token)
           
            const value = {date: myDate, city: myCity}
            fetch(`https://bluejay-mobile-app.herokuapp.com/users/highPrice`,{
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
      
                             if(result.data == ''){
                            console.log('No companies found')
                            
                            setCompanies(result.data)
                            setMyDate(myDate)
                        }else{
                          await setCompanies(result.data)
                          //console.log(companies)
                        }
      
                      }else{
                        console.log(result.status)
                      }
      
      
                    }).catch(err=>console.log('catch',err.message))
          })  
          
          
        }else if(catName=='Favorites'){
          console.log('enters')
                  
          SecureStore.getItemAsync('token').then(token=>{

            console.log('fav_companies',token)
           
            const value = {date: myDate, city: myCity}
            fetch(`https://bluejay-mobile-app.herokuapp.com/users/fav_companies`,{
                          method: "post",
                          body: JSON.stringify(value),
                          headers: {
                              Accept: "application/json, text/plain, */*",
                              "Content-Type": "application/json",
                              token
                          }
                        
                    }).then(res=>res.json()).then(async(result)=>{
                     console.log(result)
      
                      if( result.status == 'ok'){
      
                            if(result.data == ''){
                            console.log('No companies found')
                            
                            setCompanies(result.data)
                            setMyDate(myDate)
                        }else{
                          await setCompanies(result.data)
                          //console.log(companies)
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
                  console.log("purana",catName)
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
                        ? colors.primary
                        : colors.grey,
                  }}>
                  {item}
                </Text>
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

const Card=({company,index})=>{
  
  const navigation = useNavigation();
  var bool=false
  
  const [bookMark, setBookMark] = React.useState(false);
//console.log(user)
  for(id of user.fav_companies){
    if(id == company._id){
     
      bool = true
      console.log('a',id,bool)
    }
  }

  

  const filled = []
  const rating = company.rating.toFixed(0)
 
  for (var i = 0; i < rating; i++) {
    // console.log('kkk')
    filled.push(i);
  }

const emp = []
 const empty = 5-rating
  for (var i = 0; i < empty; i++) {
    emp.push(i);
  }


  

  function handleClick(){
    
    navigation.navigate('CompanyDetails',{company,myDate,filled,emp})
  }
return(
   
  <TouchableOpacity onPress={handleClick}>
    <View style={{...style.Card}}>
      <View style={{...style.cardOverLay, opacity:0}}/>


    <View style={style.priceTag}>
        <Text style={{color:COLORS.white, fontSize:15,fontWeight:'bold'}}>${company.price_range}</Text>
     </View>
         <Image source={{ uri: company.image }} style={style.cardImage} />
         <View style={style.cardDetails}>
          <View style={{flexDirection:"row", justifyContent:'space-between'}}>

           <View>
               <Text style={{fontWeight:"bold",fontSize:17}}> {company.company_name}</Text>
                <Text style={{color:COLORS.grey,fontSize:17}}> {company.address}</Text> 
            </View>

          {  bool==true &&
                <View style={style.bookMarkTag}>
                  <View style={{color:COLORS.white, }}>
                      <MaterialCommunityIcons name="bookmark" size={35} onPress={()=>{
                       bool=false
                       setBookMark(!bookMark)
                       RemoveFromFav(company._id)
                      
                      }}/> 
                  </View>
                </View>
          }

          {bookMark == false && bool != true &&

          <View style={style.bookMarkTag}>
             <View style={{color:COLORS.white, }}>
                 <MaterialCommunityIcons name="bookmark-outline" size={35} onPress={()=>{
                  bool=true
                  setBookMark(!bookMark)
                  AddToFav(company._id)
                  }}/> 
             </View>
           </View>

            }

          </View>
          <View  style={{flexDirection:"row", marginTop:5, justifyContent:'space-between'}}>
             <View  style={{flexDirection:"row"}}>
              {
                filled.map((i,key)=>{

                   return <View key={i}><MaterialCommunityIcons name="star" size={18} color={colors.orange}/></View>
                })
                
              }

              {
                emp.map((i,key)=>{
                  return <View key={i}><MaterialCommunityIcons name="star" size={18} color={colors.gray}/></View>
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
        <ScrollView style={{flex:1,backgroundColor:colors.white}}>


        <View style={style.header}>

                    <View style={{paddingBottom:8}}>

                            <View style={{flexDirection:'row'}}>
                                  <Text style={{fontSize:23, fontWeight:'bold'}}> Search a Company</Text> 
                                  <Text style={{fontSize:20, fontWeight:'bold',paddingLeft:55,paddingTop:5}}> Pick date </Text>
       
                            </View>

                            <View style={{flexDirection:'row'}}>

                                      <Text style={{fontSize:23, fontWeight:'bold'}} > in  </Text>
                                      <Text style={{fontSize:23, fontWeight:'bold', color: COLORS.primary}} >your City </Text>




                                      {/* The button that used to trigger the date picker */}
                                      <View style={style.btnContainer}>
                                            <MaterialCommunityIcons name="calendar"  size={45} color={COLORS.primary} onPress={showPicker}/>
                                      </View>
                                      
                                        {/* The date picker */}
                                      {isPickerShow && (
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
                                  <Text style={{fontSize:20, fontWeight:'bold',paddingTop:5}}>Selected Date :</Text>
                                  <Text style={{fontSize:20, fontWeight:'bold',paddingTop:5,color: COLORS.primary}}> {myDate}</Text>
      

                            </View>
                    

                    </View>
   
        </View>


                                  {/*Dropdown  */}
                                  <View style={style.dropdownContainer}>
                                      <SelectDropdown
                                        data={cities}
                                        defaultButtonText="Select a city"
                                        buttonStyle={style.dropdown}
                                        buttonTextStyle={{color:colors.white}}
                                        onSelect={(selectedItem, index) => {
                                                        console.log(selectedItem, index)
                                                        setMyCity(myCity=>{
                                                          myCity=selectedItem
                                                          console.log('naya',catName)
                                                          fetchCompany(myDate,myCity,catName)
                                                          return myCity
                                                        })
                                                    }}
                                        renderDropdownIcon={()=>{
                                          return  <MaterialCommunityIcons name="arrow-down"  size={38} color={colors.white} />        
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
         

                <FlatList 
                  data={companies}
                  showsVerticalScrollIndicator={true} 
                  contentContainerStyle={{
                    justifyContent:'center',
                    alignItems:'center'
                  }}
                  renderItem={({item})=><Card company={item}/>}
                />


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

    // card: {
    //   height: 250,
    //   width: tcardWidth,
    //   elevation: 15,
    //   marginRight: 20,
    //   borderRadius: 15,
    //   backgroundColor: colors.white,
    //   flexDirection:'column',
    // },
    cardImage: {
      height: 180,
      width: '100%',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    priceTag: {
      height: 60,
      width: 80,
      backgroundColor: colors.primary,
      position: 'absolute',
      zIndex: 1,
      right: 0,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bookMarkTag: {
      height: 60,
      width: 80,
      backgroundColor: colors.white,
      position: 'absolute',
      zIndex: 1,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardDetails: {
      height: 100,
      borderRadius: 15,
      backgroundColor: colors.white,
      position: 'absolute',
      bottom: 0,
      padding: 20,
      width: '100%',
    },
    cardOverLay: {
      height: 250,
      backgroundColor: colors.white,
      position: 'absolute',
      zIndex: 100,
      width: tcardWidth,
      borderRadius: 15,
    },
    Card: {
      height: 250,
      width: bcardWidth,
      elevation: 15,
      marginBottom: 20,
      borderRadius: 15,
      backgroundColor: colors.white,
      flexDirection:'column',
    },
    
    pickedDate: {
      fontSize: 20,
      color: colors.grey,
      fontWeight:'bold'
    },
    btnContainer: {
      // paddingTop: 12,
      paddingRight:50,
      paddingHorizontal:"43%"
     
    },

    dropdownContainer:{
      // justifyContent:'center',
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

export default HomeScreen;



