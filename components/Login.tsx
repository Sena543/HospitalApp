import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Login() {
	const [studentDetails, setStudentDetails] = useState({
		studentID: "",
		password: "",
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
			<View style={{ flex: 0.4 }}>
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
			<View style={{ position: "relative", bottom: 100 }}>
				<Button
					color="#5254E0"
					title="Sign In"
					onPress={() => {
						console.log(studentDetails);
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
