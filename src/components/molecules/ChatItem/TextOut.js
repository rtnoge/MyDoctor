import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../../utills";

const TextOut = ({text, date}) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubbleOut}>
        <Text style={styles.textOut}>
          {text}
        </Text>
      </View>
      <Text style={styles.textDate}>{date}</Text>
    </View>
  );
};

export default TextOut;

const styles = StyleSheet.create({
  container: { marginBottom: 20, alignItems: "flex-end", paddingRight: 16 },
  bubbleOut: {
    backgroundColor: colors.cardLight,
    padding: 12,
    paddingRight: 18,
    maxWidth: "70%",
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  textOut: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  textDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
