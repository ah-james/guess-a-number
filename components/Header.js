import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import Colors from '../constants/colors'
import TitleText from '../components/TitleText'

const Header = props => {

    return(
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
            <TitleText>{props.title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        // move text down from top of component
        paddingTop: 40,
        // center text on the page
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS: {
        backgroundColor: Colors.secondary,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
    },
})

export default Header