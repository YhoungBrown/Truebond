import { View, Text, Image} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { db } from '../Firebase';
import { serverTimestamp } from 'firebase/firestore';


const ModalScreen = () => {
    const navigation = useNavigation()
    const {user} = useAuth()

    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const incompleteForm = !image || !job || !age;

    const updateUserProfile = () => {
        addDoc(doc(db, 'users', user.uid), {
            id: user.id,
            dispalyName: user,
            PhotoUrl: image,
            job: job,
            age: age,
            timestamp: serverTimestamp()
        }).then(() => {
            navigation.navigate("Home")
        }).catch(error => {alert(error.message)});
    }

useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false
    })
})

  return (
    <View style={tw`flex-1 items-center pt-3`}>
     <Image 
        style={tw`h-20 w-full z-20`}
        resizeMode="contain"
        source={{uri: "https://links.papareact.com/2pf"}}
     />

     <Text style={tw`text-xl text-gray-500 font-bold p-2`}>Welcome {user}</Text>

     <Text  style={tw`text-center text-red-400 font-bold p-4`}>
        Step 1: The Profile Picture
     </Text>
     <TextInput
      value={image}
      onChangeText={text => setImage(text)}
      style={tw`text-center text-xl pb-2`}
      placeholder='Enter a profile picture url'/>


     <Text style={tw`text-center text-red-400 font-bold p-4`}>
        Step 2: The Job
     </Text>
     <TextInput
      value={job}
      onChangeText={text => setJob(text)}
      style={tw`text-center text-xl pb-2`}
      placeholder='Enter your Occupation'/>


     <Text style={tw`text-center text-red-400 font-bold p-4`}>
        Step 3: The Age
     </Text>
     <TextInput
      value={age}
      onChangeText={text => setAge(text)}
      style={tw`text-center text-xl pb-2`}
      placeholder='Enter your age'
      maxLength={2}
      keyboardType='numeric'
      />

      <TouchableOpacity
      disabled={incompleteForm}
       style={[tw`w-64 p-3 rounded-xl absolute bottom-10`, incompleteForm ? tw`bg-gray-400` : tw`bg-red-400`]}>
        
        <Text onPress={updateUserProfile} style={tw`text-center text-white text-xl`}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ModalScreen