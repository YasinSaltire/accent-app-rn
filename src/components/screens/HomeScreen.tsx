import { View, StyleSheet, Pressable, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Device from "expo-device";
import { useEffect, useState } from "react";
import * as Updates from "expo-updates";
import CustomModal from "../CustomModal";

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
  handleGoToStats: any;
};

const HomeScreen = (props: HomeScreenProps) => {
  const { doOnStartGameRound, handleGoToStats } = props;

  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  const [deviceType, setDeviceType] = useState<Device.DeviceType>(
    Device.DeviceType.UNKNOWN
  );

  const getUpdate = async () => {
    try {
      setUpdateAvailable(false);
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.warn(`Error checking latest Expo update: ${error}`);
    }
  };

  useEffect(() => {
    const getDeviceType = async () => {
      const type = await Device.getDeviceTypeAsync();
      setDeviceType(type);
    };

    const checkForUpdate = async () => {
      const type = await Device.getDeviceTypeAsync();
      try {
        if (
          type === Device.DeviceType.PHONE ||
          type === Device.DeviceType.TABLET
        ) {
          const update = await Updates.checkForUpdateAsync();

          if (update.isAvailable) {
            setUpdateAvailable(true);
          }
        }
      } catch (error) {
        console.warn(`Error fetching latest Expo update: ${error}`);
      }
    };

    getDeviceType();
    checkForUpdate();
  }, []);

  return (
    <View style={homeScreenWrapperStyles(deviceType)}>
      <View style={homeScreenStyles(deviceType)}>
        <CustomModal
          deviceType={deviceType}
          showModal={updateAvailable}
          modalBodyText={"New Update Available"}
          modalButtonText={"Update"}
          onModalButtonPress={getUpdate}
        />
        <View style={{ width: "60%" }}>
          <Text
            numberOfLines={3}
            style={{ textAlign: "center", fontSize: 50, color: "white" }}
          >
            THE ACCENT GAME
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
          <Pressable
            onPress={() => handleGoToStats()}
            style={buttonColor("#e8791e")}
          >
            <Text style={textStyles()}>STATS</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
