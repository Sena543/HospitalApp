import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Navigation from "../navigation";
import { TouchableOpacity } from "react-native-gesture-handler";

const LOGIN = gql`
	mutation($studentID: ID!, $password: String!) {
		login(studentID: $studentID, password: $password) {
			token
		}
	}
`;

const storeToken = async (value) => {
	try {
		await AsyncStorage.setItem("authToken", value);
	} catch (e) {
		// saving error
		alert("Failed to process requests");
	}
};

function Login({ navigation }) {
	const [studentDetails, setStudentDetails] = useState({
		studentID: "",
		password: "",
	});

	const [login, { data }] = useMutation(LOGIN, {
		onError: (e) => {},
		onCompleted: (response) => {
			if (response) {
				storeToken(response);
			}
			navigation.navigate("Appointment");
		},
	});

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", marginTop: 60 }}>
			<View style={{}}>
				<Text
					style={{
						color: "#5254E0",
						fontSize: 20,
						fontWeight: "bold",
						position: "relative",
						right: 90,
					}}>
					Sign In
				</Text>
			</View>
			<View style={{ flex: 0.4, width: 150 }}>
				<View style={{ justifyContent: "center", alignItems: "center", flex: 0.5 }}>
					<TextInput
						style={styles.input}
						value={studentDetails.studentID}
						placeholder="Student ID"
						onChange={(e: any) =>
							setStudentDetails({ ...studentDetails, studentID: e.target.value })
						}
					/>
				</View>
				<View style={{ justifyContent: "center", alignItems: "center", flex: 0.5 }}>
					<TextInput
						style={styles.input}
						value={studentDetails.password}
						placeholder="Password"
						onChange={(e: any) =>
							setStudentDetails({ ...studentDetails, password: e.target.value })
						}
					/>
				</View>
			</View>
			<View style={{ flex: 0.5, position: "relative", bottom: 5, top: 0 }}>
				<Button
					color="#5254E0"
					title="Sign In"
					onPress={() => {
						login({ variables: { ...studentDetails } });
					}}
				/>
			</View>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					flex: 0.5,
					flexDirection: "row",
					position: "relative",
					bottom: "0%",
				}}>
				<Text style={{ color: "#CCCCCC", marginLeft: 20, fontSize: 20 }}>Don't have an account?</Text>
				<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
					<Text style={{ color: "#5254E0", fontSize: 20 }}>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Login;

const styles = StyleSheet.create({
	input: {
		width: "150%",
		height: 30,
		borderRadius: 5,
		borderWidth: 1,
		// margin: 30,
	},
});
