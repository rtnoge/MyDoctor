import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors, fonts } from '../../../utills';
import { Button } from '../../atoms';

const InputChat = ({value, onChangeText, onButtonPress, to}) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.inputText} placeholder={`Tulis pesan untuk ${to}`} value={value} onChangeText={onChangeText} />
            <Button type="btn-icon-send" onPress={onButtonPress} disable={value.length < 1} />
        </View>
    )
}

export default InputChat;

const styles = StyleSheet.create({
    container: {padding: 16, flexDirection: 'row', backgroundColor: colors.white},
    inputText: {
        backgroundColor: colors.disable,
        padding: 14,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
        fontSize: 14,
        fontFamily: fonts.primary.normal,
        maxHeight: 45
    }
})
