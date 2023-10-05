import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../Firebase';
import useAuth from '../hooks/useAuth';
import ChatRow from './ChatRow';

const ChatList = () => {
    const {user} = useAuth();
    const [matches, setMatches] = useState([]);

    useEffect(() => (
        onSnapshot(query(collection(db, "mutualMatches"), where("usersMatched", "array-contains", user.uid)), (snapshot) => setMatches(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })))
        )
    ),[user]);

    console.log(matches)

  return (
    matches.length > 0 ? (
        <FlatList 
            style={tw`h-full`}
            data={matches}
            keyExtrator={item => item.id}
            renderItem={({item}) => <ChatRow matchDetails={item}/>}
        />
    ): (
        <View style={tw`p-5`}>
            <Text style={tw`text-center text-lg`}>No Matches At The Moment</Text>
        </View>
    )
    
  )
}

export default ChatList