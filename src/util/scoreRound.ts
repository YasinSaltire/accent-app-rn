
const scoreRound = <T>(
    selections: number[][],
    correctChoices: any,

    ) => {
        let score: number = 0;

        for(let i = 0; i <selections.length; i++){
            if (selections[i][0] == correctChoices[i].fileID){
                score+=1;
            }
        }
        return score

  }
export default scoreRound