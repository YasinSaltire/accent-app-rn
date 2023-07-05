import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  ImageBackground,
  Image,
  LayoutChangeEvent,
  Dimensions,
  TextInput,
} from "react-native";
import stringConstants, {
  GameScreens,
  storageKeyStrings,
} from "../../constants/constants";
import * as React from "react";
import { useEffect, useState, } from "react";
import { Audio } from "expo-av";
import generateAccentString from "../../util/generateAccentString";
import generateAudioLink from "../../util/generateAudioLink";
import geoToMercator from "../../util/geoToMercator";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlay, faStop, faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import { readData } from "../../util/AsyncStorage/storeChoice";
import * as Device from "expo-device";
import CustomModal from "../CustomModal";

const playScreenWrapperStyles = () => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: "black",
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
  });
  return style.default;
};

const feedbackModalStyles = (deviceType: Device.DeviceType) => {
  const style = StyleSheet.create({
    default: {
      alignSelf: "center",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    web: {
      alignSelf: "center",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "35%",
    },
  });
  return deviceType == Device.DeviceType.DESKTOP ? style.web : style.default;
};

const playScreenStyles = (deviceType: Device.DeviceType) => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: "black",
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    web: {
      backgroundColor: "black",
      height: "100%",
      width: "35%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
  });
  return deviceType == Device.DeviceType.DESKTOP ? style.web : style.default;
};

const buttonStyle = (color: string) => {
  const style = StyleSheet.create({
    default: {
      backgroundColor: color,
      //padding: 15,
      borderRadius: 8,
      width: "45%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return style.default;
};

const buttonContainerStyle = () => {
  const style = StyleSheet.create({
    default: {
      flexDirection: "row",
      borderWidth: 0,
      marginBottom: 15,
      marginTop: 15,
      width: "90%",
      height: "12%",
      justifyContent: "space-between",
    },
  });
  return style.default;
};

const textContainerStyle = () => {
  const style = StyleSheet.create({
    default: {
      color: "white",
      textAlign: "center",
    },
  });
  return style.default;
};

//`${left / windowWidth * 100.0}%`
//`${bottom / windowHeight * 100.0}%`
type QuestionStruct = {
  id: number;
  value: string;
  answer: QuestionStruct;
};

type GameScreenProps = {
  handleAnswerSelection: any;
  correctChoiceObj: any;
  allIncorrect?: any;
  currentQuestionIndex?: any;
  correctlyAnswered?: number;
  correctButtonIndex: number;
  currentRoundScore: number;
};

const GameScreen = (props: GameScreenProps) => {
  const {
    handleAnswerSelection,
    allIncorrect,
    correctChoiceObj,
    currentQuestionIndex,
    correctButtonIndex,
    correctlyAnswered,
    currentRoundScore,
  } = props;
  console.log("button index", correctButtonIndex);

  
  const indexOfFirstIncorrectChoice = currentQuestionIndex * 3;
  let buttonChoiceArray: any = [];
  buttonChoiceArray.push(allIncorrect[indexOfFirstIncorrectChoice]);
  buttonChoiceArray.push(allIncorrect[indexOfFirstIncorrectChoice + 1]);
  buttonChoiceArray.push(allIncorrect[indexOfFirstIncorrectChoice + 2]);
  buttonChoiceArray.splice(correctButtonIndex, 0, correctChoiceObj);

  const [sound, setSound] = useState<Audio.Sound | boolean>(false);
  const [showIncorrectModal, setShowIncorrectModal] = useState(false);
  
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState<string>("")

  const onSubmitFeedback = async() =>{
    const description:string = feedbackText;
    const url:string  = "http://192.168.254.18:3000/api/postFeedback"

    const feedbackData = {
      description: description,
      correctChoiceId: correctChoiceObj.fileID,
      incorrectIdsArray: buttonChoiceArray.map((accent: any) => accent.fileID)
    }
    console.log(feedbackData)

    try{
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
      })

      if (response.ok) {
        setShowFeedbackModal(false)
        setFeedbackText("") 
      }else{
        throw new Error('error sending feedback')
      }


    } catch (error){
      console.error(error)
    }
    
  }

  const [disabledButtonsArray, setDisabledButtonsArray] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const [deviceType, setDeviceType] = useState<Device.DeviceType>(
    Device.DeviceType.UNKNOWN
  );
    
  //map variables

  let [projectionCoordinates, setProjectionCoordinates] = useState<number[][]>(
    Array(4).fill([0, 0])
  );

  

  let [windowWidth, setWindowWidth] = useState<number>(
    Dimensions.get("window").width * 0.97
  );


  useEffect(() => {
    // wrap follownig 3 async storage calls in async to await


    const projectCoordinates = async () => {
      //calculates geotomercator coordinates

      //synchronous non-state variable to hold mapwidth and update changes synchronously
      let mapWidth: number = windowWidth;

      // create new 2d array, where each lat long gets mapped to mercator using geoToMercator
      const choicesCoordinatesArray: number[][] = await Promise.all(
        buttonChoiceArray.map(async (accent: any) =>
          geoToMercator(accent.latitude, accent.longitude)
        )
      );

      //scales mapWidth according to window size. If device is desktop, mapWidth steps into if statement as the entire windw width and not map width
      const deviceType = await Device.getDeviceTypeAsync();
      if (deviceType == Device.DeviceType.DESKTOP) {
        mapWidth = mapWidth * 0.35;
        //update state so styles can update accordingly
        setWindowWidth(mapWidth);
      }

      //geoToMercator generates raw pixel values on the original 2917 pixel wide map. Calculate ratio to scale to current map size
      const ratio = mapWidth / 2917.0;

      //apply ratio to all coordinates. Ratio applies to height value because width and height scale accordngly (aspect ratio maintained)
      const scaledChoicesCoordinatesArray = choicesCoordinatesArray.map(
        (coordinate: any) => [coordinate[0] * ratio, coordinate[1] * ratio]
      );
      //set state so that projected and scaled coords render on screen
      setProjectionCoordinates(scaledChoicesCoordinatesArray);
    };

    const getDeviceType = async () => {
      const type = await Device.getDeviceTypeAsync();
      setDeviceType(type);
    };

  
    getDeviceType();

    //set map coordiantes
    projectCoordinates();

   

    //get device type and set state
    getDeviceType();
    console.log();
  }, [correctChoiceObj]);

  const displayModalIfWrongChoiceSelected = (id: number) => {
    if (id !== correctChoiceObj.fileID) {
      setShowIncorrectModal(true);
    }
  };

  const disableButton = (buttonIndex: number) => {
    if (buttonIndex !== correctButtonIndex) {
      let newDisabledButtonsArray: boolean[] = [...disabledButtonsArray];
      newDisabledButtonsArray[buttonIndex] = true;
      setDisabledButtonsArray(newDisabledButtonsArray);
    }
  };

  useEffect(() => {
    // const audioUri = ...
    setDisabledButtonsArray([false, false, false, false]);
    const audioUri = generateAudioLink(correctChoiceObj.fileName);
    const loadSound = async () => {
      try {
        const sound = new Audio.Sound();
        await sound.loadAsync({
          uri: audioUri, // audioUri
        });
        setSound(sound);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.isPlaying) {
            setIsAudioPlaying(true);
          } else if (status.isLoaded && status.didJustFinish) {
            console.log("audio finished ,");

            setIsAudioPlaying(false);
          }
        });
        // let status = getIsAudioPlaying(sound);
        // console.log('audio status ', status)
      } catch (error) {
        console.error(error);
      }
    };
    console.log("about to load audio");
    loadSound();

    // clean up the audio when the component unmounts
    return () => {
      if (typeof sound !== "boolean") {
        sound.unloadAsync();
      }
    };
  }, [correctChoiceObj]);

  const handlePlaySound = async () => {
    handleStopSound();
    if (typeof sound !== "boolean") {
      try {
        await sound.playAsync();
        console.log("play sound using ", sound);
        setIsAudioPlaying(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleStopSound = async () => {
    if (typeof sound !== "boolean") {
      try {
        await sound.stopAsync();
        setIsAudioPlaying(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const markerStyle = (projectedCoordinates: number[], windowWidth: number) => {
    const style = StyleSheet.create({
      default: {
        resizeMode: "contain",
        width: "17%",
        height: "17%",
        position: "absolute",
        left: `${(projectedCoordinates[0] / windowWidth) * 100.0}%`,
        bottom: `${(projectedCoordinates[1] / (windowWidth / 1.81)) * 100.0}%`,
        zIndex: 10,
      },
    });
    return style.default;
  };
  return (
    <View nativeID="5" style={playScreenWrapperStyles()}>
      <View style={playScreenStyles(deviceType)}>
        <CustomModal deviceType = {deviceType} showModal = {showIncorrectModal} modalBodyText={'Incorrect!'} modalButtonText = {'Try Again'} onModalButtonPress={() => (function () {setShowIncorrectModal(false)})()}/>
        <Modal transparent={true} visible={showFeedbackModal}>
          <View style={feedbackModalStyles(deviceType)}>
            <View
              style={{
                width: "60%",
                height: "30%",
                backgroundColor: "grey",
                justifyContent: 'space-between'
              }}
            >
              <View
                style = {{flexDirection: 'row', justifyContent: 'space-between'}}>

                  <FontAwesomeIcon
                    size = {25}
                    icon = {faSquareXmark}
                    style = {{color: 'grey'}}
                    
                    />
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "10%",
                    marginTop: '5%',
                    fontSize: 12,
                    alignSelf: 'center'
                  }}
                >
                  {" "}
                  Feedback Form{" "}
                </Text>
                <Pressable
                  onPress = {() => {
                    setFeedbackText("");

                    setShowFeedbackModal(false);}}>
                  <FontAwesomeIcon
                    size = {25}
                    icon = {faSquareXmark}
                    style = {{color: 'white', alignSelf: 'flex-end'}}
                    
                    />
                    

                </Pressable>
              </View>
              
              <View>
                <View
                  style = {{backgroundColor: 'white', marginLeft: '5%', marginRight: '5%'}}
                  >
                  <TextInput
                    multiline
                    numberOfLines = {4}
                    placeholder = '(Optional) Describe problem'
                    value = {feedbackText}
                    onChangeText = {text => setFeedbackText(text)}
                    maxLength = {150}
                    />

                </View>

                <View style= {{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style = {{color: 'white', marginRight: "5%", marginTop: '2%'}}>
                    Character Count: {feedbackText.length} / 150
                  </Text>
                </View>
              </View>
              
              

              <Pressable
                style={{
                  width: "50%",
                  height: "15%",
                  backgroundColor: "#e8791e",
                  alignSelf: "center",
                  justifyContent: 'center',
                  marginBottom: '5%'
                }}
                onPress={() => onSubmitFeedback()}
              >
                <Text style={{ color: "white", alignSelf: "center", textAlignVertical: 'center'}}>
                  Submit
                </Text>
                
              </Pressable>
            </View>
          </View>
        </Modal>

        <Text style={{ color: "white", marginBottom: "2%" }}>
          {" "}
          Question {currentQuestionIndex + 1} / 10{" "}
        </Text>

        <Pressable
          onPress={
            isAudioPlaying ? () => handleStopSound() : () => handlePlaySound()
          }
        >
          <FontAwesomeIcon
            size={75}
            icon={isAudioPlaying ? faStop : faPlay}
            style={{ color: "#ffffff" }}
          />
        </Pressable>

        <View style={buttonContainerStyle()}>
          <Pressable
            style={
              disabledButtonsArray[0]
                ? buttonStyle("grey")
                : buttonStyle("#36BAF3")
            }
            onPress={() => {
              handleAnswerSelection(buttonChoiceArray[0].fileID);
              handleStopSound();
              displayModalIfWrongChoiceSelected(buttonChoiceArray[0].fileID);
              disableButton(0);
            }}
            disabled={disabledButtonsArray[0]}
          >
            <Text style={textContainerStyle()}>
              {generateAccentString(buttonChoiceArray[0])}
            </Text>
          </Pressable>

          <Pressable
            style={
              disabledButtonsArray[1]
                ? buttonStyle("grey")
                : buttonStyle("#e8bd12")
            }
            onPress={() => {
              handleAnswerSelection(buttonChoiceArray[1].fileID);
              handleStopSound();
              displayModalIfWrongChoiceSelected(buttonChoiceArray[1].fileID);
              disableButton(1);
            }}
          >
            <Text style={textContainerStyle()}>
              {generateAccentString(buttonChoiceArray[1])}
            </Text>
          </Pressable>
        </View>

        <View
          nativeID="map-wrapper"
          style={{
            position: "relative",
            borderWidth: 0,
            width: "97%",
            aspectRatio: 1.81,
            justifyContent: "center",
            borderColor: "white",
          }}
        >
          <Image
            style={{ resizeMode: "contain", width: "100%", height: "100%" }}
            source={require("../../../assets/map.png")}
          />

          <Image
            nativeID="blue-pin"
            style={markerStyle(projectionCoordinates[0], windowWidth)}
            source={require("../../../assets/blue_sliderDown.png")}
          />
          <Image
            nativeID="yellow-pin"
            style={markerStyle(projectionCoordinates[1], windowWidth)}
            source={require("../../../assets/yellow_sliderDown.png")}
          />
          <Image
            nativeID="green-pin"
            style={markerStyle(projectionCoordinates[2], windowWidth)}
            source={require("../../../assets/green_sliderDown.png")}
          />
          <Image
            nativeID="red-pin"
            style={markerStyle(projectionCoordinates[3], windowWidth)}
            source={require("../../../assets/red_sliderDown.png")}
          />
        </View>

        <View style={buttonContainerStyle()}>
          <Pressable
            style={
              disabledButtonsArray[2]
                ? buttonStyle("grey")
                : buttonStyle("#82DB5B")
            }
            onPress={() => {
              handleAnswerSelection(buttonChoiceArray[2].fileID);
              handleStopSound();
              displayModalIfWrongChoiceSelected(buttonChoiceArray[2].fileID);
              disableButton(2);
            }}
          >
            <Text style={textContainerStyle()}>
              {generateAccentString(buttonChoiceArray[2])}
            </Text>
          </Pressable>

          <Pressable
            style={
              disabledButtonsArray[3]
                ? buttonStyle("grey")
                : buttonStyle("#e8791e")
            }
            onPress={() => {
              handleAnswerSelection(buttonChoiceArray[3].fileID);
              handleStopSound();
              displayModalIfWrongChoiceSelected(buttonChoiceArray[3].fileID);
              disableButton(3);
            }}
          >
            <Text style={textContainerStyle()}>
              {generateAccentString(buttonChoiceArray[3])}
            </Text>
          </Pressable>
        </View>

        <Pressable
          style = {{}}
          onPress = {() => {setShowFeedbackModal(true); handleStopSound()}}
        >
          <View
            style = {{backgroundColor: 'grey', justifyContent: 'center', borderRadius: 5}}>
            <Text style = {{color: 'white', margin: '1%', alignSelf: 'center'}}>
              Submit feedback
            </Text>
          </View>
          
          
        </Pressable>

      </View>
    </View>
  );
};

export default GameScreen;

export { QuestionStruct };
