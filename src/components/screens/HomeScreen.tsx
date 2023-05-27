import { View, StyleSheet, Pressable, Text } from "react-native";
import stringConstants, { GameScreens } from "../../constants/constants";
import PlayButton from "../PlayButton";
import GameTitle from "../GameTitle";
import { GameScreenStateSetter } from "../../../App";
import generateRandomQuestionChoices from "../../util/generateRandomQuestionChoices";
import data from "../../../assets/audio/clip_db.json";
import * as WebBrowser from 'expo-web-browser'
import { deleteData } from "../../util/AsyncStorage/storeChoice";

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
  //console.log("data 1st entry " + data[1])
  //console.log("question choices " + generateRandomQuestionChoices(data, 10))
  const { doOnStartGameRound } = props;
  //deleteData('First Score')
  const handleButtonPress = async () =>{
    const url: string = 'https://saltire.com/speech/'

  }

  return (
    <View style={homeScreenStyles('black')}>
      <View style = {{width: '50%'}}>
        <Text numberOfLines = {3} style = {{textAlign: 'center', fontSize: 50, color: 'white'}}>THE ACCENT GAME</Text>
      </View>

      <View style={buttonContainer()}>
        <Pressable onPress={doOnStartGameRound} style={buttonColor("#82DB5B")}>
          <Text style={textStyles()}>PLAY</Text>
        </Pressable>
        <Pressable onPress={() => WebBrowser.openBrowserAsync('https://saltire.com/speech/')} style={buttonColor("#36BAF3")}>
          <Text style={textStyles()}>ADD ACCENT</Text>
        </Pressable>
        
        

      </View>
    </View>
  );
};

export default HomeScreen;
