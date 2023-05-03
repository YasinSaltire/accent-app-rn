import { View, StyleSheet, Text, Pressable } from "react-native";
import { GameStates } from "../constants/constants";
import { SvgUri } from "react-native-svg";

const CustomSvg = () => {
  return (
    <SvgUri
      width="90"
      height="90"
      style={{ marginTop: 0 }}
      uri="https://upload.wikimedia.org/wikipedia/commons/9/95/Regions_of_Oregon.svg"
    />
  );
};

type GameResponseAreaProps = {
  onSetUserResponse?: (id: number) => void;
  responseData: {};
};

const GameResponseArea = (props: GameResponseAreaProps) => {
  const { onSetUserResponse, responseData } = props;
  return (
    <Pressable>
      <CustomSvg />
      <Pressable>
        <Text>Answer 1</Text>
      </Pressable>
    </Pressable>
  );
};

export default GameResponseArea;
