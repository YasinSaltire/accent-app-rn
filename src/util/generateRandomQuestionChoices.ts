import pickNRandomIndicesFromArray from "./pickNRandomIndicesFromArray";
import {
  addValueToArrayInStorage,
  readData,
  storeData,
} from "./AsyncStorage/storeChoice";
import { LOCAL_STORAGE_KEYS } from "../constants/constants";
import pickRandomIndexFromArray from "./pickRandomIndexFromArray";
type question = {
  id: number;
  city: string;
  region: string;
  country: string;
  uri: string;
  attribute: string;
  latitude: number;
  longitude: number;
};

type questionList = question[];

const generateRandomQuestionChoices = async <T>(
  data: any,
  desiredLengthOfArray: number
) => {
  // given an array, A of arbitrary length and a number, n corresponding to length of desired array
  // return an array, B with n elements picked out at random from A
  if (desiredLengthOfArray > data.length) throw "too many questions";

  let prevCorrectIdsArray = await readData(LOCAL_STORAGE_KEYS.CORRECT_CHOICES);

  let arrayOfChoices: any = [];

  if (prevCorrectIdsArray.length == 0) {
    let arrayOfIndices = pickNRandomIndicesFromArray(
      desiredLengthOfArray,
      data
    );
    arrayOfIndices.map((index) => arrayOfChoices.push(data[index]));
  } else {
    while (arrayOfChoices.length != desiredLengthOfArray) {
      let indexToAdd = pickRandomIndexFromArray(data);
      let choiceToAdd = data[indexToAdd];
      //while correctidsarray contains the id of the choice we are checking
      while (
        prevCorrectIdsArray.filter((nested: any) =>
          nested.includes(choiceToAdd.fileID)
        ).length > 0 ||
        arrayOfChoices.filter(
          (choice: any) => choice.fileID == choiceToAdd.fileID
        ) > 0
      ) {
        indexToAdd = pickRandomIndexFromArray(data);
        choiceToAdd = data[indexToAdd];
      }
      arrayOfChoices.push(choiceToAdd);
    }
    if (prevCorrectIdsArray.length > 2) {
      prevCorrectIdsArray = prevCorrectIdsArray.slice(1);
      await storeData(LOCAL_STORAGE_KEYS.CORRECT_CHOICES, prevCorrectIdsArray);
    }
  }

  await addValueToArrayInStorage(
    LOCAL_STORAGE_KEYS.CORRECT_CHOICES,
    arrayOfChoices.map((accent: any) => String(accent.fileID))
  );
  return arrayOfChoices;
};

export default generateRandomQuestionChoices;
export { question, questionList };
