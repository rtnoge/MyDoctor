import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ChatItem, Header, InputChat } from "../../components";
import { Firebase } from "../../config";
import {
  colors,
  fonts,
  getChatTime,
  getData,
  showError,
  setDateChat,
} from "../../utills";

const Chat = ({ navigation, route }) => {
  const dataDoctor = route.params;

  const [chatContent, setChatContent] = useState("");
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getUserLocal();

    const chatID = `${user.uid}_${dataDoctor.data.id}`;
    const url_firebase = `chatting/${chatID}/allChat/`;

    Firebase.database()
      .ref(url_firebase)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const dataSnap = snapshot.val();
          const allChat = [];
          
          Object.keys(dataSnap).map(key => {
            const dataChat = dataSnap[key];
            const newDataChat = [];

            Object.keys(dataChat).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                ...dataChat[itemChat]
              });

            });

            allChat.push({
              id: key,
              ...newDataChat,
            });
          });
          console.log("all data chat", allChat);
          setChatData(allChat);
        }
      });

      return () => {
        setChatData([]);
      }
  }, [dataDoctor.data.id, user.uid]);

  const getUserLocal = () => {
    getData("user").then((res) => {
      setUser(res);
    });
  };

  const chatSend = () => {
    const today = new Date();

    const data = {
      sendBy: user.uid,
      chatDate: new Date().getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    const chatID = `${user.uid}_${dataDoctor.data.id}`;

    const url_firebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
    const url_msg_user = `messages/${user.uid}/${chatID}`;
    const url_msg_doctor = `messages/${dataDoctor.data.id}/${chatID}`;
    
    const history_chat_user = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      idPartner: dataDoctor.data.id,
    };
    
    const history_chat_doctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      idPartner: user.uid,
    };

    Firebase.database()
      .ref(url_firebase)
      .push(data)
      .then(() => {
        setChatContent("");
        Firebase.database().ref(url_msg_user).set(history_chat_user);

        Firebase.database().ref(url_msg_doctor).set(history_chat_doctor);
      })
      .catch((e) => {
        showError(e.message);
      });
  };

  return (
    <View style={styles.page}>
      <Header
        title={dataDoctor.data.fullName}
        type="header-chat"
        desc={dataDoctor.data.profession}
        pic={{ uri: dataDoctor.data.photo }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.timeMsg}>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isOut={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      pic={isMe ? null : { uri: dataDoctor.data.photo }}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        to={dataDoctor.data.fullName}
        value={chatContent}
        onChangeText={(value) => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { flex: 1 },
  timeMsg: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    textAlign: "center",
    marginVertical: 20,
  },
});
