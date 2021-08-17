import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, SafeAreaView, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';


export default function ProfileScreen({navigation, route}){
    const _isMounted = useRef(true); 
    const [userPosts, setUserPosts] = useState([]);
    const {userId} = route.params;
    const flatListRef = useRef(null); 

    const toTop = () => {
        // use current
        if(flatListRef!= null && flatListRef.current !=null && flatListRef.current.scrollToOffset != null){
            flatListRef.current.scrollToOffset({ animated: false, offset: 0 });

        }
    }

    useEffect(() => {
        getData();
        return () => { 
            _isMounted.current = false;
        }
    }, [])

    const getData = () => {
        firebase.firestore().collection('posts').doc(userId).collection('post').orderBy('postDate','desc').onSnapshot(
        querySnapshot => {
            if(_isMounted.current){
                const posts = [];
                querySnapshot.forEach(documentSnapshot => {
                    posts.push({...documentSnapshot.data(),
                    key: documentSnapshot.id});
                });
                setUserPosts(posts);
                toTop();
            }
        });
    };


    const dateFormat =(d) =>{
        var dateString = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() ;
        return dateString;
    }
  
    const renderItem = ({item}) => {
    return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.photo.source }} style={styles.image}  />
                </View>
                <View style={styles.textContainer}>
                        <Text style={styles.date}>{item.postDate.seconds && new Date(item.postDate.seconds * 1000 + item.postDate.nanoseconds/1000000).toDateString()}</Text>
                    <View style={styles.rateContainer}>
                        <AntDesign name="star" color={'blue'} size={15}  />
                        <Text style={styles.rate}> { item.photo.rate ? (item.photo.rate/item.totalVotes).toFixed(1) : 0}</Text>
                    </View>
                </View>
                <Text style={styles.totalVotes}>Total Votes {item.totalVotes}</Text>
            </View>
    )};

    const itemSeperator = () => {
        return (
            <View style={styles.separator}/>
        )};

    return (
    <SafeAreaView style={{flex: 1 }}>
    <FlatList
        ref={flatListRef}
        data={userPosts}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeperator}
        
    />
    </SafeAreaView>

    );

}