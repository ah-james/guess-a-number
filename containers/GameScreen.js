import React from 'react'
import {View, Text, StyleSheet } from 'react-native'

generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const randomNumber = Math.floor(Math.random() * (max - min)) + min
    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return randomNumber
    }
}

const GameScreen = props => {

}

const styles = StyleSheet.create({

})

export default GameScreen