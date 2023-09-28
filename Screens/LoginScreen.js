import { View, Text, Button} from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
    
  return (
    <View>
      <Text>Login To The App</Text>
      <Button title='LogIn' onPress={signInWithGoogle}/>
    </View>
  )
}

export default LoginScreen