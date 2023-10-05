import { View, Text, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import tw from 'tailwind-react-native-classnames'


const ChatRow = ({matchDetails}) => {
    const navigation = useNavigation();
    const {user} = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);


    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
    }, [matchDetails, user]);
//console.log(matchedUserInfo)

  return (
    <TouchableOpacity
    onPress={() => navigation.navigate("Message", {matchDetails})}
     style={tw`flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg shadow-lg`}>
      <Image 
        style={tw`rounded-full h-16 w-16 mr-4`}
        source={{ uri: matchedUserInfo?.PhotoUrl }}
      />

      <View>
        <Text style={tw`text-lg font-semibold`}>
        {matchedUserInfo?.displayName}
        </Text>
        <Text>Say Hi!</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ChatRow