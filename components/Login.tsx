import { useMutation, gql } from "@apollo/client";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Navigation from "../navigation";
import { signIn } from "../util";
import { TouchableOpacity } from "react-native-gesture-handler";
import LoggedInContext from "../context/loggedInContext";

const LOGIN = gql`
	mutation($studentID: ID!, $password: String!) {
		loginUser(studentID: $studentID, password: $password) {
			token
		}
	}
`;

function Login({ navigation }) {
	const { setIsLogged } = useContext(LoggedInContext);
	const [studentDetails, setStudentDetails] = useState({
		studentID: "",
		password: "",
	});

	const [login, { loading, error, data }] = useMutation(LOGIN, {
		onError: (e) => {
			console.trace(e);
		},
		onCompleted: (response) => {
			if (response) {
				signIn(response.loginUser.token);
				setIsLogged(true);
			}
			// console.log(response);
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
						onChangeText={(text) => setStudentDetails({ ...studentDetails, password: text })}
					/>
				</View>
			</View>
			<View style={{ flex: 0.5, position: "relative", bottom: 5, top: 0 }}>
				{loading ? (
					<ActivityIndicator size="large" color="#5254E0" />
				) : (
					<Button
						color="#5254E0"
						title="Sign In"
						onPress={() => {
							login({ variables: { ...studentDetails } });
						}}
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
