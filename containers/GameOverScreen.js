import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import Colors from '../constants/colors'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

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
    }
})

export default GameOverScreen