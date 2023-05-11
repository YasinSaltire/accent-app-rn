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
} from "./src/components/screens/ProtoGameScreen";
import ProtoHome from "./src/components/screens/ProtoHome";

import data from "./assets/audio/clip_db.json";
import generateRandomQuestionChoices from "./src/util/generateRandomQuestionChoices";
import generateIncorrectChoices from "./src/util/generateIncorrectChoices";



type GameScreenStateSetter = React.Dispatch<React.SetStateAction<GameScreens>>;
type CurrentQuestionSetter = React.Dispatch<React.SetStateAction<number>>;
export default function App() {
  const correctChoicesTest: any = generateRandomQuestionChoices(data, 10);
  const incorrectChoicesTest: any = generateIncorrectChoices(correctChoicesTest, data, 5)

  const correctIDsTest: any = []
  correctChoicesTest.map((accent: any) => correctIDsTest.push(accent.fileID)).join(", ")
  const incorrectIDsTest: any = []
  incorrectChoicesTest.map((accent: any) => incorrectIDsTest.push(accent.fileID)).join(", ")

  console.log("10 choices", correctIDsTest)
  console.log('----------------')
  console.log("5 incorrect choices test", incorrectIDsTest)

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

  let [questionList, setQuestionList] = useState(generateRandomQuestionChoices(data,10))

  const handleStartGameRound = () => {
    setCurrentGameIndex(0);
    setScreen(GameScreens.PROTOGAME);
  };

  const handleAnswerSelection = (userSelection: QuestionStruct) => {
    console.log("select", userSelection);
    qnaList[currentGameIndex].answer = userSelection;
    const newQnAList = [...qnaList];
    let screen: GameScreens;
    let newIndex: number;
    if (currentGameIndex === qnaList.length - 1) {
      screen = GameScreens.PROTOHOME;
      newIndex = -1;
    } else {
      screen = GameScreens.PROTOGAME;
      newIndex = currentGameIndex + 1;
    }
    setQnAList(newQnAList);
    setCurrentGameIndex(newIndex);
    setScreen(screen);
  };

  return (
    <>
      {gameScreen === GameScreens.HOMESCREEN && (
        <Home onSetGameState={setScreen} />
      )}
      {gameScreen === GameScreens.GAME_START && (
        <GamePlay audioPlayer={audioPlayer} onReportUserResponse={setScreen} />
      )}

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
