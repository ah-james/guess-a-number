import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Colors from '../constants/colors'

const GameOverScreen = props => {

    return(
        <View style={styles.screen}>
            <Text>Game Over!</Text>
            <Text>There Were {props.totalRounds} Rounds!</Text>
            <Text>The Number Was {props.userNumber}</Text>
            <Button title='New Game' onPress={props.handleNewGame} color={Colors.secondary} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default GameOverScreen