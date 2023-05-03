const getCherryPickedSubArrayFromParent = <T>(
  randomizedIndexArray: number[],
  parentArray: T[]
) => {
  const arrayToReturn = [] as T[];
  for (let index = 0; index < randomizedIndexArray.length; index++) {
    const currentIndex = randomizedIndexArray[index];
    const elementFromParent = parentArray[currentIndex];
    arrayToReturn.push(elementFromParent);
  }
  return arrayToReturn;
};

export default getCherryPickedSubArrayFromParent;
