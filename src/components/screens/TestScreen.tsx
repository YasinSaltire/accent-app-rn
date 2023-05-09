import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { GameStates } from "../../constants/constants";

const testScreenStyle = (color: string = "white") => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: color,
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return style;
};

type TestProps = {
  setScreenState: React.Dispatch<React.SetStateAction<GameStates>>;
};

const TestScreen = (props: TestProps) => {
  let { setScreenState } = props;
  let [x, setX] = useState("asdf");
  useEffect(() => {
    setX("setx");
    return () => {};
  }, []);
  return (
    <View style={testScreenStyle().default}>
      <Text>{x}</Text>
      <Pressable
        onPress={() => {
          console.log("hello");
          setScreenState(GameStates.HOMESCREEN);
        }}
      >
        <Text>button</Text>
      </Pressable>
    </View>
  );
};

export default TestScreen;
