import { useMutation, gql } from "@apollo/client";
import React, { useContext, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	ActivityIndicator,
	KeyboardAvoidingView,
	Pressable,
} from "react-native";
import { getToken, signIn } from "../util";
import { TouchableOpacity } from "react-native-gesture-handler";
import LoggedInContext from "../context/loggedInContext";
// import jwtDecode from "jwt-decode";

const LOGIN = gql`
	mutation ($studentID: ID!, $password: String!) {
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
			setErrorMsgs(e.message);
		},
		onCompleted: (response) => {
			if (response) {
				signIn(response.loginUser.token);
				setIsLogged(true);
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
		<KeyboardAvoidingView style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", marginTop: 60 }}>
			<View style={{ flex: 0.15, marginTop: "20%" }}>
				<Text style={styles.signInStyle}>Sign In</Text>
			</View>
			<View
				style={{
					flex: 0.8,
					width: "100%",
					position: "relative",
					justifyContent: "center",
					alignContent: "space-between",
					alignItems: "center",
				}}
			>
				<TextInput
					style={styles.input}
					value={studentDetails.studentID}
					placeholder="Staff ID"
					keyboardType="number-pad"
					onChangeText={(text) => setStudentDetails({ ...studentDetails, studentID: text })}
				/>
				<TextInput
					style={styles.input}
					value={studentDetails.password}
					placeholder="Password"
					secureTextEntry={true}
					keyboardType="number-pad"
					onChangeText={(text) => setStudentDetails({ ...studentDetails, password: text })}
				/>
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
					<Pressable style={styles.buttonStyle} onPress={handleLoggin}>
						<Text style={styles.buttonText}>SIGN IN</Text>
					</Pressable>
				)}
			</View>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					flex: 0.5,
					width: "100%",
					flexDirection: "row",
					position: "relative",
					bottom: "0%",
				}}
			>
				<Text style={{ color: "#CCCCCC", marginLeft: 5, fontSize: 20 }}>Don't have an account?</Text>
				<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
					<Text style={{ color: "#5254E0", fontSize: 20 }}> Sign Up</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

export default Login;

const styles = StyleSheet.create({
	input: {
		width: "80%",
		height: "20%",
		margin: "2%",
		borderRadius: 5,
		borderWidth: 1.5,
	},
	buttonStyle: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: "#5254E0",
		color: "#fff",
	},
	signInStyle: {
		color: "#5254E0",
		fontSize: 35,
		fontWeight: "bold",
		marginBottom: "1%",
		position: "relative",
		justifyContent: "center",
		alignContent: "center",
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
});
