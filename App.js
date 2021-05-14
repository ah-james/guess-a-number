import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './containers/StartGameScreen'
import GameScreen from './containers/GameScreen'
import GameOverScreen from './containers/GameOverScreen'

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)

  const handleGameOver = totalRounds => {
    setGuessRounds(totalRounds)
  }

  const handleStartGame = selectedNumber => {
    setUserNumber(selectedNumber)
    setGuessRounds(0)
  }

  let content = <StartGameScreen handleStartGame={handleStartGame} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userNumber={userNumber} handleGameOver={handleGameOver}/>
  } else if (guessRounds > 0) {
    content = <GameOverScreen />
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number"/>
      {content}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
