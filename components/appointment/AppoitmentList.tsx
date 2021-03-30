import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from "react-native";
import AppointmentBubble from "./AppointmentBubble";
import { gql, useQuery } from "@apollo/client";

// const GETAPPOINTMENTHISTORY = gql`
// 	query($studentID: ID!) {
// 		getAppointmentHistory(studentID: $studentID) {
// 			appointmentDate
// 			appointmentStartTime
// 			endTime
// 			arrivalConfirmation
// 			checkupType
// 			doctorID {
// 				doctorName
// 				officeNumber
// 			}
// 		}
// 		getStudentProfile(studentID: $studentID) {
// 			studentName
// 		}
// 	}
// `;

function AppoitmentList({ appointmentHistory }) {
	// console.log("Appointment history:", JSON.stringify(appointmentHistory));
	return (
		<ScrollView>
			<View style={styles.warning}>
				<Ionicons name="ios-warning-outline" size={24} color="red" />
				<Text style={styles.warningFont}>
					Ensure be present 15 minutes before Doctor's appointment or appointment will be cancelled{" "}
				</Text>
			</View>
			{appointmentHistory === null || appointmentHistory.length === 0 ? (
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						marginTop: 50,
						marginLeft: 10,
						marginRight: 10,
						borderWidth: 1,
						borderColor: "#000",
						height: 50,
						borderStyle: "dashed",
					}}>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>No appointments have been made</Text>
				</View>
			) : (
				(appointmentHistory || []).map(
					({ appointmentDate, appointmentStartTime, endTime, doctorID }: any, index) => {
						return (
							<AppointmentBubble
								date={appointmentDate}
								location={"Legon Hospital"}
								officeNumber={doctorID?.officeNumber}
								doctor={doctorID?.doctorName}
								time={appointmentStartTime}
								endTime={endTime}
								chosenColor={index % 3}
								index={index}
								key={String(index)}
							/>
						);
					}
				)
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {},
	warning: {
		display: "flex",
		flexDirection: "row",

		margin: 10,
	},
	warningFont: {
		color: "red",
		marginLeft: 4,
	},
});

export default AppoitmentList;
