import { View, Text, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList, ActivityIndicator} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import useAuth from '../hooks/useAuth'
import { useRoute } from '@react-navigation/native'
import tw from 'tailwind-react-native-classnames'
import { Button } from 'react-native'
import SenderMessage from '../components/SenderMessage'
import RecieverMessage from '../components/RecieverMessage'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../Firebase'


const MessageScreen = () => {
   // console.log('MessageScreen rendered'); 
    const {user} = useAuth();
    const {params} = useRoute();
    const {matchDetails} = params;
    //console.log(matchDetails)
   //console.log(user)

   const [input, setInput] = useState("")
   const [messages, setMessages] = useState([])
   const [loading, setLoading] = useState(false);


   const flatListRef = useRef(null);

   // Use this function to scroll to the bottom of the list
   const scrollToBottom = () => {
     flatListRef.current.scrollToEnd({ animated: false });
   };



   useEffect(() => {
    onSnapshot(
      query(collection(db, "mutualMatches", matchDetails.id, "messages"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const reversedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })).reverse(); // Reverse the order here
  
        setMessages(reversedMessages);
        scrollToBottom();
      }
    );
  }, [matchDetails, db]);
  

   //unreversed message
   {/**useEffect(() => {
    onSnapshot(
      query(collection(db, "mutualMatches", matchDetails.id, "messages"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [matchDetails, db]); */}
  
  //console.log(messages);

//console.log(messages)

   const sendMessage = () => {
    setLoading(true);
    // Check if PhotoUrl is defined, and provide a default value if it's not
    const photoUrl = matchDetails?.users?.[user.uid]?.PhotoUrl || '';
  
    addDoc(collection(db, "mutualMatches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      PhotoUrl: photoUrl, // Use the defined PhotoUrl or an empty string as a default
      message: input,
    });
  
    setInput("");

    setLoading(false);
  };
  

   
    
  return (
    <SafeAreaView style={tw`flex-1`}>
    <Header title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} callEnabled/>
      

      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1`}
      keyboardVerticalOffset={10}
      >

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList 
                data={messages}
                //or you can also use inverted=(-1) as a property to the flatlist to made change the order with which it displays
                style={tw`pl-4`}
                ref={flatListRef} // Reference to the FlatList
                onContentSizeChange={scrollToBottom} // Scroll to bottom when content size changes
                onLayout={scrollToBottom} // Scroll to bottom when layout changes
                keyExtractor={item => item.id}
                renderItem={({item : message}) => message.userId === user.uid ? 
                (
                    <SenderMessage key={message.id} message={message}/>
                ) : (
                    <RecieverMessage key={message.id} message={message}/>
                )
                }
                ListFooterComponent={loading && <ActivityIndicator size="small" color="#000" />}
            />

      </TouchableWithoutFeedback>
      

      <View style={tw`flex-row bg-white justify-between items-center border-t border-gray-200 px-5 py-2 `}>

      <TextInput 
            style={tw`h-10 text-lg`}
            placeholder="Send Message..."
            onChangeText={setInput}
           // onSubmitEditing={sendMessage}
            value={input}
        />
        <Button onPress={sendMessage} title="Send" color="#FF5864"/>
      </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MessageScreen