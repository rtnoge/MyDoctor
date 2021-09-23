import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DummyUser, IconRemovePhoto } from "../../../assets";
import { colors, fonts } from "../../../utills";

const Profile = ({ name, desc, isRemove, photo, onPress }) => {
  return (
    <View style={styles.container}>
      {!isRemove && (
        <View style={styles.borderAvatar}>
          <Image source={photo} style={styles.avatar} />
        </View>
      )}
      {isRemove && (
        <TouchableOpacity style={styles.borderAvatar} onPress={onPress}>
          <Image source={photo} style={styles.avatar} />
          {isRemove && <IconRemovePhoto style={styles.iconAvatar} />}
        </TouchableOpacity>
      )}
      {name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.occupation}>{desc}</Text>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  borderAvatar: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  name: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.text.primary,
    marginTop: 16,
    textAlign: "center",
  },
  occupation: {
    fontFamily: fonts.primary.normal,
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 2,
    textAlign: "center",
  },
  iconAvatar: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
});
