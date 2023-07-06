import { Pressable, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { readData } from "../../util/AsyncStorage/storeChoice";
import {
  LOCAL_STORAGE_KEYS,
  STRING_CONSTANTS,
  NUMBER_CONSTANTS,
} from "../../constants/constants";

type StatScreenProps = {
  handleGoToHome: any;
};

const StatsScreen = (props: StatScreenProps) => {
  const { handleGoToHome } = props;
  const { EMPTY_STRING } = STRING_CONSTANTS;
  const { INIT_SCORE_PERCENTAGE } = NUMBER_CONSTANTS;

  let [numberOfQuestionsPlayed, setNumberOfQuestionsPlayed] =
    useState<string>(EMPTY_STRING);
  let [numberCorrectFirstChoice, setNumberCorrectFirstChoice] =
    useState<string>(EMPTY_STRING);
  let [correctPercentage, setCorrectPercentage] = useState<number>(
    INIT_SCORE_PERCENTAGE
  );

  useEffect(() => {
    const getTotalQuestions = async (key: string) => {
      const data = await readData(key);
      setNumberOfQuestionsPlayed(data);
      return await readData(key);
    };
    const getTotalCorrectFirstAttempt = async (key: string) => {
      const data = await readData(key);
      setNumberCorrectFirstChoice(data);
      return await readData(key);
    };
    const calculateCorrectPercentage = async () => {
      const total = await getTotalQuestions(
        LOCAL_STORAGE_KEYS.questionsPlayedKey
      );
      const correct = await getTotalCorrectFirstAttempt(
        LOCAL_STORAGE_KEYS.firstChoiceCorrectScoreKey
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
      <Text style={{ marginTop: "5%", marginBottom: "5%", color: "white" }}>
        Lifetime questions answered: {numberOfQuestionsPlayed}{" "}
      </Text>
      <Text style={{ marginBottom: "5%", color: "white" }}>
        Total correct first attempts: {numberCorrectFirstChoice}{" "}
      </Text>

      <Text style={{ marginBottom: "10%", color: "white" }}>
        First attempt correct rate:{" "}
        {correctPercentage ? correctPercentage : "-"}%{" "}
      </Text>
      <Pressable
        style={{
          marginTop: "10%",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "#82DB5B",
          width: "80%",
          height: "10%",
        }}
        onPress={() => handleGoToHome()}
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

export default StatsScreen;
