import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, Alert, StyleSheet, SafeAreaView, Modal, ScrollView, TouchableOpacity } from 'react-native'
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Confirm from './booking/Confirm'
import Purpose from './booking/Purpose'

function Booking() {
    const [showModal, setShowModal] = useState(false)
    const appointmentList = [
        {appTime:"1:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"2:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"3:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"4:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"5:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        // {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        // {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"9:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"10:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
]

    const AvailabeAppointments = ({appTime, doctorName, duration}: {appTime:String, doctorName:String, duration:String})=>{
        return(
         <View style={{flex:1, flexDirection:"row", marginTop:10}}>
                    <Text style={{color:"#B5B7BB"}}>{appTime}</Text>
                    <View style={{flexDirection:'row', flex:1}}>
                        <View style={{marginBottom:10, backgroundColor:'#E9E9FF', marginLeft:40, width:30, borderRadius:5, alignItems:"center", justifyContent:'flex-end'}}>
                            <Ionicons name="refresh-circle-outline" color="red" size={15}/>
                        </View>
                        <View>
                            <Text style={{marginBottom:20, marginLeft:10, fontWeight:'bold', fontSize:15, color:"#000000"}}>{doctorName}</Text>
                            <Text style={{marginLeft:10}}>{duration}</Text>
                        </View>
                    </View>
                </View>
    )};


        return (
            <SafeAreaView>
                <View style={{flex:1, flexDirection:"row", marginBottom:20}}>
                    <Text style={styles.text}>Time</Text>
                    <Text style={styles.text}>Available Doctors</Text>
                </View>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <Ionicons name="radio-button-on-outline" size={10} color="#FF0000" style={{marginTop:3, marginRight:5}}/>
                        <Text >Full Booked</Text>
                    </View>
                     <View style={{flex:1, flexDirection:'row'}}>
                        <Ionicons name="radio-button-on-outline" size={10} color="#FF6F00" style={{marginTop:3, marginRight:5}}/>
                        <Text >Almost Full</Text>
                    </View>
                     <View style={{flex:1, flexDirection:'row', marginLeft:10}}>
                        <Ionicons name="radio-button-on-outline" size={10} color="#23FF1B" style={{marginTop:3, marginRight:5}}/>
                        <Text >Available</Text>
                    </View>
                </View>
                <ScrollView>
                {
                    (appointmentList || []).map(({appTime, doctorName, duration}: {appTime:String, doctorName:String, duration:String})=>{
                        return (
                            <>
                            <TouchableOpacity
                            onPress={()=> {setShowModal(true)}}
                            >
                                <AvailabeAppointments appTime={appTime} doctorName={doctorName} duration={duration}/>
                            </TouchableOpacity>
                             <Modal
                                animationType="slide"
                                transparent={true}
                                visible={showModal}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                 }}
                                >
                        <Confirm doctorName={doctorName} time={appTime} showModal={showModal} setShowModal={setShowModal}/>
                  </Modal>
                            </>
                            )
                    })
                }
                </ScrollView>

            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text:{fontSize:20, fontStyle:"normal", fontWeight:"bold", marginRight:20},
})

export default Booking
