import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import Colors from '../constants/colors'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

const GameOverScreen = props => {

    return(
        <View style={styles.screen}>
            <TitleText>Game Over!</TitleText>
            <Image source={require('../assets/khaled.jpg')} />
            <BodyText>There Were {props.totalRounds} Rounds</BodyText>
            <BodyText>Your Number Was {props.userNumber}</BodyText>
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