import { View, StyleSheet, Text, Pressable } from "react-native";
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

const answerButtonStyles = () => {
  const style = StyleSheet.create({
    default: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "tomato",
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

type ProtoGameScreenProps = {
  handleAnswerSelection: any;
  question: QuestionStruct;
};

const ProtoGameScreen = (props: ProtoGameScreenProps) => {
  const { handleAnswerSelection, question } = props;
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
      <Pressable></Pressable>
    </View>
  );
};

export default ProtoGameScreen;

export { QuestionStruct };
