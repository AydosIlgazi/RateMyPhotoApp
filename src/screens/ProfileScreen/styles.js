import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        padding:'10%'
    },
    separator: {

      },
      imageContainer:{
        flexDirection: 'row',
        justifyContent: 'center'
      },
      image: {
        aspectRatio: 13/16,
        resizeMode: 'contain',
        flex: 1,
      },
      textContainer: {
          flexDirection: 'row',
          justifyContent:'space-between'
      },
      date:{
          fontFamily: 'proximaNovaAltRegular',
          alignSelf:'flex-start'
      },
      rate:{
          fontFamily: 'proximaNovaAltRegular',
          
      },
      rateContainer:{
        flexDirection:'row',
          alignContent:'flex-end'
      },
      totalVotes:{
        alignSelf:'flex-end',
        fontFamily:'proximaNovaAltThinItalic'
      }
  });