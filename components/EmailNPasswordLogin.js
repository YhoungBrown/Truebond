import React, { Component } from 'react';
import { View, Button, TextInput} from 'react-native';
import tw from 'tailwind-react-native-classnames';

import firebase from 'firebase';
//import firebase from 'firebase/compat/app';
import { TouchableOpacity } from 'react-native';
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';

export class EmailNPasswordLogin extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const { email, password, name} = this.state;
        //registration function
        firebase.auth().createUserWithEmailAndPassword(email, password)
        //the above is a synchronise function that runs withouth interupting our app, and when a response is recieved from the firebase server, the below will run
        .then((result) => {
          firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email
          })
          console.log(result)
        })
          //the below is for if something goes wrong or the server returns an error, then the below will be called (will run)
        .catch((error) => {
          console.log(error)
        })
    }

  render() {
    return (
      <View>
            <TextInput 
               placeholder= "name" 
               onChangeText={(name) => this.setState({name})}
            />
            <TextInput 
               placeholder= "email" 
               onChangeText={(email) => this.setState({email})}
            />
            <TextInput 
               placeholder= "password" 
               secureTextEntry={true}
               onChangeText={(password) => this.setState({password})}
            />

            <TouchableOpacity 
                onPress={() => this.onSignUp()}>
                    <Text>Sign Up</Text>
            </TouchableOpacity>
            
      </View>
    )
  }
}

export default EmailNPasswordLogin