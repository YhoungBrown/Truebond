import { StatusBar } from 'react-native';
import { View, Text, Button, SafeAreaView, ImageBackground, TouchableOpacity} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

//import EmailNPasswordLogin from '../components/EmailNPasswordLogin';
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {
  const {loading, signInWithGoogle } = useAuth();
  const navigation = useNavigation()
   
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView style={[tw`flex-1`,{/**{marginTop: StatusBar.currentHeight}*/}]}>
     <ImageBackground
     resizeMode='cover'
     style={tw`flex-1`}
     source={{uri:"https://tinder.com/static/tinder.png"}}
     >

      <TouchableOpacity style={[tw`absolute bottom-10 w-52 bg-white p-4 rounded-2xl`,{marginHorizontal: "25%"}]} onPress={signInWithGoogle}>
        <Text style={tw`text-center font-semibold`}>Sign In and get Swipping</Text>
      </TouchableOpacity>

     </ImageBackground>
    </SafeAreaView>
  )
}

export default LoginScreen