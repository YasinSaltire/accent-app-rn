// This file should be renamed to something more specific as the codebase grows.

enum stringConstants {
  startGame = "Play",
  gameTitle = "Game Title",
  settings = "Settings",
  GO_HOME = "Go Home",
}

const screenNames = {
  HOMESCREEN: "homescreen",
};

const screenIds = {
  HOMESCREENID: "homescreenid",
};

const css = {
  playButtonBackgroundColor: "green",
  settingsButtonBackgroundColor: "yellow",
  playButtonTextColor: "white",
  homeScreenBackgroundColor: "black",
};

enum AudioPlaybackStates {
  PLAY = "play",
  STOP = "stop",
}

enum GameScreens {
  HOMESCREEN = "homescreen",
  GAME_START = "game-start",
  GAME_CONTINUE = "game-continue",
  SHOW_NEXT_QUESTION = "next-question",
  TESTSCREEN = "test-screen",
  PROTOGAME = "proto-game-round",
  PROTOHOME = "proto-home",
  PROTO_END_OF_ROUND = "proto-end-of-round",
}

enum Errors {
  ARRAY_LENGTH_EXCEEDS_LIMIT = "Input list length exceeds output list length",
}

export default stringConstants;
export {
  css,
  screenNames,
  screenIds,
  GameScreens,
  AudioPlaybackStates,
  Errors,
};
