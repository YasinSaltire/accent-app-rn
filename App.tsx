import { useState } from "react";
import { GameScreens, NUMBER_CONSTANTS } from "./src/constants/constants";
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
import { storageKeyStrings } from "./src/constants/constants";

type GameScreenStateSetter = React.Dispatch<React.SetStateAction<GameScreens>>;
type CurrentQuestionSetter = React.Dispatch<React.SetStateAction<number>>;

export default function App() {
  /* STATE VARIABLES START */
  let [correctChoicesArray, setCorrectChoicesArray] = useState<any>([]);
  let [incorrectChoicesArray, setIncorrectChoicesArray] = useState<any>([]);
  let [currentGameIndex, setCurrentGameIndex] = useState(
    NUMBER_CONSTANTS.INDEX_OUT_OF_RANGE
  );
  let [gameScreen, setScreen] = useState<GameScreens>(GameScreens.HOMESCREEN);
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
    const screen = GameScreens.HOMESCREEN;
    setScreen(screen);
  };

  const handleNextQuestion = () => {
    let newIndex: number;
    let screen: GameScreens;
    const lastIndexValue = correctChoicesArray.length - 1;

    if (currentGameIndex === lastIndexValue) {
      screen = GameScreens.ENDSCREEN;
      newIndex = NUMBER_CONSTANTS.INDEX_OUT_OF_RANGE;
    } else {
      let record = [...userSelectedChoicesRecord];
      record.push([]);
      newIndex = currentGameIndex + 1;
      screen = GameScreens.GAMESCREEN;
      setUserSelectedChoicesRecord(record);
      setCorrectChoiceButtonIndex(
        Math.floor(Math.random() * NUMBER_CONSTANTS.NUM_CHOICES_PER_QUESTION)
      );
    }

    setCurrentGameIndex(newIndex);
    setScreen(screen);
  };

  const handleLearnMore = () => {
    setScreen(GameScreens.LEARN_MORE);
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
    setScreen(GameScreens.GAMESCREEN);
  };

  const handleAnswerSelection = (id: number) => {
    let screen: GameScreens;
    let record = [...userSelectedChoicesRecord];
    record[currentGameIndex].push(id);
    setUserSelectedChoicesRecord(record);

    if (record[currentGameIndex].length == 1) {
      //commented out because game currently not using these stats.
      //addValueToArrayInStorage(storageKeyStrings.correctIdAndChoiceIdKey, [correctChoicesArray[currentGameIndex].fileID, String(id)])
    }

    if (id === correctChoicesArray[currentGameIndex].fileID) {
      if (record[currentGameIndex].length == 1) {
        const newCurrentScore: number = currentRoundScore + 1;
        setCurrentRoundScore(newCurrentScore);
        addDataToCurrentValue(storageKeyStrings.firstChoiceCorrectScoreKey, 1);
      }
      addDataToCurrentValue(storageKeyStrings.questionsPlayedKey, 1);
      screen = GameScreens.CORRECT;
      setScreen(screen);
    }
  };

  const handleGoToStats = () => {
    setScreen(GameScreens.STAT_SCREEN);
  };
  /* EVENT HANDLERS END */

  return (
    <>
      {gameScreen === GameScreens.HOMESCREEN && (
        <HomeScreen
          doOnStartGameRound={handleStartGameRound}
          handleGoToStats={handleGoToStats}
        />
      )}
      {gameScreen === GameScreens.GAMESCREEN &&
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
      {gameScreen === GameScreens.LEARN_MORE && (
        <LearnMoreScreen
          correctChoiceObj={correctChoicesArray[currentGameIndex]}
          handleButtonPress={handleNextQuestion}
        />
      )}
      {gameScreen === GameScreens.CORRECT && (
        <CorrectScreen
          correctChoiceObj={correctChoicesArray[currentGameIndex]}
          handleNextButtonPress={handleNextQuestion}
          handleLearnMoreButtonPress={handleLearnMore}
        />
      )}
      {gameScreen === GameScreens.ENDSCREEN && (
        <EndScreen
          handleButtonPress={handleGoToHome}
          selections={userSelectedChoicesRecord}
          correctChoices={correctChoicesArray}
        />
      )}
      {gameScreen === GameScreens.ACCENT_ACQ && <AccentCaptureScreen />}
      {gameScreen === GameScreens.STAT_SCREEN && (
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

function takeUrisAndOutputDictionary(uriList: string[]) {
  const list: AccentList = [];
  uriList.forEach((uri) => {
    const accent: Accent = new Accent(uri);
    list.push(accent);
  });
  return list;
}

function pickNRandomElementsFromArray<T>(n: number, pickFromArray: T[]) {
  if (pickFromArray.length > 0 && n < +pickFromArray.length) {
    const min = 0;
    const max = pickFromArray.length;
    const setOfPickedIndices = new Set<number>();

    for (let index = 0; index < max; index++) {
      const randomNumber = generatePseudorandomNumberBetweenMinAndMax;
    }

    pickFromArray.map((arrayElement, index) => {
      let randomIndex = generatePseudorandomNumberBetweenMinAndMax(
        -1,
        pickFromArray.length
      );
      while (setOfPickedIndices.has(index)) {
        randomIndex = generatePseudorandomNumberBetweenMinAndMax(
          -1,
          pickFromArray.length
        );
      }
    });
  } else if (n > pickFromArray.length) {
    // return empty array

    return [];
  }
}

const getElementFromArrayNotInSet = (
  arr: any[],
  pickedIndexSet: Set<number>
) => {
  const min = 0;
  const max = arr.length;
  let pickRandomIndex = generatePseudorandomNumberBetweenMinAndMax(min, max);

  while (pickedIndexSet.has(pickRandomIndex)) {
    pickRandomIndex = generatePseudorandomNumberBetweenMinAndMax(min, max);
  }

  return pickRandomIndex;
};

export { Accent, AccentList, GameScreenStateSetter, CurrentQuestionSetter };
