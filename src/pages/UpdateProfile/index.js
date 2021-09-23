import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { ILNullPhoto } from "../../assets";
import { Button, Gap, Header, Input, Profile } from "../../components";
import { Firebase } from "../../config";
import { colors, getData, showError, storeData } from "../../utills";

const UpdateProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    fullName: '',
    occupation: '',
    photo: ILNullPhoto,
    email: ''
  });

  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [imgToDb, setImgToDb] = useState('');

  useEffect(() => {
    getData('user').then((res) => {
      const data = res; 
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  const update = () => {
    console.log('profile: ', profile);

    console.log('new password:', password);

    if (password.length > 0) {
      if (password.length < 6) {
        showError('Password kurang dari 6 karakter');
      } else {
        // update password
        updatePassword();
        updateProfileData();
        navigation.replace('MainApp');
      }
    } else {
      updateProfileData();
      navigation.replace('MainApp');
    }
  };

  const updatePassword = () => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.updatePassword(password).catch((e) => {
          showError(e.message);
        });
      }
    });
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = imgToDb;

    Firebase.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        console.log('data updated: ', data);
        storeData('user', data);
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    const options = {
      includeBase64: true,
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200,
    };

    launchImageLibrary(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        showError("User cancelled upload a photo");
      } else if (response.error) {
        showError(response.errorMessage);
      } else {
        // alert(JSON.stringify(response));
        setImgToDb(`data: ${response.type};base64, ${response.base64}`);
        alert(JSON.stringify(response.uri));
        const source = { uri: response.uri };
        setPhoto(source);
      }
    },);
  };

  return (
    <View style={styles.page}>
      <Header
        title="Daftar Akun"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value) => changeText("fullName", value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.occupation}
            onChangeText={(value) => changeText("occupation", value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
