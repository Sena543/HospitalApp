import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Purpose from './booking/Purpose'

function Booking() {
    const appointmentList = [
        {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
        {appTime:"8:00", doctorName:"Dr. Michael Frimpong", duration:"8:00-9:00"},
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

                </View>
                <ScrollView>
                {
                    (appointmentList || []).map(({appTime, doctorName, duration}: {appTime:String, doctorName:String, duration:String})=>{
                        return <AvailabeAppointments appTime={appTime} doctorName={doctorName} duration={duration}/>
                    })
                }
                </ScrollView>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text:{fontSize:20, fontStyle:"normal", fontWeight:"bold", marginRight:20}
})

export default Booking
