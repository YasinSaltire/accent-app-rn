import { View, StyleSheet, Text, Pressable, Button } from "react-native";
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
  question: QuestionStruct;
  correctChoiceObj: any;
  allIncorrect?: any;
  currentQuestionIndex?: any;
  correctlyAnswered?: number;
  correctButtonIndex: number;
};

const GameScreen = (props: GameScreenProps) => {
  const {
    handleAnswerSelection,
    question,
    allIncorrect,
    correctChoiceObj,
    currentQuestionIndex,
    correctButtonIndex,
    correctlyAnswered
  } = props;
  console.log(currentQuestionIndex);
  console.log(`There are ${allIncorrect.length} incorrect choices`);
  console.log("correct id", correctChoiceObj.fileID);
  console.log("incorrect 1st id ", allIncorrect[0]);
  console.log('correctly answered ', correctlyAnswered)
  /* 
  console.log(
    "proto screen confirming correct choice ",
    correctChoiceObj.fileID
    );
    console.log(
      "protoscreen confirming 3 wrong choices ",
      incorrectChoicesArr[2].fileID
      );
      */
  // generate 3 (incorrect ) choices + 1 correct choice which is = question
  let questionsToBeShownThisRound: AccentList = [{} as Accent];
  let [userResponses, setUserResponses] = useState([]); // this will need to be updated
  let [userResponse, setUserResponse] = useState(0);
  let [isAudioPlaying, setIsAudioPlaying] = useState(false);
  let [soundHandle, setSoundHandle] = useState<Audio.Sound>();

  console.log("button index", correctButtonIndex);
  console.log("correct country", correctChoiceObj.country);
  const indexOfFirstIncorrectChoice = currentQuestionIndex * 3;
  let buttonChoiceArray: any = [];
  buttonChoiceArray.push(allIncorrect[indexOfFirstIncorrectChoice]);
  buttonChoiceArray.push(allIncorrect[indexOfFirstIncorrectChoice + 1]);
  buttonChoiceArray.push(allIncorrect[indexOfFirstIncorrectChoice + 2]);
  buttonChoiceArray.splice(correctButtonIndex, 0, correctChoiceObj);
  /*
  var correctButtonIndex: number = Math.floor(Math.random() * 4);
  var arrayOfChoicesInOrderOfButtonPopulation: any = [...incorrectChoicesArr];
  arrayOfChoicesInOrderOfButtonPopulation.splice(correctButtonIndex,0,correctChoiceObj)
 

  console.log(arrayOfChoicesInOrderOfButtonPopulation.length)
  */
      
  
  const handleAudioPress = () => {};

  async function playClip() {
    const sound = new Audio.Sound();
    await sound.loadAsync({
      uri: "https://saltire.com/speech/server/upload/Us_California.mp3",
    });
    await sound.playAsync();
    setSoundHandle(sound);
  }

  async function stopClip() {
    await soundHandle?.stopAsync();
    setSoundHandle({} as Audio.Sound);
  }

  useEffect(() => {
    playClip();
    console.log("play clip");
    return function () {
      stopClip();
      //setSoundHandle({} as Audio.Sound);
    };
  }, [soundHandle]);

  const stopClipAndSetScreen = (response: QuestionStruct) => {
    stopClip();
    handleAnswerSelection(response);
  };

  function someFunc(param: any) {
    return () => {};
  }
  

  return (
    
     <View style={playScreenStyles("grey")}>
      <Pressable>
        <Text>{`Select ${
          question && question.value ? question.value : "some text"
        }`}</Text>
      </Pressable>

      <Pressable onPress={async () => await stopClip()}>
        <Text>Stop audio</Text>
      </Pressable>
    
      <View style={buttonContainerStyle()}>
        <Pressable
          style={buttonStyle("#36BAF3")}
          onPress={() => {
            handleAnswerSelection(buttonChoiceArray[0].fileID);
            stopClip();
          }}
        >
          <Text style={textContainerStyle()}>
            {generateAccentString(buttonChoiceArray[0])}
          </Text>
        </Pressable>

        <Pressable
          style={buttonStyle("#e8bd12")}
          onPress={() => handleAnswerSelection(buttonChoiceArray[1].fileID)}
        >
          <Text style={textContainerStyle()}>
            {generateAccentString(buttonChoiceArray[1])}
          </Text>
        </Pressable>
      </View>

      <View style={buttonContainerStyle()}>
        <Pressable
          style={buttonStyle("#82DB5B")}
          onPress={() => handleAnswerSelection(buttonChoiceArray[2].fileID)}
        >
          <Text style={textContainerStyle()}>
            {generateAccentString(buttonChoiceArray[2])}
          </Text>
        </Pressable>

        <Pressable
          style={buttonStyle("#e8791e")}
          onPress={() => handleAnswerSelection(buttonChoiceArray[3].fileID)}
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
