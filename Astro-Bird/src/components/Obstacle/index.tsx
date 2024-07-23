import { Image } from 'react-native';
import Matter from 'matter-js';
import { styles } from './styles';
import PIPE_GREEN from '../../assets/images/pipe-green.png';
import PIPE_GREEN_INVERTED from '../../assets/images/pipe-green-inverted.png';

const Obstacle = props => {
  const fixedImageSize = { width: 80, height: 80 }; // Fixed image size

  const xBody = props.body.position.x - fixedImageSize.width / 2;
  const yBody = props.body.position.y - fixedImageSize.height / 2;

  return (
    <Image
      source={!props.isTop ? PIPE_GREEN : PIPE_GREEN_INVERTED}
      style={{
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: fixedImageSize.width,
        height: fixedImageSize.height,
        resizeMode: 'contain',
      }}
    />
  );
};

export default (world, label, color, pos, size, isTop = false) => {
  const bodyWidth = size.width * 0.4; // Smaller hitbox width
  const bodyHeight = size.height * 0.4; // Smaller hitbox height

  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    bodyWidth,
    bodyHeight,
    { label, isStatic: true }
  );

  Matter.World.add(world, [initialObstacle]);

  return {
    body: initialObstacle,
    color,
    pos,
    isTop,
    renderer: <Obstacle />
  };
};
