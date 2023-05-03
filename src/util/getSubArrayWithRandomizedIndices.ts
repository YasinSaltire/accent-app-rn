import generatePseudorandomNumberBetweenMinAndMax from "./generatePseudorandomNumberBetweenMinAndMax";

function getSubArrayWithRandomizedIndices<T>(
  array: T[],
  sizeOfSubarray: number
) {
  const subarray: number[] = [];
  const setToTrackPickedIndices = new Set<number>();
  for (let index = 0; index < sizeOfSubarray; index++) {
    let randN = generatePseudorandomNumberBetweenMinAndMax(
      -1,
      array.length - 1,
      setToTrackPickedIndices
    );
    setToTrackPickedIndices.add(randN);
    subarray[index] = randN;
  }
  return subarray;
}

export default getSubArrayWithRandomizedIndices;
