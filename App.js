import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './containers/StartGameScreen'
import GameScreen from './containers/GameScreen'

export default function App() {
  const [userNumber, setUserNumber] = useState()

  const handleStartGame = selectedNumber => {
    setUserNumber(selectedNumber)
  }

  let content = <StartGameScreen handleStartGame={handleStartGame} />

  if (userNumber) {
    content = <GameScreen userNumber={userNumber}/>
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
