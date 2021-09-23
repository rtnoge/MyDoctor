import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utills'
import { Button, Gap } from '../../atoms'
import HeaderChat from './HeaderChat'

const Header = ({title, onPress, type, pic, desc}) => {
    if (type === 'header-chat') {
        return <HeaderChat onPress={onPress} title={title} desc={desc} pic={pic} />
    }
    return (
        <View style={styles.container(type)}>
            {/* <IconBackDark /> */}
            <Button type="icon-only" icon={type === 'dark' ? 'back-light' : 'back-dark'} onPress={onPress}/>
            <Text style={styles.text(type)}>{title}</Text>
            <Gap width={24} />
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: type => ({
        paddingHorizontal: 16,
        paddingVertical: 30,
        backgroundColor: type === 'dark' ? colors.secondary : colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: type === 'dark' ? 20 : 0,
        borderBottomRightRadius: type === 'dark' ? 20 : 0
    }),
    text: type => ({
        textAlign: 'center',
        flex: 1,
        fontSize: 20,
        color: type === 'dark' ? colors.white : colors.text.primary,
        fontFamily: fonts.primary[600],
        textTransform: 'capitalize'
    })
})
