import { useState } from "react";
import { GAME_SCREENS, NUMBER_CONSTANTS } from "./src/constants/constants";
import generatePseudorandomNumberBetweenMinAndMax from "./src/util/generatePseudorandomNumberBetweenMinAndMax";
import GameScreen from "./src/components/screens/GameScreen";
import HomeScreen from "./src/components/screens/HomeScreen";

import data from "./assets/audio/clip_db.json";
import generateRandomQuestionChoices from "./src/util/generateRandomQuestionChoices";
import generateTotalIncorrectChoices from "./src/util/generateTotalIncorrectChoices";
import LearnMoreScreen from "./src/components/screens/LearnMoreScreen";
import CorrectScreen from "./src/components/screens/CorrectScreen";
import EndScreen from "./src/components/screens/EndScreen";
import StatsScreen from "./src/components/screens/StatsScreen";
import AccentCaptureScreen from "./src/components/screens/AccentCaptureScreen";
import { addDataToCurrentValue } from "./src/util/AsyncStorage/storeChoice";
import { LOCAL_STORAGE_KEYS } from "./src/constants/constants";

type GameScreenStateSetter = React.Dispatch<React.SetStateAction<GAME_SCREENS>>;
type CurrentQuestionSetter = React.Dispatch<React.SetStateAction<number>>;

export default function App() {
  /* STATE VARIABLES START */
  let [correctChoicesArray, setCorrectChoicesArray] = useState<any>([]);
  let [incorrectChoicesArray, setIncorrectChoicesArray] = useState<any>([]);
  let [currentGameIndex, setCurrentGameIndex] = useState(
    NUMBER_CONSTANTS.INDEX_OUT_OF_RANGE
  );
  let [gameScreen, setScreen] = useState<GAME_SCREENS>(GAME_SCREENS.HOMESCREEN);
  let [userSelectedChoicesRecord, setUserSelectedChoicesRecord] = useState<
    number[][]
  >([[]]);

  let [correctChoiceButtonIndex, setCorrectChoiceButtonIndex] =
    useState<number>(NUMBER_CONSTANTS.ZEROTH_INDEX);
  let [currentRoundScore, setCurrentRoundScore] = useState<number>(
    NUMBER_CONSTANTS.INIT_SCORE
  );
  /* STATE VARIABLES END */

  /* EVENT HANDLERS START */
  const handleGoToHome = () => {
    const screen = GAME_SCREENS.HOMESCREEN;
    setScreen(screen);
  };

  const handleNextQuestion = () => {
    let newIndex: number;
    let screen: GAME_SCREENS;
    const lastIndexValue = correctChoicesArray.length - 1;

    if (currentGameIndex === lastIndexValue) {
      screen = GAME_SCREENS.ENDSCREEN;
      newIndex = NUMBER_CONSTANTS.INDEX_OUT_OF_RANGE;
    } else {
      let record = [...userSelectedChoicesRecord];
      record.push([]);
      newIndex = currentGameIndex + 1;
      screen = GAME_SCREENS.GAMESCREEN;
      setUserSelectedChoicesRecord(record);
      setCorrectChoiceButtonIndex(
        Math.floor(Math.random() * NUMBER_CONSTANTS.NUM_CHOICES_PER_QUESTION)
      );
    }

    setCurrentGameIndex(newIndex);
    setScreen(screen);
  };

  const handleLearnMore = () => {
    setScreen(GAME_SCREENS.LEARN_MORE);
  };

  const handleStartGameRound = async () => {
    //generate 10 choices avoiding previous 3 rounds
    //add choices to async storage
    //if 2d array in async greater than 3, remove 1st array of choices

    const correctChoices = await generateRandomQuestionChoices(
      data,
      NUMBER_CONSTANTS.NUM_CORRECT_CHOICES_PER_ROUND
    );

    //append all correct choice id's to end of storage array
    const incorrectChoicesForEntireRound = generateTotalIncorrectChoices(
      correctChoices,
      data,
      NUMBER_CONSTANTS.NUM_INCORRECT_CHOICES_PER_QUESTION
    );
    setCurrentRoundScore(NUMBER_CONSTANTS.INIT_SCORE);
    setCorrectChoicesArray(correctChoices);
    setIncorrectChoicesArray(incorrectChoicesForEntireRound);

    setUserSelectedChoicesRecord([[]]);
    setCurrentGameIndex(NUMBER_CONSTANTS.ZEROTH_INDEX);
    setCorrectChoiceButtonIndex(
      Math.floor(Math.random() * NUMBER_CONSTANTS.NUM_CHOICES_PER_QUESTION)
    );
    setScreen(GAME_SCREENS.GAMESCREEN);
  };

  const handleAnswerSelection = (id: number) => {
    let screen: GAME_SCREENS;
    let record = [...userSelectedChoicesRecord];
    record[currentGameIndex].push(id);
    setUserSelectedChoicesRecord(record);

    if (record[currentGameIndex].length == 1) {
      //commented out because game currently not using these stats.
      //addValueToArrayInStorage(LOCAL_STORAGE_KEYS.correctIdAndChoiceIdKey, [correctChoicesArray[currentGameIndex].fileID, String(id)])
    }

    if (id === correctChoicesArray[currentGameIndex].fileID) {
      if (record[currentGameIndex].length == 1) {
        const newCurrentScore: number = currentRoundScore + 1;
        setCurrentRoundScore(newCurrentScore);
        addDataToCurrentValue(LOCAL_STORAGE_KEYS.firstChoiceCorrectScoreKey, 1);
      }
      addDataToCurrentValue(LOCAL_STORAGE_KEYS.questionsPlayedKey, 1);
      screen = GAME_SCREENS.CORRECT;
      setScreen(screen);
    }
  };

  const handleGoToStats = () => {
    setScreen(GAME_SCREENS.STAT_SCREEN);
  };
  /* EVENT HANDLERS END */

  return (
    <>
      {gameScreen === GAME_SCREENS.HOMESCREEN && (
        <HomeScreen
          doOnStartGameRound={handleStartGameRound}
          handleGoToStats={handleGoToStats}
        />
      )}
      {gameScreen === GAME_SCREENS.GAMESCREEN &&
        correctChoicesArray.length > 0 && (
          <GameScreen
            allIncorrect={incorrectChoicesArray}
            currentQuestionIndex={currentGameIndex}
            handleAnswerSelection={handleAnswerSelection}
            correctChoiceObj={correctChoicesArray[currentGameIndex]}
            correctButtonIndex={correctChoiceButtonIndex}
            currentRoundScore={currentRoundScore}
          />
        )}
      {gameScreen === GAME_SCREENS.LEARN_MORE && (
        <LearnMoreScreen
          correctChoiceObj={correctChoicesArray[currentGameIndex]}
          handleButtonPress={handleNextQuestion}
        />
      )}
      {gameScreen === GAME_SCREENS.CORRECT && (
        <CorrectScreen
          correctChoiceObj={correctChoicesArray[currentGameIndex]}
          handleNextButtonPress={handleNextQuestion}
          handleLearnMoreButtonPress={handleLearnMore}
        />
      )}
      {gameScreen === GAME_SCREENS.ENDSCREEN && (
        <EndScreen
          handleButtonPress={handleGoToHome}
          selections={userSelectedChoicesRecord}
          correctChoices={correctChoicesArray}
        />
      )}
      {gameScreen === GAME_SCREENS.ACCENT_ACQ && <AccentCaptureScreen />}
      {gameScreen === GAME_SCREENS.STAT_SCREEN && (
        <StatsScreen handleGoToHome={handleGoToHome} />
      )}
    </>
  );
}

type AccentList = Accent[];

class Accent {
  id: number;
  displayString: string;
  url: string;
  constructor(linkToAudio: string) {
    this.id = generatePseudorandomNumberBetweenMinAndMax();
    this.displayString = "Display string";
    this.url = linkToAudio;
  }
}

export { Accent, AccentList, GameScreenStateSetter, CurrentQuestionSetter };
