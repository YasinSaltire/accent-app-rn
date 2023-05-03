// This file should be renamed to something more specific as the codebase grows.

const stringConstants = {
  startGame: "Start Game",
  gameTitle: "Game Title",
  settings: "Settings",
};

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

enum GameStates {
  HOMESCREEN = "homescreen",
  GAME_START = "game-start",
  GAME_CONTINUE = "game-continue",
  SHOW_NEXT_QUESTION = "next-question",
}

enum Errors {
  ARRAY_LENGTH_EXCEEDS_LIMIT = "Input list length exceeds output list length",
}

export default stringConstants;
export { css, screenNames, screenIds, GameStates, AudioPlaybackStates, Errors };
