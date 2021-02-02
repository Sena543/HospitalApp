import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import AppointmentBubble from './AppointmentBubble'

function AppoitmentList() {

    const historyList = [
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
        {date:"Monday, 18 January 2021", location:"Legon Hospital", officeNumber:"B201", doctor:"Eren Owusu", time:"9:00-10:00"},
    ]
    return (
        <ScrollView>
            <View style={styles.warning}>
                <Ionicons name="ios-warning-outline" size={24} color="red" />
                <Text style={styles.warningFont}>Ensure be present 15 minutes before Doctor's appointment or appointment will be cancelled </Text>
            </View>
            {
                (historyList || []).map(({date, location, officeNumber, doctor, time}, index) => {
                    return(
                        <AppointmentBubble date={date} location={location} officeNumber={officeNumber} doctor={doctor} time={time} chosenColor={index%3} />)
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
