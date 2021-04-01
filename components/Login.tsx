import { useMutation, gql } from "@apollo/client";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import { getToken, signIn } from "../util";
import { TouchableOpacity } from "react-native-gesture-handler";
import LoggedInContext from "../context/loggedInContext";
// import jwtDecode from "jwt-decode";

const LOGIN = gql`
	mutation($studentID: ID!, $password: String!) {
		loginUser(studentID: $studentID, password: $password) {
			token
		}
	}
`;

function Login({ navigation }) {
	const { setIsLogged, setGlobalStudentID } = useContext(LoggedInContext);
	const [studentDetails, setStudentDetails] = useState({
		studentID: "",
		password: "",
	});
	const [errorMsg, setErrorMsgs] = useState("");
	const [login, { loading, error, data }] = useMutation(LOGIN, {
		onError: (e) => {
			// console.log(e.message);
			setErrorMsgs(e.message);
		},
		onCompleted: (response) => {
			if (response) {
				signIn(response.loginUser.token);
				setIsLogged(true);
				// const token = getToken();
				// const { user } = jwtDecode(token);
				// console.log("userID form token:", user);
				setGlobalStudentID(studentDetails.studentID);
			}
		},
	});

	const handleLoggin = () => {
		if (studentDetails.password === "" || studentDetails.studentID === "") {
			setErrorMsgs("ID and password are required");
			return;
		} else if (studentDetails.studentID.length !== 8) {
			setErrorMsgs("ID is incorrect.  Please check and try again");
			return;
		}
		login({ variables: { ...studentDetails } });
	};

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
						placeholder="Staff ID"
						keyboardType="number-pad"
						onChangeText={(text) => setStudentDetails({ ...studentDetails, studentID: text })}
					/>
				</View>
				<View style={{ justifyContent: "center", alignItems: "center", flex: 0.5 }}>
					<TextInput
						style={styles.input}
						value={studentDetails.password}
						placeholder="Password"
						secureTextEntry={true}
						keyboardType="number-pad"
						onChangeText={(text) => setStudentDetails({ ...studentDetails, password: text })}
					/>
				</View>
			</View>
			{Boolean(errorMsg) ? (
				<View style={{ height: 50 }}>
					<Text style={{ color: "red", fontSize: 15, fontWeight: "bold" }}>{errorMsg}</Text>
				</View>
			) : null}
			{/* <Text style={{ color: "red", fontSize: 15, fontWeight: "bold" }}>ghghgh</Text> */}
			<View style={{ flex: 0.5, position: "relative", bottom: 5, top: 0 }}>
				{loading ? (
					<ActivityIndicator size="large" color="#5254E0" />
				) : (
					<Button
						color="#5254E0"
						title="Sign In"
						// onPress={() => {
						// 	login({ variables: { ...studentDetails } });
						// 	// handleLoggin;
						// }}
						onPress={handleLoggin}
					/>
				)}
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
	},
});
