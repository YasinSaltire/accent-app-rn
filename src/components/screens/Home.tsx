import { View, StyleSheet, Pressable, Text } from "react-native";
import GameTitle from "../GameTitle";
import PlayButton from "../PlayButton";
import stringConstants, { GameStates, css } from "../../constants/constants";

const homeScreenStyles = (color: string) => {
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

type HomeScreenProps = {
  onSetGameState: React.Dispatch<React.SetStateAction<GameStates>>;
};

const Home = (props: HomeScreenProps) => {
  const { onSetGameState } = props;

  return (
    <View style={homeScreenStyles(css.homeScreenBackgroundColor)}>
      <GameTitle title={stringConstants.gameTitle} />
      <PlayButton
        buttonLabel={stringConstants.startGame}
        onTouchHandler={() => {
          onSetGameState(GameStates.GAME_START);
        }}
      />
    </View>
  );
};

export default Home;
