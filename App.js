import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import StackNavigator from './StackNavigator';
import { AuthProvider } from './hooks/useAuth';

import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
    {/**HOC -> Higher Order Component*/}
      
      {/**Passes down the cool auth stuff to children */}
          <StackNavigator />
      

        <StatusBar style="auto" />

        </NavigationContainer>
    </AuthProvider>
    
  );
}

