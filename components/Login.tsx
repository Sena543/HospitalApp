import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOGIN = gql`
	mutation($studentID: ID!, $password: String!) {
		login(studentID: $studentID, password: $password) {
			token
		}
	}
`;

const storeData = async (value) => {
	try {
		await AsyncStorage.setItem("loogedIn", value);
	} catch (e) {
		// saving error
	}
};

function Login() {
	const [studentDetails, setStudentDetails] = useState({
		studentID: "",
		password: "",
	});

	const [login, { data }] = useMutation(LOGIN, {
		onError: (e) => {},
		onCompleted: (d) => {},
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
				<View style={{ justifyContent: "center", alignItems: "center", flex: 0.3 }}>
					<TextInput
						style={styles.input}
						value={studentDetails.studentID}
						placeholder="Student ID"
						onChange={(e: any) =>
							setStudentDetails({ ...studentDetails, studentID: e.target.value })
						}
					/>
				</View>
				<View style={{ justifyContent: "center", alignItems: "center", flex: 0.3 }}>
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
			<View style={{ position: "relative", bottom: 160, top: 0 }}>
				<Button
					color="#5254E0"
					title="Sign In"
					onPress={() => {
						// login({ variables: { ...studentDetails } });
						if (studentDetails.studentID === "12345678" && studentDetails.password === "1234") {
							storeData(true);
						}
					}}
				/>
			</View>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					flex: 0.4,
					flexDirection: "row",
					position: "relative",
					bottom: "30%",
				}}>
				<Text style={{ color: "#CCCCCC", marginLeft: 20 }}>Don't have an account?</Text>
				<Text style={{ color: "#5254E0" }}>Sign Up</Text>
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
