import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DummyHospital1 } from "../../../assets";
import { colors, fonts } from "../../../utills";

const ListHospital = ({type, name, address, img}) => {
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.img} />
      <View>
        <Text style={styles.label}>{type}</Text>
        <Text style={styles.label}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
};

export default ListHospital;

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  img: { height: 60, width: 80, borderRadius: 11, marginRight: 16 },
  label: {
    fontFamily: fonts.primary.normal,
    fontSize: 16,
    color: colors.text.primary,
    textTransform: 'capitalize'
  },
  address: {
    fontFamily: fonts.primary[300],
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 6
  },
});
