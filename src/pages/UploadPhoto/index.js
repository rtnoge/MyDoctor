import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { IconAddPhoto, IconRemovePhoto, ILNullPhoto } from "../../assets";
import { Button, Gap, Header, Link } from "../../components";
import { Firebase } from "../../config";
import { colors, fonts, showError, storeData } from "../../utills";

const UploadPhoto = ({ navigation, route }) => {
  const { fullName, occupation, uid } = route.params;

  const [imgToDb, setImgToDb] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);

  const getImage = () => {
    const options = {
      includeBase64: true,
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200
    };

    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        showError("User cancelled upload a photo");
      } else if (response.error) {
        showError(response.errorMessage);
      } else {
        // alert(JSON.stringify(response));
        setImgToDb(`data: ${response.type};base64, ${response.base64}`);

        const source = { uri: response.uri };
        setPhoto(source);
        setHasPhoto(true);
      }
    });
  };

  const UploadNext = () => {
    Firebase.database()
      .ref("users/" + uid + "/")
      .update({ photo: imgToDb });

      const data = route.params;
      data.photo = imgToDb;

      storeData('user', data);

    navigation.replace("MainApp");
  };

  return (
    <View style={styles.page}>
      <Header title="Upload Photo" />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrap} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.occupation}>{occupation}</Text>
        </View>
        <View>
          <Button
            title="Upload and Continue"
            disable={!hasPhoto}
            onPress={UploadNext}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            size={16}
            onPress={() => {
              navigation.navigate("MainApp");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.white },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 64,
    flex: 1,
    justifyContent: "space-between",
  },
  profile: { alignItems: "center", flex: 1, justifyContent: "center" },
  avatar: { width: 110, height: 110, borderRadius: 110 / 2 },
  avatarWrap: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  addPhoto: { position: "absolute", bottom: 8, right: 6 },
  name: {
    fontSize: 24,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textAlign: "center",
  },
  occupation: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: 4,
  },
});
