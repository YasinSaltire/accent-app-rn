import pickRandomIndexFromArray from "./pickRandomIndexFromArray";
import checkIfRegionExistsInArray from "./checkIfRegionExistsInArray";

const generateIncorrectChoices = <T>(
  arrayOfChoicesToAvoid: T[],
  data: T[],
  numberOfIncorrectChoices: number
) => {
  /*
      gnerate an array of indices of incorrect choices. However, run a loop so that if
      a given index generated coincides with a correct choice (don't use file id, use 
      )
      */
  if (numberOfIncorrectChoices > data.length) throw "too many questions";

  let arrayOfIncorrectIndices: number[] = [];
  let arrayOfIncorrectChoices: any = [];

  while (arrayOfIncorrectChoices.length !== numberOfIncorrectChoices) {
    let idx = pickRandomIndexFromArray(data);

    while (checkIfRegionExistsInArray(arrayOfChoicesToAvoid, data, idx) || checkIfRegionExistsInArray(arrayOfIncorrectChoices, data, idx)) {
      idx = pickRandomIndexFromArray(data);
      
    }
    arrayOfIncorrectChoices.push(data[idx])
  }


  return arrayOfIncorrectChoices
};

export default generateIncorrectChoices;
