
const generateAccentString = (
  accentObject: any
  ) => {
    let returnString: string = ""

    if ((accentObject.city).length > 0){
        returnString = returnString.concat(accentObject.city)
    }
    if ((accentObject.region).length > 0){
        returnString = returnString.concat(" ", accentObject.region)
    }
    if (returnString.length> 0){
        returnString = returnString.concat(" ", accentObject.country)
    }else{
        returnString = returnString.concat(accentObject.country)
    }
    return returnString
  };

  export default generateAccentString;