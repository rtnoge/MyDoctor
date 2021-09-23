import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { Button, Gap, Header, Input } from "../../components";
import { Firebase } from "../../config";
import { colors, showError, storeData, useForm } from "../../utills";

const Register = ({ navigation }) => {
  const [form, setForm] = useForm({
    fullName: "",
    occupation: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const onContinue = () => {
    dispatch({ type: "SET_LOADING", value: true });
    Firebase.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((success) => {
        dispatch({ type: "SET_LOADING", value: false });
        setForm("reset");

        const data = {
          fullName: form.fullName,
          occupation: form.occupation,
          email: form.email,
          uid: success.user.uid,
        };

        Firebase.database()
          .ref("users/" + success.user.uid + "/")
          .set(data);

        storeData("user", data);

        navigation.navigate("UploadPhoto", data);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        dispatch({ type: "SET_LOADING", value: false });

        showError(errorMessage);
      });
  };
  return (
    <View style={styles.page}>
      <Header title="Daftar Akun" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={(value) => setForm("fullName", value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={form.occupation}
            onChangeText={(value) => setForm("occupation", value)}
          />
          <Gap height={24} />
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={(value) => setForm("email", value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(value) => setForm("password", value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Continue" onPress={onContinue} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
