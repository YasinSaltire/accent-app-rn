import { Pressable, View, Text, StyleSheet } from "react-native";
import generateAccentString from "../../util/generateAccentString";
import scoreRound from "../../util/scoreRound";
import { addDataToCurrentValue, readData, deleteData} from "../../util/AsyncStorage/storeChoice";
import { storageKeyStrings } from "../../constants/constants";

type EndScreenProps = {
  selections: number[][],
  correctChoices: any,
  handleButtonPress: any
};

const EndScreen = (props: EndScreenProps) => {

  const score = scoreRound(props.selections, props.correctChoices);
  //addDataToCurrentValue(storageKeyStrings.firstChoiceCorrectScoreKey, score)
  //console.log(readData(storageKeyStrings.firstChoiceCorrectScoreKey))
  //deleteData("First")
  return (
    <View style = {playScreenStyles('black')}>  

        <Text style = {{marginBottom: 50, fontSize: 20, color: 'white'}}>
            Great Job! You Completed a Round.
        </Text>
        <View style = {{width: '80%'}}>
          <Text style = {{alignSelf: 'center', fontSize: 20, color: 'white'}}>
            You answered {score} questions correct on the first try
          </Text>
        </View>
        
        <Pressable style = {{marginTop: '30%', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', backgroundColor: '#82DB5B', width: '80%', height:'10%'}} onPress = {() => props.handleButtonPress()}>
            <Text numberOfLines = {1} adjustsFontSizeToFit style = {{fontSize: 30, color: 'white'}}> Return to Main Menu </Text>
        </Pressable>
    </View>
    
  );
};

const playScreenStyles = (color: string) => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: color,
      alignItems: "center",
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
      


    },
  });
  return style.default;
};

export default EndScreen;