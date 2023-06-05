import pickRandomIndexFromArray from "./pickRandomIndexFromArray";

const generateNIncorrectChoicesGivenOneCorrect = <T>(
  correctChoice: any,
  numberOfIncorrectToGenerate: number,
  data: any
) => {
  const correctLat = correctChoice.latitude;
  const correctLong = correctChoice.longitude;

  let arrayOfNIncorrect: any[] = [];

  while (arrayOfNIncorrect.length != numberOfIncorrectToGenerate) {
    let idx: number = pickRandomIndexFromArray(data);
    let currentPick = data[idx];
    while (
      (currentPick.latitude == correctLat &&
      currentPick.longitude == correctLong) ||
      ((arrayOfNIncorrect.filter(
        (accent: any) =>
          accent.latitude == currentPick.latitude &&
          accent.longitude == currentPick.longitude
      )).length > 0)
    ) {
        console.log(idx);
        idx = pickRandomIndexFromArray(data);
        currentPick = data[idx];
    
    }
    //generate random index of data does not conflict with correctLat and correctLong
    arrayOfNIncorrect.push(currentPick);
  }

  return arrayOfNIncorrect;
};

export default generateNIncorrectChoicesGivenOneCorrect;
