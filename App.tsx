import { useEffect, useState } from "react";
import Home from "./src/components/screens/Home";
import { GameStates } from "./src/constants/constants";
import audioUris from "./src/temp/audioUris";
import GamePlay from "./src/components/screens/GamePlay";
import generatePseudorandomNumberBetweenMinAndMax from "./src/util/generatePseudorandomNumberBetweenMinAndMax";
import { IAudioPlayer } from "./src/services/AudioPlayer";

export default function App() {
  let [gameState, setGameState] = useState<GameStates>(GameStates.HOMESCREEN);
  let [audioPlayer, setAudioPlayer] = useState({} as IAudioPlayer);

  return (
    <>
      {gameState === GameStates.HOMESCREEN && (
        <Home onSetGameState={setGameState} />
      )}
      {gameState === GameStates.GAME_START && (
        <GamePlay
          audioPlayer={audioPlayer}
          onReportUserResponse={setGameState}
        />
      )}
    </>
  );
}

type AccentList = Accent[];

class Accent {
  id: number;
  displayString: string;
  uri: string;
  constructor(linkToAudio: string) {
    this.id = generatePseudorandomNumberBetweenMinAndMax(); // use function to generate proper id
    this.displayString = "Display string";
    this.uri = linkToAudio;
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

export { Accent, AccentList };
