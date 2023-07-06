import { Pressable, View, Text, StyleSheet } from "react-native";
import STRING_CONSTANTS, { DISPLAY_STRINGS } from "../../constants/constants";

type CorrectScreenProps = {
  handleNextButtonPress: any;
  handleLearnMoreButtonPress: any;
  correctChoiceObj: any;
};
const CorrectScreen = (props: CorrectScreenProps) => {
  const { LEARN_MORE, NEXT, CORRECT_ANSWER } = DISPLAY_STRINGS;
  const { EMPTY_STRING } = STRING_CONSTANTS;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{CORRECT_ANSWER}</Text>

      {props.correctChoiceObj.city !== EMPTY_STRING && (
        <Text style={styles.text}>{props.correctChoiceObj.city}</Text>
      )}

      {props.correctChoiceObj.region !== EMPTY_STRING && (
        <Text style={styles.text}>{props.correctChoiceObj.region}</Text>
      )}

      <Text style={styles.text}>{props.correctChoiceObj.country}</Text>
      
      <View style={styles.buttonContainer}>
        {props.correctChoiceObj.attribute !== EMPTY_STRING && (
          <Pressable
            style={styles.button}
            onPress={props.handleLearnMoreButtonPress}
          >
            <Text style={styles.text}>{LEARN_MORE}</Text>
          </Pressable>
        )}

        <Pressable style={styles.button} onPress={props.handleNextButtonPress}>
          <Text style={styles.text}>{NEXT}</Text>
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
  },
});

export default CorrectScreen;
