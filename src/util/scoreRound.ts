
const scoreRound = <T>(
    selections: any,
    correctChoices: any,

    ) => {
        let score: number = 0;
        for(let i = 0; i <selections.length; i++){
            if(correctChoices.find((choice: any) => choice.fileID === selections[i])){
                score+=1;
            }
        }
        return score

  }
export default scoreRound