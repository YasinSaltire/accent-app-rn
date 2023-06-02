import { View, StyleSheet, Pressable, Text, Button } from "react-native";

import stringConstants, { GameScreens } from "../../constants/constants";
import PlayButton from "../PlayButton";
import GameTitle from "../GameTitle";
import { GameScreenStateSetter } from "../../../App";
import generateRandomQuestionChoices from "../../util/generateRandomQuestionChoices";
import data from "../../../assets/audio/clip_db.json";
import * as WebBrowser from "expo-web-browser";
import { deleteData } from "../../util/AsyncStorage/storeChoice";
import * as Device from "expo-device";
import { useEffect, useState } from "react";

const homeScreenStyles = (deviceType: Device.DeviceType) => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: "black",
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    web: {
      backgroundColor: "black",
      height: "100%",
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return deviceType == Device.DeviceType.DESKTOP ? style.web : style.default;
};

const homeScreenWrapperStyles = (deviceType: Device.DeviceType) => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: "black",
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
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
  checkUpdates: any;
};



const HomeScreen = (props: HomeScreenProps) => {
  //console.log("data 1st entry " + data[1])
  //console.log("question choices " + generateRandomQuestionChoices(data, 10))
  const { doOnStartGameRound, checkUpdates } = props;
  //deleteData('First Score')

  const [deviceType, setDeviceType] = useState<Device.DeviceType>(
    Device.DeviceType.UNKNOWN
  );

  useEffect(() => {
    const getDeviceType = async () => {
      const type = await Device.getDeviceTypeAsync();
      setDeviceType(type);
    };
    getDeviceType();
  }, []);

  const handleButtonPress = async () => {
    const url: string = "https://saltire.com/speech/";
  };

  return (
    <View style={homeScreenWrapperStyles(deviceType)}>
      <View style={homeScreenStyles(deviceType)}>
        <View style={{ width: "60%" }}>
          <Text
            numberOfLines={3}
            style={{ textAlign: "center", fontSize: 50, color: "white" }}
          >
            THE ACCENT GAME!!
          </Text>
        </View>

        <View style={buttonContainer()}>
          <Pressable
            onPress={doOnStartGameRound}
            style={buttonColor("#82DB5B")}
          >
            <Text style={textStyles()}>PLAY</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              WebBrowser.openBrowserAsync("https://saltire.com/speech/")
            }
            style={buttonColor("#36BAF3")}
          >
            <Text style={textStyles()}>ADD ACCENT</Text>
          </Pressable>

          {deviceType != Device.DeviceType.DESKTOP && (
            <View>
              <Button title="Fetch update" onPress={checkUpdates} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
