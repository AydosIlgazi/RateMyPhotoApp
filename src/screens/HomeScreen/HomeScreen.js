import React, { useEffect, useState, useRef } from 'react'
import { Button, Animated, Text, Image, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { MaterialIcons,FontAwesome } from '@expo/vector-icons';
import { pickImage } from '../../helpers/ImagePickerHelper';
import Slider from "react-native-slider";
import { useIsFocused } from '@react-navigation/native'

const miniPhotoIcons = [
    {
        id:1,
        color:'red',
        x:0,
        y:0,
    },
    {
        id:2,
        color:'orange',
        x:0,
        y:0,
    },
    {
        id:3,
        color:'yellow',
        x:0,
        y:0,
    },
    {
        id:4,
        color:'green',
        x:0,
        y:0,
    },
    {
        id:5,
        color:'blue',
        x:0,
        y:0,
    },
    {
        id:6,
        color:'purple',
        x:0,
        y:0,
    },
]

const rateIcons = [
    require("../../../assets/one.png"),
    require("../../../assets/two.png"),
    require("../../../assets/three.png"),
    require("../../../assets/four.png"),
    require("../../../assets/five.png"),
    require("../../../assets/six.png"),
    require("../../../assets/seven.png"),
    require("../../../assets/eight.png"),
    require("../../../assets/nine.png"),
    require("../../../assets/best.png"),
]

export default function HomeScreen({navigation,route}) {

    const [currentPost, setCurrentPost] = useState(null);
    const [rate, setRate] = useState(5);
    const rateablePostsRef =  useRef();
    const [currentIcon,setCurrentIcon] = useState(rateIcons[4]);
    const [currentShareCounter,setCurrentShareCounter]= useState(0);
    const [totalShareable, setTotalShareable] = useState(0);
    const isFocused = useIsFocused()

    const {userId} = route.params;
    const postsRef = firebase.firestore().collection('posts');
    const postRef = firebase.firestore().collectionGroup('post');
    const userRef = firebase.firestore().collection('users').doc(userId);

    const size = 40 ;
    const symbolSize = 20;
    const radius = size / 2;
    const center = radius;
    
    useEffect(() => {
        handleMiniIconCoordinates(); 
        loadRateablePosts();


    }, [])

    useEffect(() => {

        userRef.get().then(documentSnapshot => {
            if (documentSnapshot.exists) {
              const user = documentSnapshot.data();
              setCurrentShareCounter(user.currentShareCounter);
              setTotalShareable(user.totalShareable);
            }
          });

    },[isFocused])
    
    const loadRateablePosts = () => {
        const tempPosts = []
        postRef
        //.where("isActive", "==", true)
        .orderBy("totalVotes","asc")
        .limit(15)
        .get()
        .then((querySnapshot) => {
            let itemsProcessed = 0;
            querySnapshot.forEach((doc) => {
                doc.ref.collection("ratedBy").doc(userId).get()
                .then((ratedByDoc) =>{
                    itemsProcessed++;
                    if(!ratedByDoc.exists){
                        if(doc.ref.parent.parent.id != userId){
                            tempPosts.push({...doc.data(),
                                userId: doc.ref.parent.parent.id,
                                postId: doc.id});     
                        }
                    }
                    if(itemsProcessed === querySnapshot.size) {
                        if(tempPosts.length>0){
                            rateablePostsRef.current = tempPosts;
                            updateCurrentPost();
                        }

                    }    
                })

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
    }

    const updateCurrentPost =  () => {
        
        if(rateablePostsRef.current.length<1){
            loadRateablePosts();
        }
        let index = Math.floor(Math.random()*rateablePostsRef.current.length);
        const post = rateablePostsRef.current[index];
        setCurrentPost(post);
        rateablePostsRef.current.splice(index,1);
    }

    const onAddButtonPress= (userId, navigation) =>{
        if(totalShareable>0){
            pickImage(userId,navigation)
        }
        else{
            const message = "You need to rate " + (7-currentShareCounter).toString()+" more photos before sharing"
            alert(message)
        }
    }

    const onNextButtonPress = () => {
        updateCurrentPost();
        //for test
        handleShareCounter();
    }

    const onRateButtonPress = () => {
        postsRef
        .doc(currentPost.userId)
        .collection("post")
        .doc(currentPost.postId)
        .update({
            "photo.rate" : increment(rate),
            totalVotes: increment(1)
        })

        postsRef
        .doc(currentPost.userId)
        .collection("post")
        .doc(currentPost.postId)
        .collection("ratedBy")
        .doc(userId).set({});

        updateCurrentPost();
        handleShareCounter();

    }

    const increment = (i) => {
        return firebase.firestore.FieldValue.increment(Number(i));
    }

    const handleSliderChange = (x) =>{
        setRate(x);
        setCurrentIcon(rateIcons[x-1]);
    }

    const renderMiniIcons = (n) =>{
        var icons = [];
        let i=0;
        for(i =0; i < n; i++){
            icons.push(<View style={{left: miniPhotoIcons[i].x,
                top: miniPhotoIcons[i].y ,
                position:'absolute'}} key={i}><FontAwesome  name="star" size={25} color={miniPhotoIcons[i].color} /></View>);
        }
        return icons;
    }

    const degToRad=(deg)=>{
        return deg * Math.PI / 180;
    }

    const handleMiniIconCoordinates= ()=>{
        for(let i=0;i<miniPhotoIcons.length;i++){
            const angleRad = degToRad(i*60);
            const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
            const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
            miniPhotoIcons[i].x = x;
            miniPhotoIcons[i].y = y;
        }
    }

    const handleShareCounter = () =>{
        if(currentShareCounter <=5){
            userRef.update({
                "currentShareCounter": increment(1)
            })
            setCurrentShareCounter(currentShareCounter => currentShareCounter + 1);
        }
        else{
            userRef.update({
                "currentShareCounter": 0
            })
            userRef.update({
                "totalShareable": increment(1)
            })
            setCurrentShareCounter(0);
            setTotalShareable(totalShareable=> totalShareable+1)
        }
    }

    return (

        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <View style={styles.miniIconContainer}>
                    {renderMiniIcons(currentShareCounter)}
                </View>
                <View style={styles.addContainer}>
                    <TouchableOpacity style={styles.icon} onPress={()=>onAddButtonPress(userId,navigation)}  >
                        <MaterialIcons name="add-a-photo" size={50} color={'#658EEB'} />
                        <Text style={styles.totalShareableText}>{totalShareable}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.rateContainer}>
                <View style={styles.imageContainer} >
                    {currentPost!=null && <Image source={{ uri: currentPost.photo.source }} style={styles.image} />}
                </View>
                <View style={styles.sliderContainer}>
                    <Slider
                        minimumValue={1}
                        maximumValue={10}
                        step={1}
                        minimumTrackTintColor='#658EEB'
                        maximumTrackTintColor='#d3d3d3'
                        trackStyle={styles.track}
                        thumbStyle= {styles.thumb}
                        value={rate}
                        onValueChange={value => handleSliderChange(value)}
                        thumbImage = {currentIcon}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={{flex:0.2}}></View>
                    <View style={{flex:0.5}}><TouchableOpacity style={styles.button} onPress={onNextButtonPress}><Text style={styles.buttonText}>Next</Text></TouchableOpacity></View>
                    <View style={{flex:0.2}}></View>
                    <View style={{flex:0.5}}><TouchableOpacity style={styles.button} onPress={onRateButtonPress}><Text style={styles.buttonText}>Rate</Text></TouchableOpacity></View>
                    <View style={{flex:0.2}}></View>
                </View>
            </View>
        </View>
    )
}