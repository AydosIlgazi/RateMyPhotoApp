import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, UploadScreen } from './src/screens'
import  BottomTabs  from './src/components/BottomTabs'
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { getHeaderTitle } from './src/helpers/ScreenTitleHelper'
import { useFonts } from "@use-expo/font";
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();
const customFonts = {
  proximaNovaRegular :  require("./assets/ProximaNovaRegular.otf"),
  proximaNovaAltRegular: require("./assets/ProximaNovaAltRegular.otf"),
  proximaNovaAltLightItalic: require("./assets/ProximaNovaAltLightItalic.otf"),
  proximaNovaAltRegularItalic : require("./assets/ProximaNovaAltRegularItalic.otf"),
  proximaNovaAltThinItalic : require("./assets/ProximaNovaAltThinItalic.otf"),
};
export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isFontsLoaded] = useFonts(customFonts);
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])


  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);


  if (loading || !isFontsLoaded) {
    return (
      <></>
    )
  }
  return (
      <NavigationContainer>
        <Stack.Navigator>
          { user ? (
            <Stack.Screen name="BottomTabs" component={BottomTabs} options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            })} initialParams={{userId:user.id}} >
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
              <Stack.Screen name="BottomTabs" component={BottomTabs} />
            </>
          )}
          <Stack.Screen name="Upload" component={UploadScreen}/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
