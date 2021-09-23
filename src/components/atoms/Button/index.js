import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../utills';
import BtnSend from './BtnSend';
import IconOnly from './IconOnly';

const Button = ({type, title, onPress, icon, disable}) => {
    if (type === 'icon-only') {
        return <IconOnly icon={icon} onPress={onPress}/>;
    }
    if (type === 'btn-icon-send') {
        return <BtnSend disable={disable} onPress={onPress } />;
    }
    if (disable) {
        return(
            <View style={styles.disableBg}>
            <Text style={styles.disableText}>{title}</Text>
        </View>
        )
    }
    return (
        <TouchableOpacity style={styles.container(type)} onPress={onPress}>
            <Text style={styles.text(type)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    container: type => ({
        backgroundColor: type === 'secondary' ? colors.button.secondary.background : colors.button.primary.background,
        paddingVertical: 10,
        borderRadius: 10
    }),
    text: (type) => (
        {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        color: type === 'secondary' ? colors.button.secondary.text : colors.button.primary.text,
        textAlign: 'center'
    }),
    disableBg: {
        backgroundColor: colors.button.disable.background,
        paddingVertical: 10,
        borderRadius: 10
    },
    disableText: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        color: colors.button.disable.text,
        textAlign: 'center'
    }
})
