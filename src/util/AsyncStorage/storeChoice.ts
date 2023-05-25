import { View, Text } from "react-native";
import React from "react";
import { storageKeyStrings } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const addIdsOfChoiceArrayToStorage = async(key: string, value: any) =>{
  for (let i = 0; i<value.length; i++) {
    const choiceId: string = value[i].fileID
    console.log('id being added to storage ', choiceId)
    await addValueToArrayInStorage(key, choiceId)
  }
}

const addValueToArrayInStorage = async (key: string, value: any) => {
// takes a given fileID numbre and adds it to the key-value mapping storing previously
// visited correct choices
    const storedIds =  await AsyncStorage.getItem(key)
  
    //if value Ids are already stored, append id. Otherwise, create new list
    const updatedIds = storedIds ? [...(JSON.parse(storedIds)), value] : [value];
    console.log('stored ids', storedIds)
    console.log('updated ids ', updatedIds)
    storeData(key, updatedIds)

  
};


const storeData = async (key: string, value: any) => {
  // creates key-value storage if key has no value, and updates if 
  //value exists. Converts to json string regardless of whether value is object or string
  // 
  try{
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (e){
    console.log(e)
  } 
}

const readData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key)
    return data != null? JSON.parse(data) : null;
  } catch(e) {

  }
}


const deleteData = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {

  }
}

export {storeData, deleteData, readData, addValueToArrayInStorage, addIdsOfChoiceArrayToStorage} ;
