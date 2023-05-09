import { View, StyleSheet, Text, Pressable } from "react-native";
import { GameScreens } from "../../constants/constants";
import { SvgUri } from "react-native-svg";
import * as React from "react";
import GameResponseArea from "../GameResponseArea";
import { useEffect, useState } from "react";
import AudioPlayer, { IAudioPlayer } from "../../services/AudioPlayer";
import { Accent, AccentList } from "../../../App";
import uris from "../../temp/audioUris";
import getSubArrayWithRandomizedIndices from "../../util/getSubArrayWithRandomizedIndices";
import { Audio } from "expo-av";
import getCherryPickedSubArrayFromParent from "../../util/getCherryPickedSubArrayFromParent";

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

const GamePlay = (props: PlayScreenProps) => {
  const questionsInRound = 5;
  let [questionsAnsweredThisRound, setQuestionsAnsweredThisRound] = useState(0);
  let [correctAnswersInRound, setCorrectAnswersInRound] = useState(0);

  let randomIndicesArray = getSubArrayWithRandomizedIndices(uris, 4);
  let randomClipsArray = getCherryPickedSubArrayFromParent(
    randomIndicesArray,
    uris
  ) as AccentList;
  // console.log(randomClipsArray);
  let questionsToBeShownThisRound: AccentList = [{} as Accent];
  let [userResponses, setUserResponses] = useState([]); // this will need to be updated
  let [userResponse, setUserResponse] = useState(0);
  let [isAudioPlaying, setIsAudioPlaying] = useState(false);
  let [soundHandle, setSoundHandle] = useState<Audio.Sound>();

  const handleAudioPress = () => {};

  const { onReportUserResponse } = props;

  async function playClip() {
    const sound = new Audio.Sound();
    await sound.loadAsync({
      uri: randomClipsArray[0].url,
    });
    console.log(randomClipsArray[0].url);
    await sound.playAsync();
    setSoundHandle(sound);
  }

  return (
    <View style={playScreenStyles("grey")}>
      <Text>Playscreen</Text>
      <View>
        <Text>Play Audio Clip</Text>
      </View>
      {randomClipsArray.map((accent) => (
        <GameResponseArea
          onSetUserResponse={() => {}}
          key={accent.id}
          responseData={accent}
        />
      ))}
      <Pressable
        style={answerButtonStyles()}
        onPress={() => {
          soundHandle?.stopAsync();
          onReportUserResponse(GameScreens.HOMESCREEN);
        }}
      >
        <Text>Back to Home</Text>
      </Pressable>
      <Pressable onPress={handleAudioPress}></Pressable>
    </View>
  );
};

export default GamePlay;
