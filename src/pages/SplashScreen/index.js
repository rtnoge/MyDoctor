import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ILLogo } from "../../assets";
import { colors, fonts } from "../../utills";
import { Firebase } from "../../config";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubs = Firebase.auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          navigation.replace("MainApp");
        } else {
          navigation.replace("GetStarted");
        }
      }, 2000);
    });

    return () => unsubs();
  }, [navigation]);

  return (
    <View style={styles.pages}>
      <ILLogo />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: colors.text.primary,
    marginTop: 20,
    fontFamily: fonts.primary[600],
  },
});
