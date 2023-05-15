import { Pressable, View, Text} from "react-native";

type LearnMoreScreenProps = {
    handleButtonPress: any,
    correctChoiceObj: any,

}

const LearnMoreScreen = (props: LearnMoreScreenProps) =>{

    return(
        <View>
            <Pressable onPress = {() => props.handleButtonPress} >
                <Text> yo
                </Text>
            </Pressable>
        </View>
    )

};

export default LearnMoreScreen