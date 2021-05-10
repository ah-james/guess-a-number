import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

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
        paddingTop: 40,
        backgroundColor: '#BBE5ED',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'black',
        fontSize: 18,
    }
})

export default Header