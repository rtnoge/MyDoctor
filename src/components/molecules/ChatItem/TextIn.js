import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DummyDoctor4 } from "../../../assets";
import { colors, fonts } from "../../../utills";

const TextIn = ({text, date, pic}) => {
  return (
    <View style={styles.container}>
      <Image source={pic} style={styles.avatar} />
      <View>
        <View style={styles.bubbleIn}>
          <Text style={styles.textIn}>
            {text}
          </Text>
        </View>
      <Text style={styles.textDate}>{date}</Text>
      </View>
    </View>
  );
};

export default TextIn;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "flex-end",
    paddingLeft: 16,
    flexDirection: "row",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 12,
  },
  bubbleIn: {
    backgroundColor: colors.primary,
    padding: 12,
    paddingRight: 18,
    maxWidth: "80%",
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  textIn: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.white,
  },
  textDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
