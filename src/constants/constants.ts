enum NUMBER_CONSTANTS {
  INDEX_OUT_OF_RANGE = -1,
  ZEROTH_INDEX = 0,
  ZERO = 0,
  INIT_SCORE = 0,
  INIT_SCORE_PERCENTAGE = 0,
  NUM_CORRECT_CHOICES_PER_ROUND = 10,
  NUM_CHOICES_PER_QUESTION = 4,
  NUM_INCORRECT_CHOICES_PER_QUESTION = 3,
}

enum STRING_CONSTANTS {
  EMPTY_STRING = "",
}

enum DISPLAY_STRINGS {
  LEARN_MORE = "LEARN MORE",
  NEXT = "NEXT",
  CORRECT_ANSWER = "CORRECT ANSWER!",
}

enum LOCAL_STORAGE_KEYS {
  CORRECT_CHOICES = "Correct Choices",
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

enum GAME_SCREENS {
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

export default STRING_CONSTANTS;
export {
  css,
  screenNames,
  screenIds,
  GAME_SCREENS,
  AudioPlaybackStates,
  Errors,
  LOCAL_STORAGE_KEYS,
  NUMBER_CONSTANTS,
  DISPLAY_STRINGS,
};
