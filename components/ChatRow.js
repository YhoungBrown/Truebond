import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import tw from 'tailwind-react-native-classnames';

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    // Ensure that matchDetails and user exist before fetching user info
    if (matchDetails && user) {
      const userInfo = getMatchedUserInfo(matchDetails.users, user.uid);
      setMatchedUserInfo(userInfo);
    }
  }, [matchDetails, user]);

 // console.log(matchedUserInfo)

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
        <Text>Say Hi!</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
