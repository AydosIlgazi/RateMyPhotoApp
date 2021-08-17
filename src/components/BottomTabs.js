import React,{ useEffect, useState } from 'react';
import { ProfileScreen, HomeScreen } from '../screens'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs({route, navigation}) {

    const {userId} = route.params;

    
    return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} initialParams={{userId:userId}} >
        </Tab.Screen>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }} initialParams={{userId:userId}}/>
    </Tab.Navigator>
    );
  }