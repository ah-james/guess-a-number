import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from './constants/colors'

const MainButton = props => {
    return <TouchableOpacity onPress={props.onPress}>
        <View style={{...styles.button, ...props.style}}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    text: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18,
    },
})

export default MainButton