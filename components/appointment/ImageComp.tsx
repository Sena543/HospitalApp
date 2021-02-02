import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
function ImageComp() {
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image source={require('../../assets/images/moon.jpg')} style={styles.image}/>
                <View style={{marginTop:5,marginLeft:50 }}>
                    <Text style={styles.fontStyle} >Hello, Sandra</Text>
                </View>
                <View>
                    <Text style={styles.fontStyle}>Appointment you have Booked</Text>
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:'center',
    },
    image:{
        marginTop:10,
        marginRight:40,
        width:70,
        height:70,
        borderRadius:50
    },
    imageView:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
    },
    fontStyle:{
        fontSize:16,
        fontStyle:"normal",
        fontWeight:"bold"
    }
})
export default ImageComp
