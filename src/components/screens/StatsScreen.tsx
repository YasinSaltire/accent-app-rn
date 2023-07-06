import { Pressable, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { readData } from "../../util/AsyncStorage/storeChoice";
import { storageKeyStrings } from "../../constants/constants";

type StatScreenProps = {
  handleGoToHome: any;
};

const StatsScreen = (props: StatScreenProps) => {
  const { handleGoToHome } = props;
  let [numberOfQuestionsPlayed, setNumberOfQuestionsPlayed] =
    useState<string>("");
  let [numberCorrectFirstChoice, setNumberCorrectFirstChoice] =
    useState<string>("");
  let [correctPercentage, setCorrectPercentage] = useState<number>(0);

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
