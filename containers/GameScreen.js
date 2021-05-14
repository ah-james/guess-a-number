import React, {useState, useRef, useEffect} from 'react'
import {View, Text, StyleSheet, Button, Alert } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import Colors from '../constants/colors'

generateRandomNumber = (min, max, exclude) => {
    // min & max number use ceil and floor to stop debauchery
    min = Math.ceil(min)
    max = Math.floor(max)
    // random number is randomized
    const randomNumber = Math.floor(Math.random() * (max - min)) + min
    // if randomNumber is the same as excluded number (either user input or previous guess)
    if (randomNumber === exclude) {
        // rerun function
        return generateRandomNumber(min, max, exclude)
    } else {
        // return the randomized number
        return randomNumber
    }
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomNumber(1, 99, props.userNumber))
    const [rounds, setRounds] = useState(0)

    // create variables with useRef hook to modify outside of dataflow, default to highest and lowest possible guesses
    const currentMax = useRef(99)
    const currentMin = useRef(1)

    // destructure userNumber and handleGameOver received from App.js through props for useEffect
    const { userNumber, handleGameOver } = props

    // useEffect hook runs side-effects (calculations that don't target output value) separately from rendering
    useEffect(() => {
        if (currentGuess === userNumber) {
            handleGameOver(rounds)
        }
    }, [currentGuess, userNumber, handleGameOver])

    const handleNextGuess = direction => {
        // if direction selected is lower but user number is higher or vice versa
        if ((direction === 'lower' && currentGuess < props.userNumber) || (direction === 'higher' && currentGuess > props.userNumber)) {
            // pop-up alert warning about lying
            Alert.alert(`Are You Lying?`, `Lying is for Fools`, [{text: 'Sorry!', style: 'cancel'}])
            return
        }
        if (direction === 'lower') {
            // if direction is lower currentMax variable is set equal currentGuess in state
            currentMax.current = currentGuess
        } else {
            // if direction is higher currentMin variable is set equal to currentGuess in state
            currentMin.current = currentGuess
        }
        // generates new random number with currentMin, max, and guess
        const nextGuess = generateRandomNumber(currentMin.current, currentMax.current, currentGuess)
        // sets currentGuess state to nextGuess
        setCurrentGuess(nextGuess)
        // adds 1 to rounds
        setRounds(currentRounds => currentRounds + 1)
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