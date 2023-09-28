import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
import * as Google from "expo-google-app-auth";


const AuthContext = createContext({});

const config = {
  iosClientId: "583816671405-c6ogj1t1n047tpf1qmeo8elb63b1emr6.apps.googleusercontent.com",
  androidClientId: "583816671405-8l32rl5oftfp32f7jaifgtqmet2jkna5.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  Permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {

    const signInWithGoogle = async() => {
        await Google.logInAsync(config).then(async (logInResult) => {
          if(logInResult.type === "success"){
            //Login
          }
        })
    }

  return (
    <AuthContext.Provider value={{
      user: null,
      signInWithGoogle
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext);
}