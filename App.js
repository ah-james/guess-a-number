import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './containers/StartGameScreen'
import GameScreen from './containers/GameScreen'
import GameOverScreen from './containers/GameOverScreen'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

const fetchFonts = () => {
  // use method from expo-font to load new fonts
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    // fetchFonts returns promise, when promise resolves will call onFinish to setDataLoaded to true
    return <AppLoading startAsync={fetchFonts} onFinish={() => {setDataLoaded(true)}} onError={(error) => {console.log(error)}} />
  }

  const handleNewGame = () => {
    // when new game is called remove userNumber and reset guessRounds in state
    setGuessRounds(0)
    setUserNumber(null)
  }

  const handleGameOver = totalRounds => {
    // change GuessRounds from rounds in GameScreen state, when guessRounds is greater than 0 GameOverScreen will render
    setGuessRounds(totalRounds)
  }

  const handleStartGame = selectedNumber => {
    // when game is started set userNumber in state so GameScreen can render on page
    setUserNumber(selectedNumber)
  }

  // default to StartGameScreen container
  let content = <StartGameScreen handleStartGame={handleStartGame} />

  // if user starts game (userNumber is set in state)
  if (userNumber && guessRounds <= 0) {
    // render GameScreen instead of StartGameScreen
    content = <GameScreen userNumber={userNumber} handleGameOver={handleGameOver}/>
  // if guessRounds is higher than 0
  } else if (guessRounds > 0) {
    // render GameOverScreen
    content = <GameOverScreen totalRounds={guessRounds} userNumber={userNumber} handleNewGame={handleNewGame} />
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
