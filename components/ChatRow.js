//import React, { useEffect, useState } from 'react';
import React, { useState, useEffect } from 'react';

import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import tw from 'tailwind-react-native-classnames';
import { db } from '../Firebase';
import { Timestamp, collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("");
  const MAX_MESSAGE_LENGTH = 35;


  useEffect(() => {
    // Ensure that matchDetails and user exist before fetching user info
    if (matchDetails && user) {
      const userInfo = getMatchedUserInfo(matchDetails.users, user.uid);
      setMatchedUserInfo(userInfo);
    }
  }, [matchDetails, user]);


//useEffect for fetching last messages
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "mutualMatches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        const orderedMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          const timestamp = data.timestamp; // Replace with your actual timestamp field name
          console.log("Timestamp:", timestamp); // Log the timestamp
          return data;
        });
        setLastMessage(orderedMessages[0]?.message);
        
        // Log the value here, inside the useEffect
        console.log(lastMessage);

      }
    );
  
    // Return the unsubscribe function to clean up the snapshot listener
    return () => unsubscribe();
  }, [matchDetails, db, setLastMessage]);

  
  

 // console.log(matchedUserInfo)
 //console.log(matchDetails)

  // If matchedUserInfo is not available yet, display a loading message
  if (!matchedUserInfo) {
    return (
      <View style={tw`flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg shadow-lg`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Message", { matchDetails })}
      style={tw`flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg shadow-lg`}
    >
      <Image
        style={tw`rounded-full h-16 w-16 mr-4`}
        source={{ uri: matchedUserInfo.PhotoUrl || '' }} // Make sure PhotoUrl exists and handle null case
      />

      <View>
        <Text style={tw`text-lg font-semibold`}>
          {matchedUserInfo.displayName || 'No Name'} {/* Handle missing display name */}
        </Text>
        <Text>
        {lastMessage && lastMessage.length > MAX_MESSAGE_LENGTH
          ? `${lastMessage.slice(0, MAX_MESSAGE_LENGTH)}...`
          : lastMessage || "Say Hi"}
      </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
