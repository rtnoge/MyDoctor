import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconRate } from "../../../assets";
import { colors, fonts } from "../../../utills";

const RatedDoctor = ({ name, position, pic, onPress }) => {
  return (
    <TouchableOpacity style={styles.page} onPress={onPress}>
      <Image source={pic} style={styles.avatar} />
      <View style={styles.profile}>
        <Text style={styles.labelName}>{name}</Text>
        <Text style={styles.labelPosition}>{position}</Text>
      </View>
      <View style={styles.rate}>
        <IconRate />
        <IconRate />
        <IconRate />
        <IconRate />
        <IconRate />
      </View>
    </TouchableOpacity>
  );
};

export default RatedDoctor;

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: "center",
  },
  labelName: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.primary,
  },
  labelPosition: {
    fontFamily: fonts.primary.normal,
    fontSize: 12,
    color: colors.text.secondary,
  },
  rate: {
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 12,
  },
  profile: {
    flex: 1,
  },
});
