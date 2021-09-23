import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DummyNews1 } from "../../../assets";
import { colors, fonts } from "../../../utills";

const NewsItem = ({title, date, image}) => {
  return (
    <View style={styles.container}>
      <View style={styles.articleWrap}>
        <Text style={styles.article}>
          {title}
        </Text>
        <Text style={styles.timePost}>{date}</Text>
      </View>
      <Image source={{uri: image}} style={styles.img} />
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
    paddingTop: 16,
    paddingHorizontal: 16
  },
  articleWrap: { flex: 1 },
  article: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.primary,
    maxWidth: '90%'
  },
  timePost: {
    fontFamily: fonts.primary.normal,
    fontSize: 16,
    color: colors.text.secondary,
  },
  img: {
    width: 80,
    height: 60,
    borderRadius: 11,
  },
});
