import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor
} from "../../components";
import { Firebase } from "../../config";
import { colors, fonts, showError } from "../../utills";

const Doctor = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [categoryDoc, setCategoryDoc] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getNews();
    getTopRated();
    getCategory();
  }, []);

  const getTopRated = () => {
    Firebase.database()
      .ref("doctors/")
      .orderByChild('rate')
      .limitToLast(3)
      .once("value")
      .then((res) => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });

          console.log('data hasil parse', data);
          setDoctors(data);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getNews = () => {
    Firebase.database()
      .ref("news/")
      .once("value")
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(lmen => lmen !== null);
          setNews(filterData);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getCategory = () => {
    Firebase.database()
      .ref("category_doc/")
      .once("value")
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(lmen => lmen !== null);
          setCategoryDoc(filterData);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.sectionWrapper}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate("UserProfiles")} />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.scrollWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.card}>
                <Gap width={32} />
                {categoryDoc.map((item) => {
                  return (
                    <DoctorCategory
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate("ChooseDoctor", item)}
                    />
                  );
                })}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map((doctor) => {
              return (
                <RatedDoctor
                  key = {doctor.id}
                  name= {doctor.data.fullName}
                  position={doctor.data.profession}
                  pic={{uri: doctor.data.photo}}
                  onPress={() => {
                    navigation.navigate("DoctorProfile", doctor);
                  }}
                />
              );
            })}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map((item) => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  sectionWrapper: { paddingHorizontal: 16 },
  welcome: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  card: { flexDirection: "row" },
  scrollWrapper: { marginHorizontal: -16 },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
