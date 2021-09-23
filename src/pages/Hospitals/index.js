import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import {
  DummyHospital1,
  DummyHospital2,
  DummyHospital3,
  ILHospitalBg,
} from "../../assets";
import { ListHospital } from "../../components/molecules";
import { Firebase } from "../../config";
import { colors, fonts, showError } from "../../utills";

const Hospitals = () => {
  const [hospital, setHospital] = useState([]);

  useEffect(() => {
    Firebase.database()
      .ref("hospital/")
      .once("value")
      .then((response) => {
        if (response.val()) {
          const beforeFilter = response.val();
          const afterFilter = beforeFilter.filter((item) => item !== null);
          setHospital(afterFilter);
        }
      })
      .catch((e) => {
        showError(e.message);
      });
  }, []);

  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBg} style={styles.background}>
        <Text style={styles.title}>Nearby Hospital</Text>
        <Text style={styles.desc}>3 Tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        {hospital.map((item) => {
          return (
            <ListHospital
            key={item.id}
              img={{uri: item.photo}}
              type={item.type}
              name={item.name}
              address={item.address}
            />
          );
        })}
        {/* <ListHospital
          img={DummyHospital1}
          type="Rumah Sakit"
          name="Citra Bunga Merdeka"
          address="Jl. Surya Sejahtera 20"
        />
        <ListHospital
          img={DummyHospital2}
          type="Rumah Sakit Anak"
          name="Happy Family & Kids"
          address="Jl. Surya Sejahtera 20"
        />
        <ListHospital
          img={DummyHospital3}
          type="Rumah Sakit Jiwa"
          name="Tingkatan Paling Atas"
          address="Jl. Surya Sejahtera 20"
        /> */}
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  background: { height: 240, paddingTop: 30 },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    textAlign: "center",
    marginTop: 6,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14,
  },
});
