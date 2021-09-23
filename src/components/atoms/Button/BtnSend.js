import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { IconSend, IconSendActive } from '../../../assets'
import { colors } from '../../../utills'

const BtnSend = ({disable, onPress}) => {
    if(disable) {
        return (
          <TouchableOpacity style={styles.container(disable)}>
            <IconSend />
          </TouchableOpacity>
        );
    }
    return (
        <TouchableOpacity onPress={onPress} style={styles.container(disable)}>
            <IconSendActive />
        </TouchableOpacity>
    )
}

export default BtnSend;

const styles = StyleSheet.create({
    container: (disable) => ({
        backgroundColor: disable ? colors.disable : colors.tertiary,
        width: 45,
        height: 45,
        borderRadius: 10,
        paddingTop: 3,
        paddingRight: 3,
        paddingBottom: 8,
        paddingLeft: 8
    })
})
