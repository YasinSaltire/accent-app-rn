import { Pressable, View, Text, StyleSheet } from "react-native";
import generateAccentString from "../../util/generateAccentString";
type CorrectScreenProps = {
  handleNextButtonPress: any;
  handleLearnMoreButtonPress: any;
  correctChoiceObj: any;
};
const CorrectScreen = (props: CorrectScreenProps) => {
    return (
      <View style={styles.container}>
        <Text style = {styles.text}>Correct Answer!</Text>
        {props.correctChoiceObj.city !== "" &&
        <Text style = {styles.text}>{props.correctChoiceObj.city}</Text>
        }
        {props.correctChoiceObj.region !== "" &&
        <Text style = {styles.text}>{props.correctChoiceObj.region}</Text>
        }
        <Text style = {styles.text}>{props.correctChoiceObj.country}</Text>
        <View style={styles.buttonContainer}>
          {props.correctChoiceObj.attribute !== "" &&
          <Pressable
            style={styles.button}
            onPress={props.handleLearnMoreButtonPress}
          >
            
            <Text style = {styles.text}>LEARN MORE</Text>
          </Pressable>
          }
          
          <Pressable
            style={styles.button}
            onPress={props.handleNextButtonPress}
          >
            <Text style = {styles.text} >NEXT</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
    backgroundColor: "black",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer: {
      marginTop: 20,
    },
    button: {
      backgroundColor: "#82DB5B",
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
      alignItems: "center",
    },
    text: {
        color: "white",
        alignItems: "center",
        fontSize: 20,

    }
  });
  
  export default CorrectScreen;