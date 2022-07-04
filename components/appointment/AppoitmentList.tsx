import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { View, Text, ScrollView } from "../Themed";
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
		<ScrollView style={styles.container}>
			<View style={styles.warning}>
				<Ionicons name="ios-warning-outline" size={24} color="red" />
				<Text style={styles.warningFont}>
					Be sure present 15 minutes before Doctor's appointment or appointment will be cancelled{" "}
				</Text>
			</View>
			<View style={{ display: "flex", flex: 2 }}>
				{appointmentHistory === null || appointmentHistory?.length === 0 || !appointmentHistory ? (
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
						}}
					>
						<Text style={{ fontSize: 20, fontWeight: "bold" }}>No appointments have been made</Text>
					</View>
				) : (
					(appointmentHistory || [])
						.sort(
							(a: any, b: any) =>
								new Date(b.appointmentDate).valueOf() - new Date(a.appointmentDate).valueOf()
						)
						.map(({ appointmentDate, appointmentStartTime, endTime, doctorID }: any, index) => {
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
						})
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, display: "flex" },
	warning: {
		display: "flex",
		flexDirection: "row",
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
		// margin: "5%",
	},
	warningFont: {
		color: "red",
		margin: "6%",
		fontSize: 15,
	},
});

export default AppoitmentList;
