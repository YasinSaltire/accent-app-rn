import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  ImageBackground,
  Image,
  LayoutChangeEvent,
  Dimensions,
} from "react-native";
import stringConstants, {
  GameScreens,
  storageKeyStrings,
} from "../../constants/constants";
import { SvgUri } from "react-native-svg";
import * as React from "react";
import GameResponseArea from "../GameResponseArea";
import { useEffect, useState, useLayoutEffect } from "react";
import AudioPlayer, { IAudioPlayer } from "../../services/AudioPlayer";
import { Accent, AccentList, GameScreenStateSetter } from "../../../App";
import uris from "../../temp/audioUris";
import getSubArrayWithRandomizedIndices from "../../util/getSubArrayWithRandomizedIndices";
import { Audio } from "expo-av";
import getCherryPickedSubArrayFromParent from "../../util/getCherryPickedSubArrayFromParent";
import PlayButton from "../PlayButton";
import { Sound } from "expo-av/build/Audio";
import Question from "../../model/Question";
import generateAccentString from "../../util/generateAccentString";
import generateAudioLink from "../../util/generateAudioLink";
import geoToMercator from "../../util/geoToMercator";
import { enableExpoCliLogging } from "expo/build/logs/Logs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { readData } from "../../util/AsyncStorage/storeChoice";
import { parse } from "@fortawesome/fontawesome-svg-core";
import * as Device from "expo-device";

const playScreenWrapperStyles = (deviceType: Device.DeviceType) => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: "black",
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    web: {
      backgroundColor: "black",
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return deviceType == Device.DeviceType.DESKTOP ? style.web : style.default;
};

const modalStyles = (deviceType: Device.DeviceType) => {
  const style = StyleSheet.create({
    default: {
      alignSelf: "center",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    web: {
      alignSelf: "center",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "35%",
    },
  });
  return deviceType != Device.DeviceType.DESKTOP? style.default: style.web;
};

const playScreenStyles = (deviceType: Device.DeviceType) => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: "black",
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    web: {
      backgroundColor: "black",
      height: "100%",
      width: "35%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
  });
  return deviceType == Device.DeviceType.DESKTOP ? style.web : style.default;
};

const buttonStyle = (color: string) => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: color,
      //padding: 15,
      borderRadius: 8,
      width: "45%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return style.default;
};

const buttonContainerStyle = () => {
  const style = StyleSheet.create({
    default: {
      flexDirection: "row",
      borderWidth: 0,
      marginBottom: 15,
      marginTop: 15,
      width: "90%",
      height: "12%",
      justifyContent: "space-between",
    },
  });
  return style.default;
};

const textContainerStyle = () => {
  const style = StyleSheet.create({
    default: {
      color: "white",
      textAlign: "center",
    },
  });
  return style.default;
};

type QuestionStruct = {
  id: number;
  value: string;
  answer: QuestionStruct;
};

type GameScreenProps = {
  handleAnswerSelection: any;
  correctChoiceObj: any;
  allIncorrect?: any;
  currentQuestionIndex?: any;
  correctlyAnswered?: number;
  correctButtonIndex: number;
  currentRoundScore: number;
};

const GameScreen = (props: GameScreenProps) => {
  const {
    handleAnswerSelection,
    allIncorrect,
    correctChoiceObj,
    currentQuestionIndex,
    correctButtonIndex,
    correctlyAnswered,
    currentRoundScore,
  } = props;
  console.log("button index", correctButtonIndex);
  /*
  console.log(currentQuestionIndex);
  
  console.log('correct id ', correctChoiceObj.fileID)

  /*
  console.log(`There are ${allIncorrect.length} incorrect choices`);
  console.log("correct id", correctChoiceObj.fileID);
  console.log("incorrect 1st id ", allIncorrect[0]);
  console.log("correctly answered ", correctlyAnswered);

  console.log("button index", correctButtonIndex);
  console.log("correct country", correctChoiceObj.country);
  */
  const indexOfFirstIncorrectChoice = currentQuestionIndex * 3;
  let buttonChoiceArray: any = [];
  buttonChoiceArray.push(allIncorrect[indexOfFirstIncorrectChoice]);
  buttonChoiceArray.push(allIncorrect[indexOfFirstIncorrectChoice + 1]);
  buttonChoiceArray.push(allIncorrect[indexOfFirstIncorrectChoice + 2]);
  buttonChoiceArray.splice(correctButtonIndex, 0, correctChoiceObj);

  const [sound, setSound] = useState<Audio.Sound | boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [disabledButtonsArray, setDisabledButtonsArray] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  let [numberOfQuestionsPlayed, setNumberOfQuestionsPlayed] = useState("");
  let [numberCorrectFirstChoice, setNumberCorrectFirstChoice] = useState("");
  let [correctPercentage, setCorrectPercentage] = useState(0);
  const [deviceType, setDeviceType] = useState<Device.DeviceType>(
    Device.DeviceType.UNKNOWN
  );

  //map variables
 
  let [projectionCoordinates, setProjectionCoordinates] = useState<number[][]>(
    Array(4).fill([0, 0])
  );

  //use effect handles all async func calls that may be needed to render screen but can't be called before render
  //current:
  //   handles fetching and displaying game stats
  //   calculating map coordinates (fetching devicetype for calculations is async)

  useEffect(() => {
    const getTotalQuestions = async (key: string) => {
      const data = await readData(key);
      setNumberOfQuestionsPlayed(data);
      return await readData(key);
    };
    const getTotalCorrectFirstAttempt = async (key: string) => {
      const data = await readData(key);
      setNumberCorrectFirstChoice(data);
      return await readData(key);
    };
    const calculateCorrectPercentage = async () => {
      const total = await getTotalQuestions(
        storageKeyStrings.questionsPlayedKey
      );
      const correct = await getTotalCorrectFirstAttempt(
        storageKeyStrings.firstChoiceCorrectScoreKey
      );
      const correctRate = Math.floor(
        (parseFloat(correct) / parseFloat(total)) * 100
      );
      setCorrectPercentage(correctRate);
    };
    const projectCoordinates = async () => {
      //calculates geotomercator coordinates
      const choicesCoordinatesArray = await Promise.all(
        buttonChoiceArray.map(async (accent: any) =>
          geoToMercator(accent.latitude, accent.longitude)
        )
      );
      //scales coordinates according to window size

      let windowWidth = Dimensions.get("window").width * 0.97;

      const deviceType = await Device.getDeviceTypeAsync()
      if (deviceType == Device.DeviceType.DESKTOP){
        windowWidth = windowWidth * .35
      }
      const ratio = windowWidth / 2917.0; //og map png is 2917 pixels wide. Ratio finds scale

      const scaledChoicesCoordinatesArray = choicesCoordinatesArray.map(
        (coordinate: any) => [coordinate[0] * ratio, coordinate[1] * ratio]
      );
      //set state so that projected and scaled coords render on screen
      setProjectionCoordinates(scaledChoicesCoordinatesArray);
    };

    const getDeviceType = async () => {
      const type = await Device.getDeviceTypeAsync();
      setDeviceType(type);
    };
    getDeviceType();

    //set map coordiantes
    projectCoordinates();

    //calc and set gamestats
    calculateCorrectPercentage();

    //get device type and set state
    getDeviceType();
  }, [correctChoiceObj]);

  const displayModalIfWrongChoiceSelected = (id: number) => {
    if (id !== correctChoiceObj.fileID) {
      setShowModal(true);
    }
  };

  const disableButton = (buttonIndex: number) => {
    if (buttonIndex !== correctButtonIndex) {
      let newDisabledButtonsArray: boolean[] = [...disabledButtonsArray];
      newDisabledButtonsArray[buttonIndex] = true;
      setDisabledButtonsArray(newDisabledButtonsArray);
    }
  };

  const handleAudioButtonPress = () => {
    if (isAudioPlaying) {
      handleStopSound();
    } else {
      handlePlaySound();
    }
  };

  useEffect(() => {
    // const audioUri = ...
    setDisabledButtonsArray([false, false, false, false]);
    const audioUri = generateAudioLink(correctChoiceObj.fileName);
    const loadSound = async () => {
      try {
        const sound = new Audio.Sound();
        await sound.loadAsync({
          uri: audioUri, // audioUri
        });
        setSound(sound);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.isPlaying) {
            setIsAudioPlaying(true);
          } else if (status.isLoaded && status.didJustFinish) {
            console.log("audio finished ,");

            setIsAudioPlaying(false);
          }
        });
        // let status = getIsAudioPlaying(sound);
        // console.log('audio status ', status)
      } catch (error) {
        console.error(error);
      }
    };
    console.log("about to load audio");
    loadSound();

    // clean up the audio when the component unmounts
    return () => {
      if (typeof sound !== "boolean") {
        sound.unloadAsync();
      }
    };
  }, [correctChoiceObj]);

  const handlePlaySound = async () => {
    handleStopSound();
    if (typeof sound !== "boolean") {
      try {
        await sound.playAsync();
        console.log("play sound using ", sound);
        setIsAudioPlaying(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleStopSound = async () => {
    if (typeof sound !== "boolean") {
      try {
        await sound.stopAsync();
        setIsAudioPlaying(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  /*
  console.log('window width: ', windowWidth)
  const choicesCoordinatesArray = buttonChoiceArray.map((accent: any) =>
    geoToMercator(accent.latitude, accent.longitude)
  );
  //console.log("width ", windowWidth);
  
  const projectedCoordinates = choicesCoordinatesArray.map(
    (coordinate: any) => [coordinate[0] * ratio, coordinate[1] * ratio]
  );
  console.log(projectedCoordinates);
*/

  return (
    <View nativeID = '5' style={playScreenWrapperStyles(deviceType)}>
      <View style={playScreenStyles(deviceType)}>
        <Modal transparent={true} visible={showModal}>
          <View
            style={modalStyles(deviceType)}
          >
            <View
              style={{
                width: "60%",
                height: "20%",
                backgroundColor: "black",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  alignSelf: "center",
                  marginBottom: "10%",
                  fontSize: 20,
                }}
              >
                {" "}
                Incorrect!{" "}
              </Text>

              <Pressable
                style={{
                  width: "50%",
                  height: "30%",
                  backgroundColor: "#e8791e",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: "white", alignSelf: "center" }}>
                  Try Again
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          onPress={
            isAudioPlaying ? () => handleStopSound() : () => handlePlaySound()
          }
        >
          <FontAwesomeIcon
            size={75}
            icon={isAudioPlaying ? faStop : faPlay}
            style={{ color: "#ffffff" }}
          />
        </Pressable>

        <View style={buttonContainerStyle()}>
          <Pressable
            style={
              disabledButtonsArray[0]
                ? buttonStyle("grey")
                : buttonStyle("#36BAF3")
            }
            onPress={() => {
              handleAnswerSelection(buttonChoiceArray[0].fileID);
              handleStopSound();
              displayModalIfWrongChoiceSelected(buttonChoiceArray[0].fileID);
              disableButton(0);
            }}
            disabled={disabledButtonsArray[0]}
          >
            <Text style={textContainerStyle()}>
              {generateAccentString(buttonChoiceArray[0])}
            </Text>
          </Pressable>

          <Pressable
            style={
              disabledButtonsArray[1]
                ? buttonStyle("grey")
                : buttonStyle("#e8bd12")
            }
            onPress={() => {
              handleAnswerSelection(buttonChoiceArray[1].fileID);
              handleStopSound();
              displayModalIfWrongChoiceSelected(buttonChoiceArray[1].fileID);
              disableButton(1);
            }}
          >
            <Text style={textContainerStyle()}>
              {generateAccentString(buttonChoiceArray[1])}
            </Text>
          </Pressable>
        </View>

        <View
        nativeID = 'map-wrapper'
          style={{
            position: 'relative',
            borderWidth: 0,
            width: "97%",
            aspectRatio: 1.81,
            justifyContent: "center",
            borderColor: "white",
          }}
        >
          <Image
            style={{ resizeMode: "contain", width: "100%", height: "100%"}}
            source={require("../../../assets/map.png")}
          />
          
          <Image
            nativeID="blue-pin"
            style={{
              resizeMode: 'contain',
              width: '17%',
              height: '17%',
              position: 'absolute',
              left: projectionCoordinates[0][0],
              bottom: projectionCoordinates[0][1],
              zIndex: 10
            }}
            source={require("../../../assets/blue_sliderDown.png")}
          />
          <Image
          nativeID="yellow-pin"
            style={{
              resizeMode: 'contain',
              width: '17%',
              height: '17%',
              position: "absolute",
              left: projectionCoordinates[1][0],
              bottom: projectionCoordinates[1][1],
              zIndex: 10
            }}
            source={require("../../../assets/yellow_sliderDown.png")}
          />
          <Image
          nativeID="green-pin"
            style={{
              resizeMode: 'contain',
              width: '17%',
              height: '17%',
              position: "absolute",
              left: projectionCoordinates[2][0],
              bottom: projectionCoordinates[2][1],
              zIndex: 10
            }}
            source={require("../../../assets/green_sliderDown.png")}
          />
          <Image
          nativeID="red-pin"
            style={{
              resizeMode: 'contain',
              width: '17%',
              height: '17%',
              position: "absolute",
              left: projectionCoordinates[3][0],
              bottom: projectionCoordinates[3][1],
              zIndex: 10
            }}
            source={require("../../../assets/red_sliderDown.png")}
          />
        </View>

        <View style={buttonContainerStyle()}>
          <Pressable
            style={
              disabledButtonsArray[2]
                ? buttonStyle("grey")
                : buttonStyle("#82DB5B")
            }
            onPress={() => {
              handleAnswerSelection(buttonChoiceArray[2].fileID);
              handleStopSound();
              displayModalIfWrongChoiceSelected(buttonChoiceArray[2].fileID);
              disableButton(2);
            }}
          >
            <Text style={textContainerStyle()}>
              {generateAccentString(buttonChoiceArray[2])}
            </Text>
          </Pressable>

          <Pressable
            style={
              disabledButtonsArray[3]
                ? buttonStyle("grey")
                : buttonStyle("#e8791e")
            }
            onPress={() => {
              handleAnswerSelection(buttonChoiceArray[3].fileID);
              handleStopSound();
              displayModalIfWrongChoiceSelected(buttonChoiceArray[3].fileID);
              disableButton(3);
            }}
          >
            <Text style={textContainerStyle()}>
              {generateAccentString(buttonChoiceArray[3])}
            </Text>
          </Pressable>
        </View>

        <Text style={{ color: "white" }}>
          {" "}
          Correctly Answered Questions on First Try:{" "}
          {currentQuestionIndex == 0
            ? "-"
            : currentRoundScore + "/" + currentQuestionIndex}
        </Text>
        <Text style={{ color: "white" }}>
          Total correct: {numberOfQuestionsPlayed}{" "}
        </Text>
        <Text style={{ color: "white" }}>
          Correct first attempts: {numberCorrectFirstChoice}{" "}
        </Text>

        <Text style={{ color: "white" }}>
          total correct rate: {correctPercentage ? correctPercentage : "-"}%{" "}
        </Text>
      </View>
    </View>
  );
};

export default GameScreen;

export { QuestionStruct };
