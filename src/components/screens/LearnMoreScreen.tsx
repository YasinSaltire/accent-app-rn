import { Pressable, View, Text, StyleSheet } from "react-native";

type LearnMoreScreenProps = {
  handleButtonPress: any;
  correctChoiceObj: any;
};

const LearnMoreScreen = (props: LearnMoreScreenProps) => {
  return (
    <View style={styles.container}>
      {props.correctChoiceObj.city !== "" && (
        <Text style={styles.text}>{props.correctChoiceObj.city}</Text>
      )}
      {props.correctChoiceObj.region !== "" && (
        <Text style={styles.text}>{props.correctChoiceObj.region}</Text>
      )}
      <Text style={styles.text}>{props.correctChoiceObj.country}</Text>
      <View style={{ width: "80%", marginTop: 12}}>
        <Text style={styles.text}>{props.correctChoiceObj.attribute}</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => props.handleButtonPress()}
      >
        <Text style={styles.text}>NEXT</Text>
      </Pressable>
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
    marginTop: 25,
  },
  button: {
    backgroundColor: "#82DB5B",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    color: "white",
    alignItems: "center",
    fontSize: 20,
    textAlign: 'center'
  },
});

export default LearnMoreScreen;
