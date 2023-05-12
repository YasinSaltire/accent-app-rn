import { useEffect, useState } from "react";
import { GameScreens } from "./src/constants/constants";
import generatePseudorandomNumberBetweenMinAndMax from "./src/util/generatePseudorandomNumberBetweenMinAndMax";
import GameScreen, {
  QuestionStruct,
} from "./src/components/screens/GameScreen";
import HomeScreen from "./src/components/screens/HomeScreen";

import data from "./assets/audio/clip_db.json";
import generateRandomQuestionChoices from "./src/util/generateRandomQuestionChoices";
import generateIncorrectChoices from "./src/util/generateIncorrectChoices";
import getSubArrayOfChoices from "./src/util/getSubArrayOfChoices";
import scoreRound from "./src/util/scoreRound";

type GameScreenStateSetter = React.Dispatch<React.SetStateAction<GameScreens>>;
type CurrentQuestionSetter = React.Dispatch<React.SetStateAction<number>>;

export default function App() {
  let [correctChoicesArray, setCorrectChoicesArray] = useState<any>([]);
  let [incorrectChoicesArray, setIncorrectChoicesArray] = useState<any>([]);
  let [
    incorrectChoicesSubArrayForButtons,
    setIncorrectChoicesSubArrayForButtons,
  ] = useState<any>([]);
  let [currentGameIndex, setCurrentGameIndex] = useState(-1);
  let [gameScreen, setScreen] = useState<GameScreens>(GameScreens.HOMESCREEN);
  let [userSelectedChoicesRecord, setUserSelectedChoicesRecord] = useState<
    number[]
  >([]);
  let [correctChoiceButtonIndex, setCorrectChoiceButtonIndex] = useState<number>(0)
  let [score, setScore] = useState<number>(0)
  // state variable that stores number of correctly answered questions

  // const correctChoices = generateRandomQuestionChoices(data, 5);

  // const correctIDsTest: any = [];
  // correctChoicesArray
  //   .map((accent: any) => correctIDsTest.push(accent.fileID))
  //   .join(", ");
  //console.log("10 choices", correctIDsTest);
  //console.log("----------------");

  // const incorrectIDsTest: any = [];
  // incorrectChoicesArray
  //   .map((accent: any) => incorrectIDsTest.push(accent.fileID))
  //   .join(", ");

  //console.log("30 incorrect choices test", incorrectIDsTest);

  // let [currentQuestionIndex, setCurrentQuestionIndex] = useState();

  //randomly chooose 10 correct answer choices from database and populate qnalist.
  let [qnaList, setQnAList] = useState<QuestionStruct[]>([
    { id: 0, value: "a", answer: {} as QuestionStruct },
    { id: 1, value: "b", answer: {} as QuestionStruct },
    { id: 2, value: "c", answer: {} as QuestionStruct },
    { id: 3, value: "d", answer: {} as QuestionStruct },
    { id: 4, value: "e", answer: {} as QuestionStruct },
  ]);

  const handleStartGameRound = () => {
    const correctChoices = generateRandomQuestionChoices(data, 5);
    const incorrectChoicesForEntireRound = generateIncorrectChoices(
      correctChoices,
      data,
      15
    );
    /*
    const threeIncorrectChoicesForCurrentQuestion = getSubArrayOfChoices(
      incorrectChoicesForEntireRound,
      3
    );
    setIncorrectChoicesSubArrayForButtons(
      threeIncorrectChoicesForCurrentQuestion
      );
      */

    setCorrectChoicesArray(correctChoices);
    setIncorrectChoicesArray(incorrectChoicesForEntireRound);
    setUserSelectedChoicesRecord([])
    //console.log("length test ", correctChoicesArray.length);
    setCurrentGameIndex(0);
    setCorrectChoiceButtonIndex(Math.floor(Math.random() * 4))
    console.log("screen", gameScreen)

    setScreen(GameScreens.GAMESCREEN);
  };

  useEffect(() => {
    //console.log("print correct choices: ", correctChoicesArray);
  }, [correctChoicesArray]);

  const handleAnswerSelection = (id: number) => {
    let screen: GameScreens;
    let newIndex: number;
    let curScore: number;
    let userRecord: number[] = [...userSelectedChoicesRecord];
    userRecord.push(id);

    setUserSelectedChoicesRecord(userRecord);
    // update score
    curScore = scoreRound(userRecord, correctChoicesArray)
    setScore(curScore)
    

    if (currentGameIndex === correctChoicesArray.length - 1) {
      //invoke if round finished.
      screen = GameScreens.HOMESCREEN;
      newIndex = -1;
      //generate new set of questions
    } else {
      screen = GameScreens.GAMESCREEN;
      newIndex = currentGameIndex + 1;
    }
    console.log('choicse log', userSelectedChoicesRecord)
    setCurrentGameIndex(newIndex);
    setCorrectChoiceButtonIndex(Math.floor(Math.random() * 4))
    setScreen(screen);
  };


  return (
    <>
      {gameScreen === GameScreens.HOMESCREEN && (
        <HomeScreen doOnStartGameRound={handleStartGameRound} />
      )}
      {gameScreen === GameScreens.GAMESCREEN  && correctChoicesArray.length > 0 && (
        <GameScreen
          correctlyAnswered={score} // state variable that you'll define above in this component
          allIncorrect={incorrectChoicesArray}
          currentQuestionIndex={currentGameIndex}
          question={
            currentGameIndex >= 0
              ? qnaList[currentGameIndex]
              : ({} as QuestionStruct)
          }
          handleAnswerSelection={handleAnswerSelection}
          correctChoiceObj={correctChoicesArray[currentGameIndex]}
          correctButtonIndex={correctChoiceButtonIndex}
       
        />
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
    this.id = generatePseudorandomNumberBetweenMinAndMax(); // use function to generate proper id
    this.displayString = "Display string";
    this.url = linkToAudio;
  }
}

function takeUrisAndOutputDictionary(uriList: string[]) {
  const list: AccentList = [];
  uriList.forEach((uri) => {
    // package uri, id, displaystring into Accent object
    // push accent object into declared list
    const accent: Accent = new Accent(uri);
    list.push(accent);
  });
  return list;
}

function pickNRandomElementsFromArray<T>(n: number, pickFromArray: T[]) {
  if (pickFromArray.length > 0 && n < +pickFromArray.length) {
    // return array with randomly picked elements
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
