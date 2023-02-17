import { View, Text } from 'react-native'
import React from 'react'
import StripeApp from './StripeApp'
import {StripeProvider} from '@stripe/stripe-react-native'


const PaymentMethod = () => {
  return (
    <View>

      <StripeProvider publishableKey='pk_test_51LqdnhBKftHehnLjj3UjXBLpyXNDbAICMGFu9qyyhAFSvlWVhBW5MaV4lklaWM5QN9gRvEqL6z123cGZARCrqk7X00IuBzYM05'>
        <StripeApp/>
      </StripeProvider>

    </View>
  )
}

export default PaymentMethod