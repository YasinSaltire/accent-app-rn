
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import * as Device from 'expo-device';

type modalProps ={
    deviceType: Device.DeviceType;
    showModal: boolean;
    modalBodyText: String;
    modalButtonText: String;
    onModalButtonPress: any
}

const modalStyles = (deviceType: Device.DeviceType) => {
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
    return deviceType != Device.DeviceType.DESKTOP ? style.default : style.web;
  };
  

const CustomModal = (props: modalProps) => {
  const {
    deviceType,
    showModal,
    modalBodyText,
    modalButtonText,
    onModalButtonPress,
  } = props;
  return (
    <View>
      <Modal transparent={true} visible={showModal}>
          <View style={modalStyles(deviceType)}>
            <View
              style={{
                width: "60%",
                height: "20%",
                backgroundColor: "black",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  alignSelf: "center",
                  marginBottom: "10%",
                  fontSize: 20,
                }}
              >
                {" "}
                {modalBodyText}{" "}
              </Text>

              <Pressable
                style={{
                  width: "50%",
                  height: "30%",
                  backgroundColor: "#e8791e",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
                onPress={() => onModalButtonPress()}
              >
                <Text style={{ color: "white", alignSelf: "center" }}>
                  {modalButtonText}
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
    </View>
    
  )
}

export default CustomModal