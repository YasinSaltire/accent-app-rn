import Question from "../model/Question";
import pickNRandomIndicesFromArray from "./pickNRandomIndicesFromArray";

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


const generateRandomQuestionChoices = <T>(
  data: T[],
  desiredLengthOfArray: number
) => {
  // given an array, A of arbitrary length and a number, n corresponding to length of desired array
  // return an array, B with n elements picked out at random from A
  if (desiredLengthOfArray > data.length) 
    throw "too many questions";

  let arrayOfChoices: T[] = [];

  let arrayOfIndices = pickNRandomIndicesFromArray(desiredLengthOfArray, data);

  arrayOfIndices.map(index => arrayOfChoices.push(data[index]))

  return arrayOfChoices;
};

export default generateRandomQuestionChoices;
export { question, questionList };
