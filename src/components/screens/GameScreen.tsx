import { View, StyleSheet, Text, Pressable, Modal } from "react-native";
import stringConstants, { GameScreens } from "../../constants/constants";
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

const playScreenStyles = (color: string) => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: color,
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return style.default;
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
      margin: 50, //adjust margin when map is added
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
};

const GameScreen = (props: GameScreenProps) => {
  const {
    handleAnswerSelection,
    allIncorrect,
    correctChoiceObj,
    currentQuestionIndex,
    correctButtonIndex,
    correctlyAnswered,
  } = props;
  console.log(currentQuestionIndex);
  console.log(`There are ${allIncorrect.length} incorrect choices`);
  console.log("correct id", correctChoiceObj.fileID);
  console.log("incorrect 1st id ", allIncorrect[0]);
  console.log("correctly answered ", correctlyAnswered);
  
 

  console.log("button index", correctButtonIndex);
  console.log("correct country", correctChoiceObj.country);
  const indexOfFirstIncorrectChoice = currentQuestionIndex * 3;
  let buttonChoiceArray: any = [];
  buttonChoiceArray.push(allIncorrect[indexOfFirstIncorrectChoice]);
  buttonChoiceArray.push(allIncorrect[indexOfFirstIncorrectChoice + 1]);
  buttonChoiceArray.push(allIncorrect[indexOfFirstIncorrectChoice + 2]);
  buttonChoiceArray.splice(correctButtonIndex, 0, correctChoiceObj);

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [disabledButtonsArray, setDisabledButtonsArray] = useState<boolean[]>([false,false,false,false])

  const displayModalIfWrongChoiceSelected = (id: number) =>{
    if(id !== correctChoiceObj.fileID){
      setShowModal(true)
    }
  }

  const disableButton = (buttonIndex: number) =>{
    if (buttonIndex !== correctButtonIndex){
      let newDisabledButtonsArray: boolean[] = [...disabledButtonsArray]
      newDisabledButtonsArray[buttonIndex] = true
      setDisabledButtonsArray(newDisabledButtonsArray)
    }
  }

  useEffect(() => {
    // const audioUri = ...
    setDisabledButtonsArray([false,false,false,false])
    const audioUri = generateAudioLink(correctChoiceObj.fileName)
    const loadSound = async () => {
      try {
        const sound = new Audio.Sound();
        await sound.loadAsync({
        uri: audioUri, // audioUri
      });
        sound.playAsync();
        setSound(sound);
      } catch (error) {
        console.error(error);
      }
    };

    loadSound();

    // clean up the audio when the component unmounts
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [correctChoiceObj]);

  const handlePlaySound = async () => {
    console.log("play sound using ", sound);
    if (sound) {
      try {
        await sound.playAsync();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleStopSound = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={playScreenStyles("grey")}>

      <Modal transparent = {true} visible = {showModal}>
        <Pressable onPress = {() => setShowModal(false)}>
          <Text>
            Try Again
          </Text>
        </Pressable>
      </Modal>

      <Pressable onPress={() => handlePlaySound()}>
        <Text>Play audio</Text>
      </Pressable>

      <Pressable onPress={() => handleStopSound()}>
        <Text>Stop audio</Text>
      </Pressable>

      <View style={buttonContainerStyle()}>
        <Pressable
          style={disabledButtonsArray[0]? buttonStyle("grey"): buttonStyle("#36BAF3")}
          onPress={() => {
            handleAnswerSelection(buttonChoiceArray[0].fileID);
            handleStopSound()
            displayModalIfWrongChoiceSelected(buttonChoiceArray[0].fileID);
            disableButton(0)
          }}
          disabled = {disabledButtonsArray[0]}
        >
          <Text style={textContainerStyle()}>
            {generateAccentString(buttonChoiceArray[0])}
          </Text>
        </Pressable>

        <Pressable
          style={disabledButtonsArray[1]? buttonStyle("grey"): buttonStyle("#e8bd12")}
          onPress={() => {
            handleAnswerSelection(buttonChoiceArray[1].fileID);
            handleStopSound()
            displayModalIfWrongChoiceSelected(buttonChoiceArray[1].fileID);
            disableButton(1)
          }}
        >
          <Text style={textContainerStyle()}>
            {generateAccentString(buttonChoiceArray[1])}
          </Text>
        </Pressable>
      </View>

      <View style={buttonContainerStyle()}>
        <Pressable
          style={disabledButtonsArray[2]? buttonStyle("grey"): buttonStyle("#82DB5B")}
          onPress={() => {
            handleAnswerSelection(buttonChoiceArray[2].fileID);
            handleStopSound()
            displayModalIfWrongChoiceSelected(buttonChoiceArray[2].fileID);
            disableButton(2)
          }}
        >
          <Text style={textContainerStyle()}>
            {generateAccentString(buttonChoiceArray[2])}
          </Text>
        </Pressable>

        <Pressable
          style={disabledButtonsArray[3]? buttonStyle("grey"): buttonStyle("#e8791e")}
          onPress={() => {
            handleAnswerSelection(buttonChoiceArray[3].fileID);
            handleStopSound()
            displayModalIfWrongChoiceSelected(buttonChoiceArray[3].fileID);
            disableButton(3)
          }}
        >
          <Text style={textContainerStyle()}>
            {generateAccentString(buttonChoiceArray[3])}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GameScreen;

export { QuestionStruct };
