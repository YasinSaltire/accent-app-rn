import { View, StyleSheet, Pressable, Text } from "react-native";
import stringConstants, { GameScreens } from "../../constants/constants";
import PlayButton from "../PlayButton";
import GameTitle from "../GameTitle";
import { GameScreenStateSetter } from "../../../App";
import generateRandomQuestionChoices from "../../util/generateRandomQuestionChoices";
import data from "../../../assets/audio/clip_db.json";

const homeScreenStyles = (color: string = "white") => {
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

const buttonColor = (color: string) => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: color,
      padding: 15,
      borderRadius: 8,
    },
  });
  return style.default;
};

const textStyles = () => {
  const style = StyleSheet.create({
    default: {
      color: "white",
      textAlign: "center",
      fontSize: 26,
    },
  });
  return style.default;
};

const buttonContainer = (color: string = "white") => {
  const style = StyleSheet.create({
    default: {
      height: "36%",
      justifyContent: "space-evenly",
    },
  });
  return style.default;
};

type HomeScreenProps = {
  doOnStartGameRound: any;
};

const HomeScreen = (props: HomeScreenProps) => {
  console.log("home");
  //console.log("data 1st entry " + data[1])
  //console.log("question choices " + generateRandomQuestionChoices(data, 10))

  const { doOnStartGameRound } = props;
  return (
    <View style={homeScreenStyles()}>
      <GameTitle title={stringConstants.gameTitle} />

      <View style={buttonContainer()}>
        <Pressable onPress={doOnStartGameRound} style={buttonColor("#82DB5B")}>
          <Text style={textStyles()}>PLAY</Text>
        </Pressable>
        <Pressable onPress={doOnStartGameRound} style={buttonColor("#36BAF3")}>
          <Text style={textStyles()}>ADD ACCENT</Text>
        </Pressable>
        <Pressable onPress={doOnStartGameRound} style={buttonColor("#e8bd12")}>
          <Text style={textStyles()}>SETTINGS</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
