import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'
import { Ionicons } from '@expo/vector-icons'
import BodyText from '../components/BodyText'

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

const renderGuessList = (guess, roundNumber) => (
    <View key={guess} style={styles.listItem}>
        <BodyText>Round {roundNumber}: </BodyText>
        <BodyText>{guess}</BodyText>
    </View>
)

const GameScreen = props => {
    const firstGuess = generateRandomNumber(1, 99, props.userNumber)

    const [currentGuess, setCurrentGuess] = useState(firstGuess)
    const [pastGuesses, setPastGuesses] = useState([firstGuess])
    const [currentDeviceWidth, setCurrentDeviceWidth] = useState(Dimensions.get('window').width)
    const [currentDeviceHeight, setCurrentDeviceHeight] = useState(Dimensions.get('window').height)

    // create variables with useRef hook to modify outside of dataflow, default to highest and lowest possible guesses
    const currentMax = useRef(99)
    const currentMin = useRef(1)

    // destructure userNumber and handleGameOver received from App.js through props for useEffect
    const { userNumber, handleGameOver } = props

    // useEffect hook runs side-effects (calculations that don't target output value) separately from rendering
    useEffect(() => {
        if (currentGuess === userNumber) {
            handleGameOver(pastGuesses.length)
        }
    }, [currentGuess, userNumber, handleGameOver])

    useEffect(() => {
        const updateLayout = () => {
            setCurrentDeviceHeight(Dimensions.get('window').height)
            setCurrentDeviceWidth(Dimensions.get('window').width)
        }

        Dimensions.addEventListener('change', updateLayout)

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

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
            currentMin.current = currentGuess + 1
        }
        // generates new random number with currentMin, max, and guess
        const nextGuess = generateRandomNumber(currentMin.current, currentMax.current, currentGuess)
        // sets currentGuess state to nextGuess
        setCurrentGuess(nextGuess)
        // adds 1 to rounds
        // setRounds(currentRounds => currentRounds + 1)
        // set past guesses state by pushing most recent guess into array of past guesses, can't use currentGuess because React wouldn't have updated state and re-built component
        setPastGuesses(pastGuesses => [nextGuess, ...pastGuesses])
    }

    if (currentDeviceHeight < 500) {
        return(
            <View style={styles.screen}>
                <TitleText>Computer's Guess:</TitleText>
                <View style={styles.controls}>
                    <MainButton onPress={handleNextGuess.bind(this, 'lower')}><Ionicons name="md-remove" size={25} color="white" /></MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={handleNextGuess.bind(this, 'higher')}><Ionicons name="md-add" size={25} color="white" /></MainButton>
                </View>
                <View style={styles.listContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderGuessList(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            <TitleText>Computer's Guess:</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer} >
                <MainButton onPress={handleNextGuess.bind(this, 'lower')}><Ionicons name="md-remove" size={25} color="white" /></MainButton>
                <MainButton onPress={handleNextGuess.bind(this, 'higher')}><Ionicons name="md-add" size={25} color="white" /></MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderGuessList(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 300,
        maxWidth: '80%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 15,
        justifyContent: 'space-around'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    },
    list: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center',
    },
})

export default GameScreen