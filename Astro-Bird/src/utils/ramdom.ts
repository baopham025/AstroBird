import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

//generate a random integer between (min) and (max) value
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPipeSizePosPair = (addToPosX = 0) => {
  let yPosTop, yPosBottom;
  do {
    yPosTop = -getRandom(220, windowHeight / -2); // Adjusted range for top obstacle
    yPosBottom = getRandom(windowHeight / 2, windowHeight - 100); // Random position for the bottom obstacle
  } while (yPosBottom - yPosTop < 10); // Minimum distance between obstacles

  const pipeTop = {
    pos: { x: windowWidth + addToPosX, y: yPosTop },
    size: { height: 85, width: 85 }, //top obstacles size
  };

  const pipeBottom = {
    pos: { x: windowWidth + addToPosX, y: yPosBottom },
    size: { height: 85, width: 85 }, //bottom obstacles size
  };

  return { pipeTop, pipeBottom };
};

