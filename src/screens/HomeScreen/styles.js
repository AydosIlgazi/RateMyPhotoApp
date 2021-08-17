import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection:'column',
        flex:1,
    },
    iconContainer:{
        flex:1,
        flexDirection:'row'

    },
    addContainer:{
        alignItems :'flex-end',
        paddingRight: '5%',
        justifyContent:'center',
        flex:1,
    },
    miniIconContainer:{
        flexDirection:'row',
        alignItems:'center',
        flex:5,
        marginLeft:'10%',
        marginTop:'3%',
    },
    
    rateContainer: {
        flex:8,

    },
    imageContainer :{
        flex:8,
        alignItems: 'center',
    },

    image:{
        resizeMode: 'contain',
        flex: 1,
        aspectRatio: 1,  
    },
    
    sliderContainer:{
        flex: 2,
        marginLeft: '5%',
        marginRight: '5%',
        alignItems: "stretch",
        justifyContent: "center",
    },
    slider:{

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
    track: {
        height: 40,
        borderRadius: 2,
        backgroundColor: 'white',
        borderColor: '#EBC365',
        borderWidth: 4,
        borderRadius:10
    },
    thumb: {
        width: 64,
        height: 64,
        shadowColor: 'yellow',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0,
        shadowRadius: 20,
        backgroundColor: 'transparent'
    },
    animTemp: {
        width :25,
        height:25,
        backgroundColor:'green',
    },
    icon:{
        
    },
    totalShareableText:{
        position:'absolute',
        right:3,
        bottom:3,
        color:'#EBC644'
    }

})