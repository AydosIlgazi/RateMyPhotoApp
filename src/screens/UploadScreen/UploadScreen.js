import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, Platform, Text } from 'react-native';
import { firebase } from '../../firebase/config';
import uuid from 'react-native-uuid';
import styles from './styles';
import { pickImage } from '../../helpers/ImagePickerHelper';

export default function ImagePickerExample({route, navigation}) {

    const postRef = firebase.firestore().collection('posts');
    const {userId} = route.params;
    const {image} = route.params;
    const userRef = firebase.firestore().collection('users').doc(userId);

  const approveUploadImage = async () => {
    navigation.navigate('Profile')
    let res = await uploadImage(image);
        //update db
        const photo = {
            source: res,
            rate: 0,
        }

        postRef.doc(userId).collection('post')
        .where("isActive", "==", true)
        .get()
        .then((querySnapshot) =>{
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              isActive:false
            })
          })

          postRef.doc(userId).collection('post').add({
            postDate: firebase.firestore.Timestamp.fromDate(new Date()),
            totalVotes:0,
            isActive: true,
            photo
          })
          .then((res)=>{
              userRef.update({
                "totalShareable": increment(-1)
              })
              
          })
          .catch(error => {
              alert(error);
          });
        })
  };

  async function uploadImage(uri) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
       };
       xhr.onerror = function() {
         reject(new TypeError('Network request failed')); // error occurred, rejecting
       };
       xhr.responseType = 'blob'; // use BlobModule's UriHandler
       xhr.open('GET', uri, true); // fetch the blob from uri in async mode
       xhr.send(null); // no initial data
    });
  
    const imageName = uuid.v4();
    // do something with the blob, eg. upload it to firebase (API v5.6.0 below)
    const ref = firebase
      .storage()
      .ref(imageName);
    const snapshot = await ref.put(blob);
    const remoteUri = await snapshot.ref.getDownloadURL();
  
    // when we're done sending it, close and release the blob
    blob.close();
  
    // return the result, eg. remote URI to the image
    return remoteUri;
  }
  const increment = (i) => {
    return firebase.firestore.FieldValue.increment(Number(i));
}
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer} >
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
        <View style={styles.buttonContainer}>
            <View style={{flex:0.2}}></View>
            <View style={{flex:0.5}}><TouchableOpacity style={styles.button}  onPress={()=>pickImage(userId,navigation)}><Text style={styles.buttonText}>Edit</Text></TouchableOpacity></View>
            <View style={{flex:0.2}}></View>
            <View style={{flex:0.5}}><TouchableOpacity style={styles.button}  onPress={approveUploadImage} ><Text style={styles.buttonText}>Share</Text></TouchableOpacity></View>
            <View style={{flex:0.2}}></View>
        </View>
      
    </View>
  );
}