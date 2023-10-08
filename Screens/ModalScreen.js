import { View, Text, Image} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import tw from 'tailwind-react-native-classnames';
import { useNavigation, useRoute } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { db } from '../Firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import EmailNPasswordLogin from '../components/EmailNPasswordLogin';
import { ActivityIndicator } from 'react-native';


const ModalScreen = () => {
    const navigation = useNavigation();
    const {user} = useAuth();
    //const { route } = useRoute();
    //const { name } = route;
    
    //console.log(user.name)

    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);
    const [displayName, setDisplayName] = useState(null);
    const [loading, setLoading] = useState(false);

    const incompleteForm = !image || !job || !age;

    const updateUserProfile = () => {
      setLoading(true);
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: displayName,
            PhotoUrl: image,
            job: job,
            age: age,
            timestamp: serverTimestamp()
        }).then(() => { 
          setLoading(false);
          navigation.navigate("Home")
            //navigation.navigate("Home")
        }).catch(error => {
          setLoading(false);
          alert(error.message)});
    }

useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false
    })
})

  return (
    <View style={tw`flex-1 items-center pt-3`}>
     <Image 
        style={tw`h-20 w-40 z-20`}
        resizeMode="contain"
        //source={{uri: "https://links.papareact.com/2pf"}}
        source={require('../assets/TrueBond.png')}
     />

     <Text style={tw`text-xl text-gray-500 font-bold p-2`}>Welcome {user.name || user.dispalyName}</Text>

     <Text  style={[tw`text-center font-bold p-4`, {color: "#a82597"}]}>
        Step 1: The Profile Picture
     </Text>
     <TextInput
      value={image}
      onChangeText={text => setImage(text)}
      style={tw`text-center text-xl pb-2 px-6`}
      placeholder='Enter a profile picture url'/>


     <Text style={[tw`text-center font-bold p-4`, {color: "#a82597"}]}>
        Step 2: Display Name
     </Text>
     <TextInput
      value={displayName}
      onChangeText={text => setDisplayName(text)}
      style={tw`text-center text-xl pb-2 px-6`}
      placeholder='Enter your Display Name'/>


     <Text style={[tw`text-center font-bold p-4`, {color: "#a82597"}]}>
        Step 3: The Job
     </Text>
     <TextInput
      value={job}
      onChangeText={text => setJob(text)}
      style={tw`text-center text-xl pb-2 px-6`}
      placeholder='Enter your Occupation'/>


     <Text style={[tw`text-center font-bold p-4`, {color: "#a82597"}]}>
        Step 4: The Age
     </Text>
     <TextInput
      value={age}
      onChangeText={text => setAge(text)}
      style={tw`text-center text-xl pb-2 px-6`}
      placeholder='Enter your age'
      maxLength={2}
      keyboardType='numeric'
      />

      <TouchableOpacity
      disabled={incompleteForm}
       style={[tw`w-64 p-3 rounded-xl absolute bottom-10`, incompleteForm ? tw`bg-gray-400` : tw`bg-red-400`]} onPress={updateUserProfile}>
        
        <Text style={tw`text-center text-white text-xl`}>Update Profile</Text>
      </TouchableOpacity>

       {/* Display loading indicator when loading is true */}
       {loading && (
                <View style={tw`absolute bottom-20`}>
                    <ActivityIndicator size="large" color="#A82597" />
                </View>
            )}
    </View>
  )
}

export default ModalScreen