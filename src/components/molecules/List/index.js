import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  IconAccount,
  IconDesc,
  IconLanguage,
  IconNext,
  IconRating,
} from "../../../assets";
import { colors, fonts } from "../../../utills";

const List = ({ pic, name, desc, type, onPress, icon }) => {
  const Icon = () => {
    if (icon === "edit-profile") {
      return <IconAccount />;
    }
    if (icon === "language") {
      return <IconLanguage />;
    }
    if (icon === "rate") {
      return <IconRating />;
    }
    if (icon === "help") {
      return <IconDesc />;
    }
    return <IconAccount />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? <Icon /> : <Image source={pic} style={styles.avatar} />}
      <View style={styles.content}>
        <Text style={styles.labelName}>{name}</Text>
        <Text style={styles.labelChat}>{desc}</Text>
      </View>
      {type === "next" && <IconNext />}
    </TouchableOpacity>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: "center",
  },
  content: { flex: 1, marginLeft: 16 },
  avatar: { width: 46, height: 46, borderRadius: 46 / 2 },
  labelName: {
    fontFamily: fonts.primary.normal,
    fontSize: 16,
    color: colors.text.primary,
  },
  labelChat: {
    fontFamily: fonts.primary[300],
    fontSize: 12,
    color: colors.text.secondary,
    textTransform: 'capitalize'
  },
});
