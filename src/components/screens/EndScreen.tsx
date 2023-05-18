import { Pressable, View, Text, StyleSheet } from "react-native";
import generateAccentString from "../../util/generateAccentString";


type EndScreenProps = {
  flawlessChoices: number,
  handleButtonPress: any
};

const EndScreen = (props: EndScreenProps) => {
  return (
    <View>
        <Pressable onPress = {() => props.handleButtonPress()}>
            <Text> End game </Text>
        </Pressable>
    </View>
    
  );
};



export default EndScreen;
