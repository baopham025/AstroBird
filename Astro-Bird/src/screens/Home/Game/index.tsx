import { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import { Start } from './Start';
import { GameOver } from './GameOver';
import { Physics } from '../../../utils/physics';

import entities from '../../../entities';
import { styles } from './styles';

const Game = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const gameEngineRef = useRef();

  const handlebackToStart = () => {
    setIsRunning(false);
    setIsGameOver(false);
    setScore(0);
    setStartTime(null);
  };

  const handleOnStartGame = () => {
    setIsRunning(true);
    setIsGameOver(false);
    setScore(0);
    setStartTime(Date.now());
  };

  const handleOnGameOver = () => {
    setIsRunning(false);
    setIsGameOver(true);
  };

  const handleOnEvent = event => {
    switch (event.type) {
      case 'game_over':
        handleOnGameOver();
        break;
      case 'update_score':
        setScore(event.score);
        break;
    }
  };

  if (!isRunning && !isGameOver) {
    return <Start handleOnStartGame={handleOnStartGame} />;
  }
  if (!isRunning && isGameOver) {
    return <GameOver handlebackToStart={handlebackToStart} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.scoreText}>{score}</Text>
      <GameEngine
        systems={[Physics(startTime)]}
        ref={gameEngineRef}
        running={isRunning}
        entities={entities()}
        onEvent={handleOnEvent}
        style={styles.engineContainer}
      />
    </View>
  );
};

export { Game };
