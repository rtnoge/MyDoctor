import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header, List } from "../../components";
import { Firebase } from "../../config";
import { colors } from "../../utills";

const ChooseDoctor = ({navigation, route}) => {
  const itemCategory = route.params;
  
  const [listDoctor, setListDoctor] = useState([]);
  
  useEffect(() => {
    callDoctorByCategory(itemCategory.category);
  }, [itemCategory.category]);

  const callDoctorByCategory = category => {
    Firebase.database()
      .ref("doctors/")
      .orderByChild("category")
      .equalTo(category)
      .once("value")
      .then((res) => {
        console.log("data response doctor", res.val());
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(item => {
            data.push({
              id: item,
              data: oldData[item]
            })
          })
          console.log('parsing list doctor', data);
          setListDoctor(data);
        }
      });
  };

  return (
    <View style={styles.page}>
      <Header type="dark" title={`Pilih ${itemCategory.category}`} onPress={() => navigation.goBack()} />
      {listDoctor.map(doctor => {
        return (
          <List
            type="next"
            key={doctor.id}
            pic={{uri: doctor.data.photo}}
            name={doctor.data.fullName}
            desc={doctor.data.gender}
            onPress={() => navigation.navigate("DoctorProfile", doctor)}
          />
        );
      })}
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
});
