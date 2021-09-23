import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../utills';

const ProfileItem = ({title, value}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    )
}

export default ProfileItem;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    title: {
        fontFamily: fonts.primary.normal,
        fontSize: 14,
        color: colors.text.secondary,
        marginBottom: 6
    },
    value: {
        fontFamily: fonts.primary.normal,
        fontSize: 14,
        color: colors.text.primary
    }
})
