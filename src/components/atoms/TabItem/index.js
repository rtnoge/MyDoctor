import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { IconDoctor, IconDoctorActive, IconMaps, IconMapsActive, IconMessage, IconMessageActive } from "../../../assets";
import { colors, fonts } from "../../../utills";

const TabItem = ({ title, active, onPress, onLongPress }) => {
  const Icon = () => {
    if (title === "Doctor") {
      return active ? <IconDoctorActive /> : <IconDoctor />;
    }
    if (title === "Messages") {
      return active ? <IconMessageActive /> : <IconMessage />;
    }
    if (title === "Hospitals") {
      return active ? <IconMapsActive /> : <IconMaps />;
    }
    return <IconDoctor />;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  text: (active) => ({
    fontSize: 10,
    fontFamily: fonts.primary[600],
    color: active ? colors.text.menuActive : colors.text.menuInactive,
    marginTop: 4,
  }),
});
