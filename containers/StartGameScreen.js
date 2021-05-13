import React, {useState} from 'react'
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const handleNumberInput = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const handleResetInput = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const handleConfirmInput = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number', 'Number must be between 1 and 99', [{text: 'Okay', style: 'cancel', onPress: handleResetInput}])
            return
        }
        setConfirmed(true)
        setEnteredValue('')
        setSelectedNumber(chosenNumber)
    }

    let confirmedOutput

    if (confirmed) {
        confirmedOutput = 
            <Card style={styles.outputContainer}>
                <Text>Your Number Is:</Text>
                <View>
                    <Text>{selectedNumber}</Text>
                </View>
            </Card>
    }

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <View style={styles.startScreen}>
                <Text style={styles.title}>Start a New Game</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input style={styles.input} blurOnSubmit keyboardType="number-pad" maxLength={2} onChangeText={handleNumberInput} value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Reset" onPress={handleResetInput} color={Colors.secondary} /></View>
                        <View style={styles.button}><Button title="Confirm" onPress={handleConfirmInput} color={Colors.primary} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
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
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    outputContainer: {
        marginTop: 20
    }
})

export default StartGameScreen