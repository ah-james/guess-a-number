import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const StartGameScreen = props => {
    // set enteredValue as empty, confirmed to false, selectedNumber to empty
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }

        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    const handleNumberInput = inputText => {
        // if user input includes text outside of numbers, delete it with replace method
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const handleResetInput = () => {
        // when reset input is called reset enteredValue and comfirmed to original states, empty and false
        setEnteredValue('')
        setConfirmed(false)
    }

    const handleConfirmInput = () => {
        // parseInt to change enteredValue string to number
        const chosenNumber = parseInt(enteredValue)
        // if number is NaN, < 0, or < 99
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            // give an alert to choose a different number, call handleResetInput
            Alert.alert('Invalid Number', 'Number must be between 1 and 99', [{text: 'Okay', style: 'cancel', onPress: handleResetInput}])
            return
        }
        // set confirmed to true to render user's selected number on screen
        setConfirmed(true)
        // reset enteredValue to remove text from textfield
        setEnteredValue('')
        setSelectedNumber(chosenNumber)
        // dismiss keyboard from screen
        Keyboard.dismiss()
    }

    let confirmedOutput

    if (confirmed) {
        confirmedOutput = 
            <Card style={styles.outputContainer}>
                <TitleText>Your Number Is:</TitleText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.handleStartGame(selectedNumber)} >Start Game</MainButton>
            </Card>
    }

    return(
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30} >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                    <View style={styles.startScreen}>
                        <TitleText style={styles.title}>Start a New Game</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input style={styles.input} blurOnSubmit keyboardType="number-pad" maxLength={2} onChangeText={handleNumberInput} value={enteredValue} />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}><Button title="Reset" onPress={handleResetInput} color={Colors.secondary} /></View>
                                <View style={{width: buttonWidth}}><Button title="Confirm" onPress={handleConfirmInput} color={Colors.primary} /></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    startScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    // button: {
    //     width: 100,
    //     // instead of hardcoding, use Dimensions API from react-native to get full width of entire device ('window') and divide width for 2 buttons
    //     width: Dimensions.get('window').width / 4
    // },
    input: {
        width: 50,
        textAlign: 'center',
    },
    outputContainer: {
        marginTop: 20,
        alignItems: 'center',
    }
})

export default StartGameScreen