import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const Messages = () => {
  const [messagesList, setMessagesList] = useState([]);
  const route = useRoute();

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    subscriber.onSnapshot(querySnapshot => {
      const allMessages = querySnapshot.docs.map(item => {
        return {
          ...item.data(),
          _id: item.id,
          createdAt: item.data().createdAt,
          user: {
            _id: item.data().sendBy,
            avatar:
              'https://cdn.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.webp',
          },
        };
      });
      setMessagesList(allMessages);
    });

    return () => subscriber;
  }, []);

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessagesList(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );
    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .add({
        ...myMsg,
      });

    firestore()
      .collection('chats')
      .doc('' + route.params.data.userId + route.params.id)
      .collection('messages')
      .add({
        ...myMsg,
      });
  }, []);

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        textInputProps={{
          style: {
            color: 'black',
            fontSize: 14,
            padding: 10,
            flex: 1,
          },
        }}
        showAvatarForEveryMessage={true}
        showUserAvatar={false}
        messages={messagesList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
    </View>
  );
};

export default Messages;

// import { View, Text } from 'react-native'
// import React from 'react'

// const Messages = () => {
//   return (
//     <View>
//       <Text>Messages</Text>
//     </View>
//   )
// }

// export default Messages
