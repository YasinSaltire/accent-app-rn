enum NUMBER_CONSTANTS {
  INDEX_OUT_OF_RANGE = -1,
  ZEROTH_INDEX = 0,
  ZERO = 0,
  INIT_SCORE = 0,
  NUM_CORRECT_CHOICES_PER_ROUND = 10,
  NUM_CHOICES_PER_QUESTION = 4,
  NUM_INCORRECT_CHOICES_PER_QUESTION = 3,
}

enum stringConstants {
  startGame = "Play",
  gameTitle = "Game Title",
  settings = "Settings",
  GO_HOME = "Go Home",
}

enum storageKeyStrings {
  correctChoicesKey = "Correct Choices",
  firstChoiceCorrectScoreKey = "First Score",
  questionsPlayedKey = "Rounds Played",
  correctIdAndChoiceIdKey = "Choice Mapping",
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
  GAMESCREEN = "game-screen",
  END_OF_ROUND = "end-of-round",
  LEARN_MORE = "learn-more",
  CORRECT = "correct",
  ENDSCREEN = "end-screen",
  ACCENT_ACQ = "accent-capture",
  STAT_SCREEN = "player-stat-screen",
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
  storageKeyStrings,
  NUMBER_CONSTANTS,
};
