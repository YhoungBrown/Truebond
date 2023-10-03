import { Image, StatusBar, TouchableOpacity } from 'react-native';
import { View, Text, Button, SafeAreaView} from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-react-native-classnames';

import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import Swiper from 'react-native-deck-swiper';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';



const DUMMY_DATA = [
  {
    firstName: "Sonny",
    lastName: "Sangha",
    job: "Software Developer",
    photoUrl: "https://avatars.githubusercontent.com/u/24712956?v=4",
    age: 27,
    id: 1,
  },
  {
    firstName: "Clara",
    lastName: "Fanny",
    job: "Trader",
    photoUrl: "https://img.freepik.com/free-photo/indoor-studio-shot-attractive-pretty-woman-with-light-brown-hair-wearing-black-jacket-with-red-lips_291650-1321.jpg",
    age: 26,
    id: 2,
  },
  {
    firstName: "Elon",
    lastName: "Musk",
    job: "Software Developer",
    photoUrl: "https://i0.wp.com/factcheckhub.com/wp-content/uploads/2023/04/Elon_Musk_Royal_Society_crop2.jpg?w=1280&ssl=1",
    age: 50,
    id: 3,
  },
  {
    firstName: "Omotla",
    lastName: "Odumosu",
    job: "Software Developer",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMQCQ-416mk2_-FLfCDh3iavRKin9jGrNN1w&usqp=CAU",
    age: 25,
    id: 4,
  },
  {
    firstName: "Jenna",
    lastName: "Mcchena",
    job: "Real Estate Engineer",
    photoUrl: "https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700954114.jpg",
    age: 27,
    id: 5,
  },
  {
    firstName: "Ariana",
    lastName: "Grande",
    job: "Musician",
    photoUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQrEAZXkaDi-hKRLyGck4jyTzhcckUOBz1q4St3a1j-QmxMZLam",
    age: 25,
    id: 5,
  },
]



const HomeScreen = () => {
    const navigation = useNavigation();
    const {user, logOut} = useAuth();
    const swipeRef = useRef(null);
    const [profiles, setProfiles] = useState([]);

   
    
useEffect(() => {
  let unsub;

  const fetchCards = async () => {
    unsub = onSnapshot(collection(db, 'users'), (snapshot) => (      setProfiles(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    ))
  }

  console.log(profiles)

  fetchCards();
  return unsub;
},[])

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false
      });
      
      //for forcing registration modal to popup if there is no user registered
     const unsub = onSnapshot(doc(db, 'Users', user.uid), (snapshot) => {
      if(!snapshot.exists()){
        navigation.navigate("Modal")
      }
     });
     return unsub();
    },[])


  return (
    <SafeAreaView style={[tw`flex-1`,{marginTop: StatusBar.currentHeight}]}>
      {/**Header */}
      <View style={tw`items-center flex-row justify-between px-5`}>
        <TouchableOpacity onPress={logOut}>
            <Image
            style={tw`h-10 w-10 rounded-full`} 
            // source={{ uri: user.photoURL }} <- This is the way to do it assuming my google authentication(social login) worked
            source={require('../assets/YhoungBrown.jpg')} 
            />
        </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
        <Image style={tw`h-20 w-20`} resizeMode='contain' source={require('../assets/tinderName.png')}/>
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons
        onPress={() => navigation.navigate("Chat")}
         name='chatbubbles-sharp' size={30} color="#FF5864"/>
      </TouchableOpacity>
      </View>


      {/**End Of Header */}

      {/**Cards */}
      <View style={tw`flex-1 `}>
      <Swiper 
          ref={swipeRef}
          containerStyle={{ backGroungColor: "transparent"}}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          backgroundColor={"#4FD0E9"}
          onSwipedLeft={() => {
            console.log("Swipe Pass")
          }}
          onSwipedRight={() => {
            console.log("Swipe Matched")
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  textAlign: "left",
                  color: "#4DED30",
                },
              },
            },
          }}
          animateCardOpacity
          verticalSwipe={false}
          renderCard={card => card ? (
            <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`}>
              <Image
              style={tw`absolute top-0 h-full w-full rounded-xl`} 
                source={{uri: card.PhotoUrl}}
              />

              <View style={tw`absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl`}>
                <View>
                  <Text style={tw`text-xl font-bold`}>{card.displayName}</Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
              </View>
            </View>
          ) : (
              <View style={tw`relative bg-white h-3/4 rounded-xl justify-center items-center`}>
                  <Text style={tw`font-bold pb-5`}>No more profiles...</Text>

                  <Image 
                    style={tw`h-40 w-40`}
                    height={30}
                    width={30}
                    source={{ uri: "https://links.papareact.com/6gb" }}
                  />
              </View>
          )}
        />

      </View>


     <View style={tw`flex flex-row justify-evenly my-3`}>
      <TouchableOpacity
      onPress={() => swipeRef.current.swipeLeft()}
       style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`}>
            <Entypo 
              name='cross'
              color="red"
              size={24}
            />
      </TouchableOpacity>
     
      <TouchableOpacity 
      onPress={() => swipeRef.current.swipeRight()}
      style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`}>
            <AntDesign 
              name='heart'
              color="green"
              size={24}
            />
      </TouchableOpacity>
     </View>
    </SafeAreaView>
  )
}

export default HomeScreen