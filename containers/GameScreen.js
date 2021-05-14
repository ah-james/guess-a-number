import React, {useState, useRef, useEffect} from 'react'
import {View, Text, StyleSheet, Button, Alert } from 'react-native'
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
    const [rounds, setRounds] = useState(0)

    const currentMax = useRef(99)
    const currentMin = useRef(1)

    const { userNumber, handleGameOver } = props

    // useEffect hook runs side-effects (calculations that don't target output value) separately from rendering
    useEffect(() => {
        if (currentGuess === userNumber) {
            handleGameOver(rounds)
        }
    }, [currentGuess, userNumber, handleGameOver])

    const handleNextGuess = direction => {
        if ((direction === 'lower' && currentGuess < props.userNumber) || (direction === 'higher' && currentGuess > props.userNumber)) {
            Alert.alert(`Are You Lying?`, `Lying is for Fools`, [{text: 'Sorry!', style: 'cancel'}])
            return
        }
        if (direction === 'lower') {
            currentMax.current = currentGuess
        } else {
            currentMin.current = currentGuess
        }
        const nextGuess = generateRandomNumber(currentMin.current, currentMax.current, currentGuess)
        setCurrentGuess(nextGuess)
        setRounds(currentRounds => currentRounds  + 1)
    }

    return(
        <View style={styles.screen}>
            <Text>Computer's Guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer} >
                <Button title="Lower" onPress={handleNextGuess.bind(this, 'lower')} color={Colors.secondary} />
                <Button title="Higher" onPress={handleNextGuess.bind(this, 'higher')} color={Colors.primary} />
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