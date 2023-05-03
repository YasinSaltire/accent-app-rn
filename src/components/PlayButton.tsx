import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { css } from "../constants/constants";

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
  buttonLabel: string;
  onTouchHandler: () => void;
};

const PlayButton: FC<PlayButtonProps> = (props) => {
  const { buttonLabel, onTouchHandler } = props;
  return (
    <View style={playButtonStyles()}>
      <Text
        style={textStyles()}
        onPress={() => {
          onTouchHandler();
        }}
      >
        {buttonLabel}
      </Text>
    </View>
  );
};

export default PlayButton;
