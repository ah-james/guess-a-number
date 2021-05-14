import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../constants/colors'

const Header = props => {

    return(
        <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        // move text down from top of component
        paddingTop: 40,
        backgroundColor: Colors.primary,
        // center text on the page
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'black',
        fontSize: 18,
    }
})

export default Header