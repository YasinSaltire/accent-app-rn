import { Pressable, View, Text, StyleSheet } from "react-native";
import generateAccentString from "../../util/generateAccentString";
import scoreRound from "../../util/scoreRound";

type EndScreenProps = {
  selections: number[][],
  correctChoices: any,
  handleButtonPress: any
};

const EndScreen = (props: EndScreenProps) => {

  const score = scoreRound(props.selections, props.correctChoices);

  return (
    <View style = {playScreenStyles('black')}>  

        <Text style = {{color: 'white'}}>
            Great Job! You Completed a Round
        </Text>
        <Text style = {{color: 'white'}}>
            You answered {score} quesions correct on the first try
        </Text>
        <Pressable style = {{alignItems: 'center', alignSelf: 'center', justifyContent: 'center', backgroundColor: '#82DB5B', width: '100%', height:'10%'}} onPress = {() => props.handleButtonPress()}>
            <Text numberOfLines = {1} adjustsFontSizeToFit style = {{fontSize: 36, color: 'white'}}> Return to Main Menu </Text>
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
      justifyContent: 'space-between',
      paddingTop: '30%',
      paddingBottom: '30%',


    },
  });
  return style.default;
};

export default EndScreen;
