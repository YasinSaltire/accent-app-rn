function generatePseudorandomNumberBetweenMinAndMax(
  min = 999,
  max = 10000,
  avoid?: Set<number>
) {
  const getRandN = (min: number, max: number) =>
    // generates a random number between min (exclusive) and max (inclusive)
    Math.ceil(Math.random() * (max - min)) + min;
  if (avoid) {
    let randomNumber = getRandN(min, max);
    while (avoid.has(randomNumber)) {
      randomNumber = getRandN(min, max);
    }
    return randomNumber;
  } else {
    return getRandN(min, max);
  }
}

export default generatePseudorandomNumberBetweenMinAndMax;
