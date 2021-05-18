import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import Colors from '../constants/colors'
import TitleText from '../components/TitleText'

const Header = props => {

    return(
        <View style={styles.header}>
            <TitleText>{props.title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        // move text down from top of component
        paddingTop: 40,
        backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.secondary,
        // center text on the page
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Platform.OS === 'ios' ? 'gray' : 'transparent'
    },
})

export default Header