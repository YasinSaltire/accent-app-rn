import { Pressable, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";

const CustomSvg = () => {
  return (
    <SvgUri
      width="90"
      height="90"
      style={{ marginTop: 0 }}
      uri="https://upload.wikimedia.org/wikipedia/commons/7/7f/Speech_bubble.svg"
    />
  );
};

const TextInBubble = () => {
  return (
    <View>
      <CustomSvg />
    </View>
  );
};

export default TextInBubble;
