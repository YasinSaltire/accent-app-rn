import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import STRING_CONSTANTS, { GameScreens, css } from "../constants/constants";

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
  buttonLabel: STRING_CONSTANTS;
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
