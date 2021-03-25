import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from "react-native";
import AppoitmentList from "./appointment/AppoitmentList";
import ImageComp from "./appointment/ImageComp";
import { gql, useQuery } from "@apollo/client";

const GETAPPOINTMENTHISTORY = gql`
	query($studentID: ID!) {
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
		getStudentProfile(studentID: $studentID) {
			studentName
		}
	}
`;
export default function EditScreenInfo({ path, studentID }: { path: string; studentID: string }) {
	const { loading, error, data } = useQuery(GETAPPOINTMENTHISTORY, {
		variables: { studentID },
		onError: (error) => {
			console.error(error);
		},
		onCompleted: (data) => {
			setAppointmentHistory(data?.getAppointmentHistory);
		},
	});

	const [appointmentHistory, setAppointmentHistory] = useState(null);

	useEffect(() => {}, [appointmentHistory]);

	if (loading) {
		return (
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#5254E0" />
			</View>
		);
	}

	if (error) {
		return (
			<>
				<Text>Error</Text>
				<Text>{error.message}</Text>
			</>
		);
	}

	return (
		<ScrollView style={styles.container}>
			<ImageComp name={data?.getStudentProfile?.studentName} />
			<AppoitmentList appointmentHistory={appointmentHistory} />
		</ScrollView>
	);
}

function handleHelpPress() {
	WebBrowser.openBrowserAsync(
		"https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center",
		display: "flex",
		backgroundColor: "#fff",
	},
});
