import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const StartGameScreen = props => {
    return(
        <View style={styles.startScreen}>
            <Text>Game Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    startScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
})

export default StartGameScreen