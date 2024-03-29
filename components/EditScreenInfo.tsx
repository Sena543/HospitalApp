import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import AppoitmentList from "./appointment/AppoitmentList";
import ImageComp from "./appointment/ImageComp";
import { gql, useQuery } from "@apollo/client";
import { getToken } from "../util";
import jwtDecode from "jwt-decode";
import { BACKEND_URI } from "@env";
import { View, Text } from "./Themed";

const GETAPPOINTMENTHISTORY = `
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
	// const { loading, error, data, refetch } = useQuery(GETAPPOINTMENTHISTORY, {
	// 	variables: { studentID },
	// 	// fetchPolicy: "no-cache",
	// 	pollInterval: 2000,
	// 	onError: (error) => {
	// 		console.error(error);
	// 	},
	// 	onCompleted: (data) => {
	// 		console.log(data.getAppointmentHistory);
	// 		setAppointmentHistory(data?.getAppointmentHistory);
	// 	},
	// });

	const [data, setData]: [any, any] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	async function fetchData() {
		const token = await getToken();
		const { user }: any = jwtDecode(token);
		if (!user) {
			console.log("Student ID is undefined. Skipping...");
			return;
		}

		setError(null);

		fetch(BACKEND_URI, {
			method: "POST",
			headers: {
				auth_token: token,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: String(GETAPPOINTMENTHISTORY),
				variables: { studentID: user },
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				// console.log(result);
				setData(result.data);
				if (result.errors) setError(new Error("An error occurred. Please try again later."));
			})
			.catch((err) => {
				setError(err);
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	useEffect(() => {
		fetchData();
		const handle = setInterval(() => {
			console.log("Refetching...");
			fetchData();
		}, 20000);
		return () => clearInterval(handle);
	}, []);

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
			<AppoitmentList appointmentHistory={data?.getAppointmentHistory} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center",
		display: "flex",
		// backgroundColor: "#fff",
	},
});
