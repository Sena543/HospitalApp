import { gql, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import LoggedInContext from "../context/loggedInContext";
import { View, Text } from "./Themed";

const GET_STUDENT_PROFILE = gql`
	query($studentID: ID!) {
		getStudentProfile(studentID: $studentID) {
			# dateOfBirth
			# email
			# gender
			# hallOfResidence
			# phoneNumber
			# residentialStatus
			# roomNumber
			# studentID
			# studentName
			# studentType
			# yearAdmitted
			dateOfBirth
			department
			email
			gender
			phoneNumber
			studentID
			studentName
		}
	}
`;

function Profile() {
	const { globalStudentID } = useContext(LoggedInContext);
	const { loading, error, data } = useQuery(GET_STUDENT_PROFILE, {
		variables: { studentID: globalStudentID },
		onError: (error) => {
			console.error(error);
		},
		onCompleted: (data) => {
			setStudentData(data?.getStudentProfile);
		},
	});
	const [studentData, setStudentData] = useState(null);

	useEffect(() => {}, [studentData]);

	if (loading) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size="large" color="#0910FF" />
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
		<View style={styles.container}>
			<View style={styles.imageView}>
				<Image style={styles.image} source={require("../assets/images/moon.jpg")} />
			</View>
			<View style={styles.profileDetails}>
				<View style={{ marginLeft: 20 }}>
					<View>
						<Text style={styles.title}>Name</Text>
						<Text style={styles.data}>{studentData?.studentName}</Text>
					</View>
					<View>
						<Text style={styles.title}>Staff ID</Text>
						<Text style={styles.data}>{studentData?.studentID}</Text>
					</View>
					<View>
						<Text style={styles.title}>Gender</Text>
						<Text style={styles.data}>{studentData?.gender}</Text>
					</View>
					{/* <View>
						<Text style={styles.title}>Student Level</Text>
						<Text style={styles.data}>{studentData?.yearAdmitted}</Text>
					</View>
					<View>
						<Text style={styles.title}>Hall of Residence</Text>
						<Text style={styles.data}>{studentData?.hallOfResidence}</Text>
					</View> */}
				</View>
				{/* <View style={{ marginRight: 40 }}>
					<View>
						<Text style={styles.title}>Student Type</Text>
						<Text style={styles.data}>{studentData?.studentType}</Text>
					</View>
					<View>
						<Text style={styles.title}>Residential Status</Text>
						<Text style={styles.data}>{studentData?.residentialStatus}</Text>
					</View>
					<View>
						<Text style={styles.title}>Room Number</Text>
						<Text style={styles.data}>{studentData?.roomNumber}</Text>
					</View>
					<View>
						<Text style={styles.title}>Last Appointment</Text>
						<Text style={styles.data}>{studentData?.lastApointment}</Text>
					</View>
				</View> */}
				<View style={{ marginRight: 40 }}>
					<View>
						<Text style={styles.title}>Phone Number</Text>
						<Text style={styles.data}>{studentData?.phoneNumber}</Text>
					</View>
					<View>
						<Text style={styles.title}>Department</Text>
						<Text style={styles.data}>{studentData?.department}</Text>
					</View>
					<View>
						<Text style={styles.title}>Birth Date</Text>
						<Text style={styles.data}>{studentData?.dateOfBirth}</Text>
					</View>
					{/* <View>
						<Text style={styles.title}>Last Appointment</Text>
						<Text style={styles.data}>{studentData?.lastApointment}</Text>
					</View> */}
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
	loading: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		color: "#818181",
		fontSize: 20,
		margin: 5,
	},
	data: {
		color: "#000000",
		fontSize: 16,
		fontWeight: "bold",
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
