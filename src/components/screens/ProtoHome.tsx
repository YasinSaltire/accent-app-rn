import { View, StyleSheet, Pressable, Text } from "react-native";
import stringConstants, { GameScreens } from "../../constants/constants";
import PlayButton from "../PlayButton";
import GameTitle from "../GameTitle";
import { GameScreenStateSetter } from "../../../App";

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

type ProtoHomeProps = {
  doOnStartGameRound: any;
};

const ProtoHome = (props: ProtoHomeProps) => {
  console.log("home");
  const { doOnStartGameRound } = props;
  return (
    <View style={homeScreenStyles()}>
      <GameTitle title={stringConstants.gameTitle} />
      <PlayButton
        gameScreen={GameScreens.PROTOGAME}
        buttonLabel={stringConstants.startGame}
        doOnPress={doOnStartGameRound}
      />
    </View>
  );
};

export default ProtoHome;
