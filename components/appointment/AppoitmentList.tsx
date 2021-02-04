import { Ionicons } from '@expo/vector-icons'
import React, {  useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import AppointmentBubble from './AppointmentBubble'
import {gql, useQuery} from "@apollo/client"

const GETAPPOINTMENTHISTORY = gql`
query($studentID:ID!){
    getAppointmentHistory(studentID: $studentID) {
    appointmentDate
    appointmentStartTime
    endTime
    arrivalConfirmation
    checkupType
    doctorID {
      doctorName
      officeNumber
    }
  }
}
`

function AppoitmentList() {
    const {loading, error, data} = useQuery(GETAPPOINTMENTHISTORY,{
        variables:{studentID:87654321},
        onError: error=>{
            console.error(error)
        },
        onCompleted: data =>{
            setAppointmentHistory(data?.getAppointmentHistory)
        }
    })

    const [appointmentHistory, setAppointmentHistory] = useState(null)

    useEffect(()=>{}, [appointmentHistory])

    if(loading){
        <Text>Loading...</Text>
    }


    if(error){
        return<>
        <Text>Error</Text>
        <Text>{error.message}</Text>
        </>
    }
    const historyList = [
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
    ]

    console.log(appointmentHistory)
    return (
        <ScrollView>
            <View style={styles.warning}>
                <Ionicons name="ios-warning-outline" size={24} color="red" />
                <Text style={styles.warningFont}>Ensure be present 15 minutes before Doctor's appointment or appointment will be cancelled </Text>
            </View>
            {
                (appointmentHistory || []).map(({appointmentDate, appointmentStartTime, endTime, doctorID}, index) => {
                    return(
                        <AppointmentBubble date={appointmentDate} location={"Legon Hospital"} officeNumber={doctorID?.officeNumber} doctor={doctorID?.doctorName}
                        time={appointmentStartTime} endTime={endTime} chosenColor={index%3} index={index} />)
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{},
    warning:{
        display:'flex',
        flexDirection:'row',

        margin:10,
    },
    warningFont:{
        color:'red',
        marginLeft:4
    }
})

export default AppoitmentList
