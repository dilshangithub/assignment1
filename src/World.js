import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, BackHandler} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import Matter from 'matter-js';
import {GameEngine} from 'react-native-game-engine';
import randomInt from 'random-int';
import sampleSize from 'lodash.samplesize';

import {
  CAR_WIDTH,
  CAR_HEIGHT,
  MID_POINT,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from './Constants';
import Car from '../components/car';
import Box from '../components/box';
import Road from '../components/road';
import images from '../components/images';
import getRandomDecimal from './helpers/getRandomDecimal';
import {car, floor, road} from './Objects';

setUpdateIntervalForType(SensorTypes.accelerometer, 10);

export default class World extends Component {
  state = {
    x: 0, // initial x position of the player's car
    y: DEVICE_HEIGHT - 200, // initial y position of the player's car
    isGameSetup: false, // if the world has been setup
    isGamePaused: false, // if the game is currently paused
    score: 0, // the current player score
  };

  constructor(props) {
    super(props);

    this.opposing_cars = [];

    const {engine, world} = this.addObjectsToWorld(car);
    this.entities = this.getEntities(engine, world, car, road);

    this.physics = (entities, {time}) => {
      let engine = entities['physics'].engine;
      engine.world.gravity.y = 0.5;
      Matter.Engine.update(engine, time.delta);
      return entities;
    };

    this.roadTranslation = (entities, {time}) => {
      if (!this.state.isGamePaused) {
        Matter.Body.setPosition(road, {
          x: road.position.x,
          y: road.position.y + 1,
        });

        if (road.position.y >= DEVICE_HEIGHT / 5) {
          Matter.Body.setPosition(road, {
            x: road.position.x,
            y: 0,
          });
        }
      }
      return entities;
    };

    this.setupCollisionHandler(engine);
  }

  componentDidMount() {
    // initialize car position
    Matter.Body.setPosition(car, {
      x: DEVICE_WIDTH / 2,
      y: DEVICE_HEIGHT - 200,
    });

    this.accelerometer = accelerometer.subscribe(({x}) => {
      if (!this.state.isGamePaused) {
        Matter.Body.setPosition(car, {
          x: this.state.x + x,
          y: DEVICE_HEIGHT - 200,
        });

        // next: add code for detecting if car goes out of bounds
        this.setState(
          state => ({
            x: x + state.x,
          }),
          () => {
            if (this.state.x < 0 || this.state.x > DEVICE_WIDTH) {
              Matter.Body.setPosition(car, {
                x: MID_POINT,
                y: DEVICE_HEIGHT - 30,
              });

              this.setState({
                x: MID_POINT,
              });

              if (this.state.score > 0) {
                this.gameOver('You hit the side of the road!');
              }
            }
          },
        );
      }
    });

    // start the game
    this.setState({
      isGameSetup: true,
    });
  }
  // last: add componentWillUnmount
  componentWillUnmount() {
    if (this.accelerometer) {
      // this.accelerometer.stop();
    }
  }

  // next: add objects to world
  addObjectsToWorld = car => {
    const engine = Matter.Engine.create({enableSleeping: false});
    const world = engine.world;

    let objects = [road, car, floor];

    for (let x = 0; x <= 4; x++) {
      const opposing_cars = Matter.Bodies.rectangle(
        randomInt(1, DEVICE_WIDTH - 10),
        0,
        CAR_WIDTH,
        CAR_HEIGHT,
        {
          frictionAir: getRandomDecimal(0.05, 0.25),
          label: 'opposing_car',
        },
      );

      this.opposing_cars.push(opposing_cars);
    }

    objects = objects.concat(this.opposing_cars);

    Matter.World.add(world, objects);

    return {
      engine,
      world,
    };
  };

  // next: add code for getEntities()
  getEntities = (engine, world, car, road) => {
    const entities = {
      physics: {
        engine,
        world,
      },

      theRoad: {
        body: road,
        size: [20, 100],
        renderer: Road,
      },

      playerCar: {
        body: car,
        size: [CAR_WIDTH, CAR_WIDTH],
        image: images.redCar,
        renderer: Car,
      },

      gameFloor: {
        body: floor,
        size: [DEVICE_WIDTH, 10],
        color: '#414448',
        renderer: Box,
      },
    };

    // next: add code for generating entities for opposing cars
    // get unique items from array
    const selected_car_images = sampleSize(images.OPPOSING_CAR_IMAGES, 5);

    for (let x = 0; x <= 4; x++) {
      Object.assign(entities, {
        ['opposing_car' + x]: {
          body: this.opposing_cars[x],
          size: [CAR_WIDTH, CAR_HEIGHT],
          image: selected_car_images[x],
          renderer: Car,
        },
      });
    }

    return entities;
  };

  // last: add setupCollisionHandler()
  setupCollisionHandler = engine => {
    Matter.Events.on(engine, 'collisionStart', event => {
      var pairs = event.pairs;

      var objA = pairs[0].bodyA.label;
      var objB = pairs[0].bodyB.label;

      if (objA === 'floor' && objB === 'opposing_car') {
        Matter.Body.setPosition(pairs[0].bodyB, {
          // set new initial position for the block
          x: randomInt(20, DEVICE_WIDTH - 20),
          y: 0,
        });

        this.setState(state => ({
          score: state.score + 1,
        }));
      }

      if (objA === 'car' && objB === 'opposing_car') {
        this.gameOver('You bumped to another car!');
      }
    });
  };

  //Game over
  gameOver = msg => {
    this.opposing_cars.forEach(item => {
      Matter.Body.set(item, {
        isStatic: true,
      });
    });

    this.setState({
      isGamePaused: true,
    });

    Alert.alert(
      `Game Over, ${msg}. Your Score is: ${this.state.score}`,
      'Want to play again?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            this.accelerometer.unsubscribe();
            BackHandler.exitApp();
            // Alert.alert(
            //   'Bye!',
            //   'Just relaunch the app if you want to play again.',
            // );
          },
        },
        {
          text: 'OK',
          onPress: () => {
            this.resetGame();
          },
        },
      ],
    );
  };

  // next: add resetGame()
  resetGame = () => {
    this.setState({
      isGamePaused: false,
    });

    this.opposing_cars.forEach(item => {
      // loop through all the blocks
      Matter.Body.set(item, {
        isStatic: false, // make the block susceptible to gravity again
      });
      Matter.Body.setPosition(item, {
        // set new position for the block
        x: randomInt(20, DEVICE_WIDTH - 20),
        y: 0,
      });
    });

    this.setState({
      score: 0, // reset the player score
    });
  };

  render() {
    const {isGameSetup, score} = this.state;

    if (isGameSetup) {
      return (
        <GameEngine
          style={styles.container}
          systems={[this.physics, this.roadTranslation]}
          entities={this.entities}>
          <View style={styles.infoWrapper}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Score: {score}</Text>
            </View>
          </View>
        </GameEngine>
      );
    }

    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Something isn't right..</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  centered: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },

  infoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreContainer: {
    position: 'absolute',
    top: 50,
    right: 50,
  },
  scoreText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
});
