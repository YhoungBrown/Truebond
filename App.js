import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import StackNavigator from './StackNavigator';
import { AuthProvider } from './hooks/useAuth';

export default function App() {

  return (
    <NavigationContainer>
    {/**HOC -> Higher Order Component*/}
      <AuthProvider>
      {/**Passes down the cool auth stuff to children */}
          <StackNavigator />
      </AuthProvider>

        <StatusBar style="auto" />

    </NavigationContainer>

    
  );
}

