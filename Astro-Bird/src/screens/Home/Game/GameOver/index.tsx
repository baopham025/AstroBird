import { useEffect } from 'react'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import { styles } from './styles'
import GAME_OVER from '../../../../assets/images/game-over.png'

const GameOver = ({ handlebackToStart }) => {
  useEffect(() => {
    setTimeout(() => {
      handlebackToStart()
    }, 2500) // takes 2.5sec to restart after died
  }, [])

  return (
    <View style={styles.container}>
      <Image source={GAME_OVER} style={styles.logo} />
    </View>
  )
}

export { GameOver }
