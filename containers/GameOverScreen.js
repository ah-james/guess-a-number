import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import Colors from '../constants/colors'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {

    return(
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.title} >
                    <TitleText style={styles.titleText} >Game Over!</TitleText>
                </View>
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
        </ScrollView>
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
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 20,
    },
    highlight: {
        color: Colors.primary,
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 60 : 20,
        marginBottom: 15,
    },
    title: {
        marginTop: 20,
    },
    titleText: {
        fontSize: 30,
    },
})

export default GameOverScreen