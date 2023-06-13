import { View, Text } from "react-native";
import React from "react";
import { storageKeyStrings } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const addIdsOfChoiceArrayToStorage = async (key: string, value: any) => {
  for (let i = 0; i < value.length; i++) {
    const choiceId: string = value[i].fileID;
    await addValueToArrayInStorage(key, choiceId);
  }
};

const addValueToArrayInStorage = async (key: string, value: any) => {
  // takes a given fileID numbre and adds it to the key-value mapping storing previously
  // visited correct choices
  const storedIds = await AsyncStorage.getItem(key);

  //if value Ids are already stored, append id. Otherwise, create new list
  const updatedIds = storedIds ? [...JSON.parse(storedIds), value] : [value];

  storeData(key, updatedIds);
};

const storeData = async (key: string, value: any) => {
  // creates key-value storage if key has no value, and updates if
  // value exists. Converts to json string regardless of whether value is object or string
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

const readData = async (key: string) => {
  try {
    let data = await AsyncStorage.getItem(key);
    data = data? data: ""

    
    return data !== "" ? JSON.parse(data) : "";
  } catch (e) {
    console.log('wtf')
  }
};

const deleteData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    
  }
};

const addDataToCurrentValue = async (key: string, value: number) => {
  try {
    const data = await AsyncStorage.getItem(key);
    const asyncData = await readData(key)
   
    // stores sum of current and new value if current exists
    //else creates new mapping
    if (data) {

      storeData(key, JSON.parse(data) + Number(value));
    } else {
      storeData(key, value)
    }

  } catch (e) {}
};


const addKeyValueMapping = async (storageKey: string, key: string, value: string) => {
  try{
    deleteData(storageKey)
    
  } catch (e) {

  }
}


export {
  addDataToCurrentValue,
  storeData,
  deleteData,
  readData,
  addValueToArrayInStorage,
  addIdsOfChoiceArrayToStorage,
  addKeyValueMapping,
  
};
