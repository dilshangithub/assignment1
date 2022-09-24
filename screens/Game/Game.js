import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  BackHandler,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
} from '../../components/game/Constants';
import Car from '../../components/game/car';
import Box from '../../components/game/box';
import Road from '../../components/game/road';
import images from '../../components/images';
import getRandomDecimal from '../../components/game/getRandomDecimal';
import {car, floor, road} from '../../components/game/Objects';
import soundEffectsUtil from '../../utils/soundEffectsUtil';
import icons from '../../components/icons';
import {FONTS} from '../../components/theme';
import SuccessButton from '../../components/buttons/successbutton';
import WarningButton from '../../components/buttons/warningbutton';
import firebaseAuthUtil from '../../utils/firebaseAuthUtil';

setUpdateIntervalForType(SensorTypes.accelerometer, 15);

export default class Game extends Component {
  state = {
    x: 0, // initial x position of the player's car
    y: DEVICE_HEIGHT - 200, // initial y position of the player's car
    isGameSetup: false, // if the world has been setup
    isGamePaused: false, // if the game is currently paused
    score: 0, // the current player score
    isVisiblePopup: false,
    message: '',
    topScore: 0,
    gameProfile: 0.5,
  };

  constructor(props) {
    super(props);
    this.opposing_cars = [];

    const {engine, world} = this.addObjectsToWorld(car);
    this.entities = this.getEntities(engine, world, car, road);

    AsyncStorage.getItem('game_profile').then(gProfile => {
      this.setState({
        gameProfile: gProfile,
      });
    });

    this.physics = (entities, {time}) => {
      let engine = entities['physics'].engine;
      engine.world.gravity.y = this.state.gameProfile;
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
    //Fetch top score
    this.fetchTopScore();
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

        // detecting if car touching road bounds
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
  // componentWillUnmount
  componentWillUnmount() {
    if (this.accelerometer) {
      // this.accelerometer.closed();
    }
  }

  // add objects to world
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

  // getEntities()
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
        image: images.taxi,
        renderer: Car,
      },

      gameFloor: {
        body: floor,
        size: [DEVICE_WIDTH, 10],
        color: '#414448',
        renderer: Box,
      },
    };

    // generating entities for opposing cars
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

  // setupCollisionHandler()
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
        this.gameOver('You bumped to another vehicle!');
      }
    });
  };

  //Game over
  gameOver = msg => {
    soundEffectsUtil.crashedSound();

    if (this.state.topScore < this.state.score) {
      this.saveTopScore();
      console.log('saved top score');
    }

    this.state.message = msg;
    this.state.isVisiblePopup = true;
    this.opposing_cars.forEach(item => {
      Matter.Body.set(item, {
        isStatic: true,
      });
    });

    this.setState({
      isGamePaused: true,
    });
  };

  // resetGame()
  resetGame = () => {
    this.fetchTopScore();
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

  saveTopScore = () => {
    if (this.state.score > 0) {
      AsyncStorage.setItem('top_score', this.state.score.toString());
      //upload topsocre into cloud

      AsyncStorage.getItem('is_signin_user').then(userId => {
        if (userId != null) {
          firebaseAuthUtil.updateTopScore(userId, this.state.score);
        }
      });
      console.log('Saved top score');
    }
  };

  fetchTopScore = () => {
    AsyncStorage.getItem('top_score').then(tScore => {
      this.state.topScore = tScore;
      console.log('Fetched item');
    });
  };

  render() {
    const {isGameSetup, score, topScore} = this.state;

    if (isGameSetup) {
      return (
        <GameEngine
          style={styles.container}
          systems={[this.physics, this.roadTranslation]}
          entities={this.entities}>
          <View style={styles.infoWrapper}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{score}</Text>
            </View>
            <View style={styles.topScoreContainer}>
              <Text style={styles.topScoreText}>Top Score: {topScore}</Text>
            </View>
          </View>

          <Modal transparent={true} visible={this.state.isVisiblePopup}>
            <View
              style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  padding: 20,
                  borderRadius: 20,
                  height: '50%',
                  marginLeft: 30,
                  marginRight: 30,
                  borderColor: '#73737',
                  borderEndWidth: 2,
                  backgroundColor: '#f0f5f5',
                }}>
                <Text
                  style={{
                    ...FONTS.KidsEdition,
                    fontSize: 30,
                    textAlign: 'center',
                  }}>
                  Game Over!
                </Text>
                <Text
                  style={{
                    ...FONTS.DrStronge,
                    fontSize: 25,
                    marginTop: 20,
                    textAlign: 'center',
                    // color: 'red',
                  }}>
                  {this.state.message}
                </Text>
                <Text
                  style={{
                    ...FONTS.DrStronge,
                    fontSize: 25,
                    marginTop: 10,
                    textAlign: 'center',
                    color: 'red',
                  }}>
                  Your Score is
                </Text>
                <Text
                  style={{
                    // ...FONTS.KidsEdition,
                    fontSize: 30,
                    marginTop: 10,
                    textAlign: 'center',
                    color: 'red',
                    fontWeight: 'bold',
                  }}>
                  {this.state.score}
                </Text>

                <View style={{marginTop: 30}}>
                  <View style={{}}>
                    <SuccessButton
                      title="Play Again"
                      customClick={() => {
                        this.resetGame(),
                          soundEffectsUtil.touchableButtonSound(),
                          (this.state.isVisiblePopup = false);
                      }}
                    />
                  </View>

                  <View style={{marginTop: 10}}>
                    <WarningButton
                      title="Exit"
                      customClick={() => {
                        this.accelerometer.unsubscribe(),
                          soundEffectsUtil.touchableButtonSound(),
                          soundEffectsUtil.stopPlaying(),
                          BackHandler.exitApp(),
                          (this.state.isVisiblePopup = false);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
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
    backgroundColor: '#334d4d',
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
    right: 70,
  },
  scoreText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ffff00',
  },
  topScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ff00',
  },
  topScoreContainer: {
    position: 'absolute',
    top: 50,
    marginLeft: 30,
  },
});
