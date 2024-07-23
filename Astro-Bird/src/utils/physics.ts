import { Dimensions } from 'react-native'
import Matter from 'matter-js'
import { getPipeSizePosPair } from './ramdom'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export const Physics = (startTime) => (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine

  //bird speed
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -4
      })
    })

    //this checks if any of the top obstacles have moved off the left side of the screen. 
    //If so, it repositions both the top and bottom obstacles of that pair to a new position on the right side of the screen. 
  for (let index = 1; index <= 3; index++) {
    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
      const addToPosX = index === 1 ? 0 : index === 2 ? windowWidth * 1.5 : windowWidth * 4.0;
      const pipeSizePos = getPipeSizePosPair(addToPosX);

      Matter.Body.setPosition(
        entities[`ObstacleTop${index}`].body,
        pipeSizePos.pipeTop.pos
      )
      Matter.Body.setPosition(
        entities[`ObstacleBottom${index}`].body,
        pipeSizePos.pipeBottom.pos
      )
    }
   //move the top and bottom obstacles to the left(looks like scroll)
    Matter.Body.translate(entities[`ObstacleTop${index}`].body, { x: -2.7, y: 0 })
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
      x: -2.7,//scroll speed
      y: 0
    })
  }
 //update Matter.js physics engine by advancing it by a certain amount of time
  Matter.Engine.update(engine, time.delta)

  //set up event listener in the Matter.js physics engine that triggers when a collision starts
  Matter.Events.on(engine, 'collisionStart', () => {
    dispatch({ type: 'game_over' })
  })
  
  // score on time(1sec=1m)
  if (startTime) {
    const elapsedTime = Date.now() - startTime;
    const newScore = Math.floor(elapsedTime / 1000);
    dispatch({ type: 'update_score', score: newScore });
  }

  return entities
}
