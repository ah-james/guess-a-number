import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import Colors from '../constants/colors'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {

    return(
        <View style={styles.screen}>
            <TitleText>Game Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                style={styles.image} 
                // source={require('../assets/success.jpg')} 
                source={{uri: 'https://blueseatblogs.com/wp-content/uploads/2018/07/consciousness-709143-400x300.jpg'}}
                />
            </View>
            <BodyText style={styles.resultText}>It took <Text style={styles.highlight}>{props.totalRounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
            <MainButton onPress={props.handleNewGame} >New Game</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    highlight: {
        color: Colors.primary,
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20,
    }
})

export default GameOverScreen