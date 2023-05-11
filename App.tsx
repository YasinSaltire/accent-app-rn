import { useEffect, useState } from "react";
import Home from "./src/components/screens/Home";
import { GameScreens } from "./src/constants/constants";
import audioUris from "./src/temp/audioUris";
import GamePlay from "./src/components/screens/GamePlay";
import generatePseudorandomNumberBetweenMinAndMax from "./src/util/generatePseudorandomNumberBetweenMinAndMax";
import { IAudioPlayer } from "./src/services/AudioPlayer";
import TestScreen from "./src/components/screens/TestScreen";
import ProtoGameScreen, {
  QuestionStruct,
} from "./src/components/screens/GameScreen";
import ProtoHome from "./src/components/screens/HomeScreen";

import data from "./assets/audio/clip_db.json";
import generateRandomQuestionChoices from "./src/util/generateRandomQuestionChoices";
import generateIncorrectChoices from "./src/util/generateIncorrectChoices";
import getSubArrayOfChoices from "./src/util/getSubArrayOfChoices";

type GameScreenStateSetter = React.Dispatch<React.SetStateAction<GameScreens>>;
type CurrentQuestionSetter = React.Dispatch<React.SetStateAction<number>>;

export default function App() {
  let [correctChoicesArray, setCorrectChoicesArray] = useState<any>([]);
  let [incorrectChoicesArray, setIncorrectChoicesArray] = useState<any>([]);
  let [
    incorrectChoicesSubArrayForButtons,
    setIncorrectChoicesSubArrayForButtons,
  ] = useState<any>([]);
  
  const correctChoices = generateRandomQuestionChoices(data, 5);
  
  const correctIDsTest: any = [];
  correctChoicesArray
    .map((accent: any) => correctIDsTest.push(accent.fileID))
    .join(", ");
  console.log("10 choices", correctIDsTest);
  console.log("----------------");

  const incorrectIDsTest: any = [];
  incorrectChoicesArray
    .map((accent: any) => incorrectIDsTest.push(accent.fileID))
    .join(", ");

  console.log("30 incorrect choices test", incorrectIDsTest);
  
  let [currentGameIndex, setCurrentGameIndex] = useState(-1);
  let [gameScreen, setScreen] = useState<GameScreens>(GameScreens.PROTOHOME);
  let [currentQuestionIndex, setCurrentQuestionIndex] = useState();

  //randomly chooose 10 correct answer choices from database and populate qnalist.
  let [qnaList, setQnAList] = useState<QuestionStruct[]>([
    { id: 0, value: "a", answer: {} as QuestionStruct },
    { id: 1, value: "b", answer: {} as QuestionStruct },
    { id: 2, value: "c", answer: {} as QuestionStruct },
    { id: 3, value: "d", answer: {} as QuestionStruct },
    { id: 4, value: "e", answer: {} as QuestionStruct },
  ]);
  let [audioPlayer, setAudioPlayer] = useState({} as IAudioPlayer);

  const handleStartGameRound = () => {

    setCurrentGameIndex(0);
    setCorrectChoicesArray(generateRandomQuestionChoices(data, 5));
    setIncorrectChoicesArray(
      generateIncorrectChoices(correctChoicesArray, data, 15)
    );
    console.log('incorrect choices array', generateIncorrectChoices(correctChoicesArray, data, 15))
    
    var incorrectIDsTest: any = [];
    incorrectChoicesArray
      .map((accent: any) => incorrectIDsTest.push(accent.fileID))
      .join(", ");

    console.log("15 incorrect choices test", incorrectIDsTest);

    // initialize choices array
    // A = [...]
    // save that array to state in this component
    // setIncorrectChoicesArray(A)
    setIncorrectChoicesSubArrayForButtons(
      getSubArrayOfChoices(incorrectChoicesArray, 3)
    );
    const correctIDsTest: any = [];
    correctChoicesArray
      .map((accent: any) => correctIDsTest.push(accent.fileID))
      .join(", ");
    console.log("5 choices", correctIDsTest);
    console.log("----------------");

    setScreen(GameScreens.PROTOGAME);
    console.log("cur game index ", currentGameIndex);
  };

  const handleAnswerSelection = (userSelection: QuestionStruct) => {
    console.log("select", userSelection);
    qnaList[currentGameIndex].answer = userSelection;
    const newQnAList = [...qnaList];
    let screen: GameScreens;
    let newIndex: number;

    if (currentGameIndex === qnaList.length - 1) {
      //invoke if round finished.
      screen = GameScreens.PROTOHOME;
      newIndex = -1;
      //generate new set of questions
    } else {
      screen = GameScreens.PROTOGAME;
      newIndex = currentGameIndex + 1;
      setIncorrectChoicesSubArrayForButtons(
        getSubArrayOfChoices(incorrectChoicesArray, 3)
      );
    }

    setQnAList(newQnAList);
    setCurrentGameIndex(newIndex);
    setScreen(screen);
  };

  return (
    <>
      {gameScreen === GameScreens.PROTOHOME && (
        <ProtoHome doOnStartGameRound={handleStartGameRound} />
      )}
      {gameScreen === GameScreens.PROTOGAME && (
        <ProtoGameScreen
          question={
            currentGameIndex >= 0
              ? qnaList[currentGameIndex]
              : ({} as QuestionStruct)
          }
          handleAnswerSelection={handleAnswerSelection}
          correctChoiceObj={correctChoicesArray[currentGameIndex]}
          incorrectChoicesArr={incorrectChoicesSubArrayForButtons}
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
