import { View, StyleSheet, Pressable, Text, Button } from "react-native";
import GameTitle from "../GameTitle";
import PlayButton from "../PlayButton";
import stringConstants, { GameScreens, css } from "../../constants/constants";

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
  onSetGameState: React.Dispatch<React.SetStateAction<GameScreens>>;
};

const Home = (props: HomeScreenProps) => {
  const { onSetGameState } = props;

  return (
    <View style={homeScreenStyles(css.homeScreenBackgroundColor)}>
      <GameTitle title={stringConstants.gameTitle} />
      <PlayButton
        buttonLabel={stringConstants.startGame}
        doOnPress={() => {
          onSetGameState(GameScreens.GAME_START);
        }}
        gameScreen = {GameScreens.GAME_START}
      />
    </View>
  );
};

export default Home;
