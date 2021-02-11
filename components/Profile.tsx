import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { View, Text } from "./Themed";

const GET_STUDENT_PROFILE = gql`
	query($studentID: ID!) {
		getStudentProfile(studentID: $studentID) {
			studentID
			studentName
			email
			dateOfBirth
			hallOfResidence
			residentialStatus
			gender
			roomNumber
			hometown
			yearAdmitted
			studentType
		}
	}
`;

function Profile() {
	const { loading, error, data } = useQuery(GET_STUDENT_PROFILE, {
		variables: { studentID: 87654321 },
		onError: (error) => {
			console.error(error);
		},
		onCompleted: (data) => {
			setStudentData(data?.getStudentProfile);
			// console.log(data.getStudentProfile)
		},
	});
	const [studentData, setStudentData] = useState(null);

	useEffect(() => {}, [studentData]);

	if (loading) {
		return <Text>Loading...</Text>;
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
		<View style={styles.container}>
			<View style={styles.imageView}>
				<Image style={styles.image} source={require("../assets/images/moon.jpg")} />
			</View>
			<View style={styles.profileDetails}>
				<View style={{ marginLeft: 40 }}>
					<View>
						<Text style={styles.title}>Name</Text>
						<Text style={styles.data}>{studentData?.studentName}</Text>
					</View>
					<View>
						<Text style={styles.title}>Gender</Text>
						<Text style={styles.data}>{studentData?.gender}</Text>
					</View>
					<View>
						<Text style={styles.title}>Student Level</Text>
						<Text style={styles.data}>{studentData?.yearAdmitted}</Text>
					</View>
					<View>
						<Text style={styles.title}>Hometown</Text>
						<Text style={styles.data}>{studentData?.hometown}</Text>
					</View>
				</View>
				<View style={{ marginRight: 40 }}>
					<View>
						<Text style={styles.title}>Student Type</Text>
						<Text style={styles.data}>{studentData?.studentType}</Text>
					</View>
					<View>
						<Text style={styles.title}>Residential Status</Text>
						<Text style={styles.data}>{studentData?.hallOfResidence}</Text>
					</View>
					<View>
						<Text style={styles.title}>Room Number</Text>
						<Text style={styles.data}>{studentData?.roomNumber}</Text>
					</View>
					<View>
						<Text style={styles.title}>Last Appointment</Text>
						<Text style={styles.data}>{studentData?.lastApointment}</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center",
		display: "flex",
		backgroundColor: "#fff",
	},
	title: {
		color: "#818181",
		fontSize: 20,
		margin: 5,
	},
	data: {
		color: "#000000",
		fontSize: 15,
		margin: 5,
	},
	image: {
		width: "100%",
		height: "90%",
	},
	imageView: {
		flex: 1,
	},
	profileDetails: {
		flex: 2,
		// alignItems:"space-around",
		justifyContent: "space-between",
		marginTop: 20,
		flexDirection: "row",
	},
});
