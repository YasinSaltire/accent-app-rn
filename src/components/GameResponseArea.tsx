import { View, StyleSheet, Text, Pressable } from "react-native";
import { GameScreens } from "../constants/constants";
import { SvgUri } from "react-native-svg";
import { Accent } from "../../App";

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
  onSetUserResponse: (id: number) => void;
  responseData: Accent;
};

const GameResponseArea = (props: GameResponseAreaProps) => {
  const { onSetUserResponse, responseData } = props;
  return (
    <Pressable>
      <CustomSvg />
      <Pressable
        onPress={() => {
          onSetUserResponse(responseData.id);
        }}
      >
        {/* on press update question answers, correct responses, what to do next in-app, etc. */}
        <Text>{responseData.displayString}</Text>
      </Pressable>
    </Pressable>
  );
};

export default GameResponseArea;
