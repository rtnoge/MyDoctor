import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ILNullPhoto } from "../../assets";
import { Gap, Header, List, Profile } from "../../components";
import { Firebase } from "../../config";
import { colors, getData, showError } from "../../utills";

const UserProfiles = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    occupation: '',
    photo: ILNullPhoto
  });

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo}
      setProfile(data);
    })
  }, []);

  const signtOut = () => {
    Firebase.auth().signOut().then(res => {
      navigation.replace('GetStarted');
    }).catch(e =>{
      showError(e.message);
    })
  };

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => {navigation.goBack()}} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile name={profile.fullName} desc={profile.occupation} photo={profile.photo} />
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last updated yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => {navigation.navigate('UpdateProfile')}}
      />
      <List
        name="Language"
        desc="Available 12 languages"
        type="next"
        icon="language"
      />
      <List
        name="Give Us Rate"
        desc="On Google Play Store"
        type="next"
        icon="rate"
      />
      <List
        name="Sign Out"
        desc="Logout from User"
        type="next"
        icon="help"
        onPress={signtOut}
      />
    </View>
  );
};

export default UserProfiles;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white
    }
});
