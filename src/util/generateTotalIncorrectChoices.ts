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
    //append 3 created incorrect choices to incorrect choce array
    arrayOfIncorrectChoices = arrayOfIncorrectChoices.concat(incorrectChoicesForCorrect);
  }
  
  return arrayOfIncorrectChoices;
};

export default generateTotalIncorrectChoices;
