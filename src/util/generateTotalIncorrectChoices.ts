import pickRandomIndexFromArray from "./pickRandomIndexFromArray";
import checkIfRegionExistsInArray from "./checkIfRegionExistsInArray";
import generateNIncorrectChoicesGivenOneCorrect from "./generateNIncorrectChoicesGivenOneCorrect";

const generateTotalIncorrectChoices = <T>(
  arrayOfChoicesToAvoid: any,
  data: T[],
  numberOfIncorrectChoicesPerCorrect: number
) => {
  /*
      gnerate an array of indices of incorrect choices. However, run a loop so that if
      a given index generated coincides with a correct choice (don't use file id, use 
      )
      */
  if (numberOfIncorrectChoicesPerCorrect * arrayOfChoicesToAvoid.length > data.length) throw "too many questions";

  let arrayOfIncorrectChoices: any[] = [];

  //iterate through  array. For each element, generate three nonconflicting

  for (let i = 0; i < arrayOfChoicesToAvoid.length; i++) {
    const correctChoice = arrayOfChoicesToAvoid[i];
    const incorrectChoicesForCorrect = generateNIncorrectChoicesGivenOneCorrect(
      correctChoice,
      numberOfIncorrectChoicesPerCorrect,
      data
    );
    //console.log('test', incorrectChoicesForCorrect)
    //append 3 created incorrect choices to incorrect choce array
    arrayOfIncorrectChoices = arrayOfIncorrectChoices.concat(incorrectChoicesForCorrect);
  }
  
  return arrayOfIncorrectChoices;
  /*
  while (arrayOfIncorrectChoices.length !== numberOfIncorrectChoices) {
    let idx = pickRandomIndexFromArray(data);

    while (
      checkIfRegionExistsInArray(arrayOfChoicesToAvoid, data, idx) ||
      checkIfRegionExistsInArray(arrayOfIncorrectChoices, data, idx)
    ) {
      idx = pickRandomIndexFromArray(data);
    }
    arrayOfIncorrectChoices.push(data[idx]);
  }
  */
};

export default generateTotalIncorrectChoices;
