import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>I Am HomeScreen</Text>
      <Button onPress={() => navigation.navigate('Chat')} title='Go To Chat Screen'/>
    </View>
  )
}

export default HomeScreen