import { View, StyleSheet, Text, Pressable, Button } from "react-native";
import stringConstants, { GameScreens } from "../../constants/constants";
import { SvgUri } from "react-native-svg";
import * as React from "react";
import GameResponseArea from "../GameResponseArea";
import { useEffect, useState } from "react";
import AudioPlayer, { IAudioPlayer } from "../../services/AudioPlayer";
import { Accent, AccentList, GameScreenStateSetter } from "../../../App";
import uris from "../../temp/audioUris";
import getSubArrayWithRandomizedIndices from "../../util/getSubArrayWithRandomizedIndices";
import { Audio } from "expo-av";
import getCherryPickedSubArrayFromParent from "../../util/getCherryPickedSubArrayFromParent";
import PlayButton from "../PlayButton";
import { Sound } from "expo-av/build/Audio";
import Question from "../../model/Question";

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

type PlayScreenProps = {
  audioPlayer: IAudioPlayer;
  onReportUserResponse: React.Dispatch<React.SetStateAction<GameScreens>>;
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
  incorrectChoicesArr: any;
};

const GameScreen = (props: GameScreenProps) => {
  const {
    handleAnswerSelection,
    question,
    correctChoiceObj,
    incorrectChoicesArr,
  } = props;
  console.log(
    "proto screen confirming correct choice ",
    correctChoiceObj.fileID
  );
  console.log(
    "protoscreen confirming 3 wrong choices ",
    incorrectChoicesArr[2].fileID
  );
  // generate 3 (incorrect ) choices + 1 correct choice which is = question
  let questionsToBeShownThisRound: AccentList = [{} as Accent];
  let [userResponses, setUserResponses] = useState([]); // this will need to be updated
  let [userResponse, setUserResponse] = useState(0);
  let [isAudioPlaying, setIsAudioPlaying] = useState(false);
  let [soundHandle, setSoundHandle] = useState<Audio.Sound>();

  


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
    return function () {
      stopClip();
      //setSoundHandle({} as Audio.Sound);
    };
  }, []);

  const stopClipAndSetScreen = (response: QuestionStruct) => {
    stopClip();
    handleAnswerSelection(response);
  };




  return (
    <View style={playScreenStyles("grey")}>
      <Pressable
        onPress={() => {
          handleAnswerSelection(question as QuestionStruct);
        }}
      >
        <Text>{`Select ${question.value}`}</Text>
      </Pressable>

      <Pressable onPress={async () => await stopClip()}>
        <Text>Stop audio</Text>
      </Pressable>

      <View style={buttonContainerStyle()}>
        <Pressable style={buttonStyle("#36BAF3")}>
          <Text style={textContainerStyle()}>Button 1</Text>
        </Pressable>

        <Pressable style={buttonStyle("#e8bd12")}>
          <Text style={textContainerStyle()}>Button 2</Text>
        </Pressable>
      </View>

      <View style={buttonContainerStyle()}>
        <Pressable style={buttonStyle("#82DB5B")}>
          <Text style={textContainerStyle()}>Button 3</Text>
        </Pressable>

        <Pressable style={buttonStyle("#e8791e")}>
          <Text style={textContainerStyle()}>
            Button
            4adsfaffasdfasdfasdfasdfhajsdfhsdaklfhaslkdfjhasdlkfhjsadlfhlkasdjfhadsklfjasd
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GameScreen;

export { QuestionStruct };
