import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';




export const pickImage = async (userId, navigation)=> {

    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        }
    }


    let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [13, 16],
          quality: 1,
        });
        
    if (!result.cancelled) {
        navigation.navigate('Upload', {userId: userId, image: result.uri});
    }
    else{
        alert("Error occured on uploading");
    }
}