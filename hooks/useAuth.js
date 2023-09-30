import { View, Text } from 'react-native'
import React, { createContext, useContext, useState, useEffect, useMemo} from 'react'
import * as Google from "expo-google-app-auth";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { auth } from '../Firebase';


const AuthContext = createContext({});

const config = {
  iosClientId: "583816671405-c6ogj1t1n047tpf1qmeo8elb63b1emr6.apps.googleusercontent.com",
  androidClientId: "583816671405-8l32rl5oftfp32f7jaifgtqmet2jkna5.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true) //to take care of the brief loging page shown before it gets the credential of a signed in user from firebase and redirect them to homescreen
  const [loading, setLoading] = useState(false);

  useEffect(() => onAuthStateChanged(auth, (user) => {
      if (user) {
        //logged in
        setUser(user);
      }else{
       //not logged in 
       setUser(null);
      }

      setLoadingInitial(false);
    }),
   [])


   const logOut = () => {
    setLoading(true);

    signOut(auth).catch((error) => setError(error)).finally(() => setLoading(false))
   }

    const signInWithGoogle = async() => {
        setLoading(true);

        await Google.logInAsync(config).then(async (logInResult) => {
          if(logInResult.type === "success"){
            //Login
            const {idToken, accessToken} = logInResult;
            const credential = GoogleAuthProvider.credential(idToken, accessToken);
            
            await signInWithCredential(auth, credential)
          }

          return Promise.reject();

        })
        .catch(error => setError(error) )
        .finally(() => setLoading(false))
    }


    const memoedValue = useMemo(() => ({ 
      user,
      loading,
      error,
      signInWithGoogle,
      logOut,
    }), [loading, error, user])

  return (
    <AuthContext.Provider value={{
      //user: "Omotola",
      memoedValue
      }}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext);
}