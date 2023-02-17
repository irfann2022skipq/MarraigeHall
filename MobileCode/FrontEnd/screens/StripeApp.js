import React,{useState} from 'react'
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField,useConfirmPayment } from '@stripe/stripe-react-native';


const API_URL = "https://bluejay-mobile-app.herokuapp.com";


const StripeApp= () => {
    
    const [email, setEmail] = useState();
    const [amount, setAmount] = useState();
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();

    const fetchPaymentIntentClientSecret = async () => {

        const value = {pay_amount: amount}
// console.log(value)
        const response = await fetch(`${API_URL}/create-payment-intent`, {
          body: JSON.stringify(value),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { clientSecret, error } = await response.json();
        return { clientSecret, error };
      };

    const handlePayPress = async () => {
        //1.Gather the customer's billing information (e.g., email)
        if (!cardDetails?.complete || !email) {
          Alert.alert("Please enter Complete card details and Email");
          return;
        }

        //2 confirm bill

        const billingDetails = {
            email: email,
          };

          //3 confirm payment with card details

          try {
            const { clientSecret, error } = await fetchPaymentIntentClientSecret();
            //2. confirm the payment
            if (error) {
              console.log("Unable to process payment");
            } else {
              const { paymentIntent, error } = await confirmPayment(clientSecret, {
                type: "Card",
                billingDetails: billingDetails,
              });
              if (error) {
                alert(`Payment Confirmation Error ${error.message}`);
              } else if (paymentIntent) {
                alert("Payment Successful");
                console.log("Payment successful ", paymentIntent);
              }
            }
          } catch (e) {
            console.log(e);
          }
    }

    return (
        <>

    <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                placeholder="E-mail"
                keyboardType="email-address"
                onChange={value => setEmail(value.nativeEvent.text)}
                style={styles.input}
            />

             <TextInput
                autoCapitalize="none"
                placeholder="Amount"
                onChange={value => setAmount(value.nativeEvent.text)}
                style={styles.input}
            />

            <CardField
            postalCodeEnabled={true}
            placeholder={{
                number: '4242 4242 4242 4242'
            }}
            cardStyle={styles.card}
            style={styles.cardContainer}
            onCardChange={cardDetails => {
                setCardDetails(cardDetails);
              }}

            />
            

       </View>

       <View style={styles.buttonContainer}> 
            <Button onPress={handlePayPress} title="   Pay   " 
            />
        </View>
 
 </>
    
    )
}

const styles = StyleSheet.create({

    buttonContainer:{
        marginTop:110,
        justifyContent:'center',
        alignItems:'center',
    
    },

      container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 150,
        margin:20
      },
      input: {
        backgroundColor: "#efefefef",
        marginTop:20,
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
      },
      card: {
        backgroundColor: "#efefefef",
      },
      cardContainer: {
        height: 50,
        marginVertical: 30,
      },
   
     
  });

export default StripeApp
