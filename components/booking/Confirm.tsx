import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';

function Confirm({doctorName, time, showModal, setShowModal}:{doctorName:String, time:String, showModal:Boolean, setShowModal:Function}) {
    return (
        <View style={styles.modalView}>
          <View style={{}}>
              <Text style={{fontSize:20, fontWeight:"bold", fontStyle:'normal', textDecorationLine:"underline"}}>Confirm Appointment</Text>
          </View>
          <View style={{marginTop:20}}>
              <Text>Confirm appointment with Dr. {doctorName} at {time}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:25}}>
              <Button
              title="Cancel"
              color='#FF0000'
              onPress={()=>{setShowModal(!showModal)}}
              />
              <Button
              title="Confirm Appointment"

              onPress={()=>{setShowModal(!showModal)}}
            //   color='#FF0000'
              />
          </View>
        </View>
    )
}

export default Confirm


const styles = StyleSheet.create({
    modalView: {
        position:"relative",
        top:"30%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: "center",
        height:"30%"
  },
})