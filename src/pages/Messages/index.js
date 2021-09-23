import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DummyDoctor1, DummyDoctor2, DummyDoctor3 } from "../../assets";
import { List } from "../../components";
import { colors, fonts, getData } from "../../utills";
import { Firebase } from "../../config";

const Messages = ({navigation}) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getUserLocal();

    const rootDB = Firebase.database().ref();
    const url_history = `messages/${user.uid}/`;
    const msgDB = rootDB.child(url_history);

    msgDB.on('value', async snapshot => {
      if(snapshot.val()) {
        const oldData = snapshot.val();
        const arrHis = [];

        const promises = await Object.keys(oldData).map(async key => {
          const urlIDDoctor = `doctors/${oldData[key].idPartner}`;
          const detailDoctor = await rootDB.child(urlIDDoctor).once('value');

          arrHis.push({
            id: key,
            detailDoctor: detailDoctor.val(),
            ...oldData[key]
          })
        })

        await Promise.all(promises);
        setHistoryChat(arrHis);
      }
    })
  }, []);

  const getUserLocal = () => {
    getData("user").then((res) => {
      setUser(res);
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map((chat) => {
          const dataDoctor = {
            id: chat.detailDoctor.uid,
            data: chat.detailDoctor
          };

          return (
            <List
              key={chat.id}
              pic={{uri: chat.detailDoctor.photo}}
              name={chat.detailDoctor.fullName}
              desc={chat.lastContentChat}
              onPress={() => {navigation.navigate('Chat', dataDoctor)}}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
