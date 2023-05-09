import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import stringConstants, { GameScreens, css } from "../constants/constants";
import { GameScreenStateSetter } from "../../App";

const playButtonStyles = () => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: css.playButtonBackgroundColor,
      border: "10 solid red",
    },
  });
  return style.default;
};

const textStyles = () => {
  const style = StyleSheet.create({
    default: {
      color: css.playButtonTextColor,
    },
  });
  return style.default;
};

type PlayButtonProps = {
  buttonLabel: stringConstants;
  doOnPress: any;
  gameScreen: GameScreens;
};

const PlayButton: FC<PlayButtonProps> = (props) => {
  const { buttonLabel, doOnPress, gameScreen } = props;
  return (
    <View style={playButtonStyles()}>
      <Text
        style={textStyles()}
        onPress={() => {
          doOnPress(gameScreen);
        }}
      >
        {buttonLabel}
      </Text>
    </View>
  );
};

export default PlayButton;
