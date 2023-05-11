

const getSubArrayOfChoices = <T>(
    choicesArray: any,
    numChoices: number,

  ) => {
    //returns a subarray of original array, while removing those elements 
    if (choicesArray.length < numChoices) throw "array of choices not large enough"

    return choicesArray.splice(-3,3)
  };
  
  export default getSubArrayOfChoices;
  