import { View, Text, TouchableOpacity, Image} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import tw from 'tailwind-react-native-classnames';

const MatchedScreen = () => {
    const navigation = useNavigation();
    const {params} = useRoute();

    const { loggedInProfile, userSwiped } = params;

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false
        });
    },[]);

  return (
    <View style={[tw`h-full bg-red-500 pt-20`, {opacity: 0.89}]}>
      <View style={tw`justify-center px-10 pt-20`}>
        <Image
        style={tw`h-20 w-full`}
         source={{ uri: "https://links.papareact.com/mg9"}}/>
      </View>

      <Text style={tw`text-white text-center mt-5`}>
        You and {userSwiped.displayName} have linked each other
      </Text>

      <View style={tw`flex-row justify-evenly mt-5`}>
            <Image 
                style={tw`h-32 w-32 rounded-full`}
                source={{ uri:loggedInProfile.PhotoUrl }}
            />
            <Image 
                style={tw`h-32 w-32 rounded-full`}
                source={{ uri:userSwiped.PhotoUrl }}
            />
      </View>

      <TouchableOpacity
      onPress={() => {
        navigation.goBack();
        navigation.navigate("Chat")
      }} 
      style={tw`bg-white m-5 px-10 py-8 rounded-full mt-20`}
      >
        <Text style={tw`text-center`}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MatchedScreen