import React, { useContext, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

import { auth, db } from '../Firebase'; // Import your Firebase config

import { AuthContext } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';






function EmailNPasswordLogin() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  console.log(name)

  const navigation = useNavigation()

  //const { signInWithGoogle, logOut, memoedValue} = useContext(AuthContext);
  //const { user, setUser } = memoedValue;
  //const { signInWithGoogle, logOut, user, setUser } = useContext(AuthContext);


  const Login = async () => {
    try {
      //const auth = getAuth(); // Get the auth instance from Firebase

      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Access the user from the userCredential
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      Alert.alert('Login Error', error.message);
      console.error(error);
    }
  };



  const onSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      if (userCredential) {
        const { uid } = userCredential.user;
  
        // First, set the user document in Firestore
        const userDocRef = doc(db, 'users', uid);
        await setDoc(userDocRef, {
          name,
          email,
        });
  
        // Then, set the user in the context
        //setUser(uid);
        navigation.navigate("Modal");
        Alert.alert("Registration Successful", "set up your Profile", [{text: "OK"}]);
        console.log('Registration success');
      }
    } catch (error) {
      alert("Registration Error", error)
      console.error('Registration error', error);
    }
  };
  

  return (
    <View style={[tw`absolute bottom-20 pb-2 items-center`, { marginHorizontal: '25%' }]}>
      <TextInput
        style={tw`w-52 p-2 rounded-2xl border border-white mb-2`}
        placeholder="Name"
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        style={tw`w-52 p-2 rounded-2xl border border-white mb-2`}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={tw`w-52 p-2 rounded-2xl border border-white mb-2`}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <View style={tw`flex-row justify-center`}>

      <TouchableOpacity style={tw`font-bold text-white px-1`} onPress={Login}>
        <Text style={tw`font-bold text-white text-lg `}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`font-bold text-white px-1`} onPress={onSignUp}>
        <Text style={tw`font-bold text-white text-lg`}>| Sign Up</Text>
      </TouchableOpacity>
      
      </View>
    </View>
  );
}

export default EmailNPasswordLogin;
