import { Pressable, View, Text, StyleSheet } from "react-native";
import scoreRound from "../../util/scoreRound";
import { readData } from "../../util/AsyncStorage/storeChoice";
import stringConstants, {
  NUMBER_CONSTANTS,
  storageKeyStrings,
} from "../../constants/constants";
import { useEffect, useState } from "react";

type EndScreenProps = {
  selections: number[][];
  correctChoices: any;
  handleButtonPress: any;
};

const EndScreen = (props: EndScreenProps) => {
  const score = scoreRound(props.selections, props.correctChoices);
  let [numberOfQuestionsPlayed, setNumberOfQuestionsPlayed] = useState<string>(
    stringConstants.EMPTY_STRING
  );
  let [numberCorrectFirstChoice, setNumberCorrectFirstChoice] =
    useState<string>(stringConstants.EMPTY_STRING);
  let [correctPercentage, setCorrectPercentage] = useState<number>(
    NUMBER_CONSTANTS.INIT_SCORE_PERCENTAGE
  );

  useEffect(() => {
    const getTotalQuestions = async (key: string) => {
      const data = await readData(key);
      setNumberOfQuestionsPlayed(data);
      return data;
    };
    const getTotalCorrectFirstAttempt = async (key: string) => {
      const data = await readData(key);
      setNumberCorrectFirstChoice(data);
      return data;
    };
    const calculateCorrectPercentage = async () => {
      const total = await getTotalQuestions(
        storageKeyStrings.questionsPlayedKey
      );
      const correct = await getTotalCorrectFirstAttempt(
        storageKeyStrings.firstChoiceCorrectScoreKey
      );
      const correctRate = Math.floor(
        (parseFloat(correct) / parseFloat(total)) * 100
      );
      setCorrectPercentage(correctRate);
    };

    calculateCorrectPercentage();
  }, []);

  return (
    <View style={playScreenStyles("black")}>
      {score === 10 && (
        <View>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 50,
              fontSize: 20,
              color: "white",
            }}
          >
            Great Job! You completed a perfect round and answered all questions
            correct on the first try.
          </Text>
        </View>
      )}
      {score < 10 && (
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 50,
              fontSize: 20,
              color: "white",
            }}
          >
            Great Job! You Completed a Round.
          </Text>
          <View style={{ width: "80%" }}>
            <Text
              style={{
                textAlign: "center",
                alignSelf: "center",
                fontSize: 20,
                color: "white",
              }}
            >
              You answered {score} questions correct on the first try
            </Text>
          </View>
        </View>
      )}
      <Text style={{ color: "white" }}>
        {" "}
        Correctly Answered Questions on First Try: {score + "/" + 10}
      </Text>
      <Text style={{ color: "white" }}>
        Total correct: {numberOfQuestionsPlayed}{" "}
      </Text>
      <Text style={{ color: "white" }}>
        Correct first attempts: {numberCorrectFirstChoice}{" "}
      </Text>

      <Text style={{ color: "white" }}>
        total correct rate: {correctPercentage ? correctPercentage : "-"}%{" "}
      </Text>
      <Pressable
        style={{
          marginTop: "30%",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "#82DB5B",
          width: "80%",
          height: "10%",
        }}
        onPress={() => props.handleButtonPress()}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{ fontSize: 30, color: "white" }}
        >
          {" "}
          Return to Main Menu{" "}
        </Text>
      </Pressable>
    </View>
  );
};

const playScreenStyles = (color: string) => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: color,
      alignItems: "center",
      flexDirection: "column",
      flex: 1,
      justifyContent: "center",
    },
  });
  return style.default;
};

export default EndScreen;
