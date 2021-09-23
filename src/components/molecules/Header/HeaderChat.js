import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DummyDoctor4 } from "../../../assets";
import { colors, fonts } from "../../../utills";
import { Button } from "../../atoms";

const HeaderChat = ({onPress, title, desc, pic}) => {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-light" onPress={onPress} />
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.position}>{desc}</Text>
      </View>
      <Image source={pic} style={styles.avatar} />
    </View>
  );
};

export default HeaderChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 16,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
    alignItems: 'center'
  },
  content: {
      flex: 1
  },
  avatar: {
      height: 46,
      width: 46,
      borderRadius: 46/2
  },
  name: {
      fontSize: 20,
      fontFamily: fonts.primary[600],
      color: colors.white,
      textAlign: 'center'
  },
  position: {
      fontSize: 14,
      fontFamily: fonts.primary.normal,
      color: colors.text.subTitle,
      marginTop: 6,
      textAlign: 'center'
  }
});
