import { Image } from 'react-native'
import Matter from 'matter-js'
import { styles } from './styles'
import BIRD from '../../assets/images/bird.png'

const Bird = props => {
  const fixedImageSize = { width: 50, height: 50 }; // Fixed image size

  const xBody = props.body.position.x - fixedImageSize.width / 2;
  const yBody = props.body.position.y - fixedImageSize.height / 2;

  return (
    <Image
      source={BIRD}
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

export default (world, color, pos, size) => {
  const bodyWidth = size.width * 0.8; // Smaller hitbox width
  const bodyHeight = size.height * 0.9; // Smaller hitbox height

  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    bodyWidth,
    bodyHeight,
    { label: 'Bird' }
  );

  Matter.World.add(world, [initialBird]);

  return {
    body: initialBird,
    color,
    pos,
    renderer: <Bird />
  };
};
