import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flexDirection:'column',
      flex: 1,
      
    },

    imageContainer :{
      flex:5,
      alignItems: 'center',
    },
    image:{
      resizeMode: 'contain',
      flex: 1,
      aspectRatio: 1, 
      
    },
    buttonContainer:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignItems:'center',
      paddingBottom:'5%'
    },
    button: {
      backgroundColor:"#34549E",
      borderRadius:20,
      height:40,
      alignItems:'center',
      justifyContent:'center'
      
    },
    buttonText:{
      fontFamily: 'proximaNovaRegular',
      color:'white',
      fontSize:22
    },
    selectButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#8ac6d1',
      alignItems: 'center',
      justifyContent: 'center'
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },

    progressBarContainer: {
      marginTop: 20
    },
    imageBox: {
      width: 300,
      height: 300
    }
  });