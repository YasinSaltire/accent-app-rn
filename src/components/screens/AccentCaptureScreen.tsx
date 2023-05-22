import { View, StyleSheet, Pressable, Text, TextInput } from "react-native";
import CheckBox from 'expo-checkbox';

const accentCaptureScreenStyles = (color: string = "white") => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: color,
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return style.default;
};

const AccentCaptureScreen = () => {
  return (
    <View style={accentCaptureScreenStyles()}>
      <Text>Speech Capture</Text>
      <Text>Placeholder for dropdowns</Text>
      <Text>Placeholder for randomly generated question</Text>
      <Text>Placeholder mic icon</Text>
      <Text>Age:</Text>
      <TextInput placeholder="useless placeholder" keyboardType="numeric" />
      <Text>What is your email address? (To get a free copy of the app)</Text>
      <TextInput placeholder="email" />
      <Text>
        Where is your accent from? (sometimes the same as where are you from,
        sometimes not!)
      </Text>
      <TextInput placeholder="City" />
      <TextInput placeholder="State" />
      <TextInput placeholder="Country" />
      <TextInput placeholder="Region" />
      <Text>Are there any things you think have affected your accent? (school, travel, moving, etc)</Text>
      <TextInput placeholder="Things that may have affected accent" />
      <CheckBox disabled={false} value={true}  />
    </View>
  );
};

export default AccentCaptureScreen;
