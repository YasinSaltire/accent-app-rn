import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const gameTitleStyles = () => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: "black",
    },
  });
  return style.default;
};

const titleTextStyles = () => {
  const style = StyleSheet.create({
    default: {
      color: "white",
    },
  });
  return style.default;
};

type GameTitleProps = {
  title: string;
};

const GameTitle: FC<GameTitleProps> = (props) => {
  const { title } = props;
  return (
    <View style={gameTitleStyles()}>
      <Text style={titleTextStyles()}>{title}</Text>
    </View>
  );
};

export default GameTitle;
