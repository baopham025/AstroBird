import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { styles } from './styles';
import LOGO from '../../../../assets/images/logo.png';
import PLAY from '../../../../assets/images/play.png';
import BACKGROUND from '../../../../assets/images/background2.png';

const Start = ({ handleOnStartGame }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <View style={styles.container}>
      <Image source={BACKGROUND} style={styles.background} />
      <Image source={LOGO} style={styles.logo} />
      <TouchableWithoutFeedback
        onPress={handleOnStartGame}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image
          source={PLAY}
          style={[
            styles.playButton,
            { opacity: isPressed ? 0.5 : 1 } //click effect
          ]}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export { Start };
