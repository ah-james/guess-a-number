import React, {useState} from 'react'
import {View, Text, StyleSheet, Button } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import Colors from '../constants/colors'

generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const randomNumber = Math.floor(Math.random() * (max - min)) + min
    if (randomNumber === exclude) {
        return generateRandomNumber(min, max, exclude)
    } else {
        return randomNumber
    }
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomNumber(1, 99, props.userNumber))

    return(
        <View style={styles.screen}>
            <Text>Computer's Guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer} >
                <Button title="Lower" onPress={() => {}} color={Colors.secondary} />
                <Button title="Higher" onPress={() => {}} color={Colors.primary} />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})

export default GameScreen