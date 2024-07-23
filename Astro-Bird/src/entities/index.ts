import { Dimensions } from 'react-native'
import Matter from 'matter-js'
import Bird from '../components/Bird'
import Floor from '../components/Floor'
import Obstacle from '../components/Obstacle'
import { getPipeSizePosPair } from '../utils/ramdom'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const BOTTOM = 51

export default () => {
  let engine = Matter.Engine.create({
    enableSleeping: false
  })

  let world = engine.world

  engine.gravity.y = 0.55

  //generate the positions and sizes for three pair of obstacles 
  const pipeSizePosA = getPipeSizePosPair()
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 1.5); //generated with an offset of 1.5 times the screen width 
  const pipeSizePosC = getPipeSizePosPair(windowWidth * 4.0); //generated with an offset of 4.0 times the screen width 

  return {
    physics: { engine, world },

    //crate bird entity 
    Bird: Bird(world, 'green', { x: 110, y: 400 }, { height: 42, width: 42 }),//change bird size
   
    //crate obstacles(1,2,3 for both top&bottom) entity 
    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      'green',
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
      true
    ),

    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      'green',
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
      false
    ),

    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      'green',
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
      true
    ),

    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      'green',
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
      false
    ),

    ObstacleTop3: Obstacle( 
      world,
      'ObstacleTop3',
      'green',
      pipeSizePosC.pipeTop.pos,
      pipeSizePosC.pipeTop.size,
      true
    ),

    ObstacleBottom3: Obstacle( 
      world,
      'ObstacleBottom3',
      'green',
      pipeSizePosC.pipeBottom.pos,
      pipeSizePosC.pipeBottom.size,
      false
    ),
    
    //crate floor entity 
    Floor: Floor(
      world,
      '#E5B76E',
      { x: windowWidth / 2, y: windowHeight - 17 },
      { height: BOTTOM + 20, width: windowWidth }
    )
  }
}
