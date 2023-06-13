import pickRandomIndexFromArray from "./pickRandomIndexFromArray";

const generateNIncorrectChoicesGivenOneCorrect = <T>(
  correctChoice: any,
  numberOfIncorrectToGenerate: number,
  data: any
) => {
  const correctLat = correctChoice.latitude;
  const correctLong = correctChoice.longitude;

  let arrayOfNIncorrect: any[] = [];

  //if correct has city, don't add any incorrect's that match country but city is empty
  //if correct has no city but has region (i.e midwestern USA), don't add incorrects that match country but city empty, and don't add incorrects that have same region same country
  //if correct only has country, don't add any incorrects that contain same country
  while (arrayOfNIncorrect.length != numberOfIncorrectToGenerate) {
    let idx: number = pickRandomIndexFromArray(data);
    let currentPick = data[idx];

    while (
      (currentPick.country === correctChoice.country) || ((arrayOfNIncorrect.filter((accent: any) => accent.country == currentPick.country)).length) > 0 ||
      (currentPick.latitude == correctLat &&
      currentPick.longitude == correctLong) ||
      ((arrayOfNIncorrect.filter(
        (accent: any) =>
          accent.latitude == currentPick.latitude &&
          accent.longitude == currentPick.longitude
      )).length > 0)
    ) {
        idx = pickRandomIndexFromArray(data);
        currentPick = data[idx];
    
    }
    //generate random index of data does not conflict with correctLat and correctLong
    arrayOfNIncorrect.push(currentPick);
  }

  return arrayOfNIncorrect;
};

export default generateNIncorrectChoicesGivenOneCorrect;
