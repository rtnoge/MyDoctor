import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ILNullPhoto } from "../../../assets";
import { colors, fonts, getData } from "../../../utills";

const HomeProfile = ({onPress}) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    occupation: ''
  });
  
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(res);
    })
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={profile.photo} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.occupation}>{profile.occupation}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
    container: {flexDirection: 'row'},
    avatar: {width: 46, height: 46, borderRadius: 46/2, marginRight: 12},
    name: {fontSize: 16, fontFamily: fonts.primary[600], color: colors.text.primary, textTransform: 'capitalize'},
    occupation: {fontSize: 12, fontFamily: fonts.primary.normal, color: colors.text.secondary, textTransform: 'capitalize'}
});
