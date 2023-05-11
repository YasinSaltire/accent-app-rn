

const checkIfRegionExistsInArray = <T>(
  arrayOfChoicesToAvoid: any,
  data: any,
  index: number
) => {
  /*
      gnerate an array of indices of incorrect choices. However, run a loop so that if
      a given index generated coincides with a correct choice (don't use file id, use 
      )

      current ieration, just check if fileid's conflcit
      */

    const fileID: "string" = data[index].fileID

    if ((arrayOfChoicesToAvoid.filter((accent: any) => accent.fileID === fileID)) > 0){
        return true
    }
    return false
};

export default checkIfRegionExistsInArray;
