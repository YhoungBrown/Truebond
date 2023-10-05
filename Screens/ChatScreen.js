import { View, Text, SafeAreaView} from 'react-native'
import React, { useLayoutEffect } from 'react'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native'
import ChatList from '../components/ChatList'


const ChatScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
},[]);


  return (
    <SafeAreaView>
      <Header title="Chat" callEnabled/>
      <ChatList />
    </SafeAreaView>
  )
}

export default ChatScreen