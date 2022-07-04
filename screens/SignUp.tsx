import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
	StyleSheet,
	TextInput,
	ScrollView,
	TouchableOpacity,
	Platform,
	Button,
	ActivityIndicator,
	useColorScheme,
	// KeyboardAvoidingView,
	// View,
	// Text,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RadioGroup from "react-native-radio-buttons-group";
import { View, Text, KeyboardAvoidingView } from "../components/Themed";
import moment from "moment";

const SIGNUP_STUDENT = gql`
	mutation (
		$studentName: String!
		$studentID: ID!
		$email: String!
		$dateOfBirth: String!
		$gender: String!
		$department: String!
		# $roomNumber: String
		# $yearAdmitted: String
		# $studentType: String!
		# $residentialStatus: String!
		# $hallOfResidence: String
		$password: String!
		$phoneNumber: String
	) {
		addNewStudent(
			input: {
				studentName: $studentName
				studentID: $studentID
				email: $email
				gender: $gender
				# studentType: $studentType
				# residentialStatus: $residentialStatus
				department: $department
				password: $password
				dateOfBirth: $dateOfBirth
				# roomNumber: $roomNumber
				# yearAdmitted: $yearAdmitted
				# hallOfResidence: $hallOfResidence
				phoneNumber: $phoneNumber
			}
		) {
			studentName
			studentID
			email
			gender
			# studentType
			# residentialStatus
			dateOfBirth
			# roomNumber
			# yearAdmitted
			# hallOfResidence
			phoneNumber
		}
	}
`;

function SignUp({ navigation }) {
	const colorScheme = useColorScheme();
	const inputBorderToggle = colorScheme === "dark" ? "#fff" : "#000";
	const [studentData, setStudentData] = useState({
		dateOfBirth: moment(new Date()).format("DD-MM-YYYY"),
		email: "",
		gender: "Male",
		// hallOfResidence: "",
		// residentialStatus: "Non Resident",
		// roomNumber: "",
		studentID: "",
		department: "",
		studentName: "",
		// studentType: "",
		// yearAdmitted: "",
		password: "",
		confirmPass: "",
		phoneNumber: "",
	});
	const [addNewStudent, { loading, data }] = useMutation(SIGNUP_STUDENT, {
		onCompleted: (d) => {
			navigation.navigate("SignIn");
		},
		onError: (e) => {
			console.error(e.message);
		},
	});

	const [selectItems, setSelectItem] = useState({
		selectHall: false,
		pickDOB: false,
	});

	const hideDatePicker = () => {
		setSelectItem({ ...selectItems, pickDOB: false });
	};

	const handleDateConfirm = (date: any) => {
		setStudentData({ ...studentData, dateOfBirth: moment(date).format("DD-MM-YYYY") });
		hideDatePicker();
	};
	// const halls = [
	// 	{ name: "Alexander Kwapong Hall" },
	// 	{ name: "Akuafo Hall" },
	// 	{ name: "Bani Hostel" },
	// 	{ name: "Commonwealth Hall" },
	// 	{ name: "Elizabeth Hall" },
	// 	{ name: "Evandy Hostel" },
	// 	{ name: "Hilla Limann hall" },
	// 	{ name: "Jubilee Hall" },
	// 	{ name: "James Topp Nelson (TF Hostel)" },
	// 	{ name: "Jean Nelson Ackah Hall" },
	// 	{ name: "Legon hall" },
	// 	{ name: "Mensah Sarbah Hall" },
	// 	{ name: "Pentagon (African Union Hostel)" },
	// 	{ name: "Volta Hall" },
	// 	{ name: "International Student Hostel" },
	// ];

	const validateEmail = (email) => {
		var re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	// const renderHalls = ({ item }) => {
	// 	return (
	// 		<View style={{ height: 25, borderBottomWidth: 0.4 }}>
	// 			<TouchableOpacity
	// 				onPress={() => {
	// 					setStudentData({ ...studentData, hallOfResidence: item.name });
	// 					setSelectItem({ ...selectItems, selectHall: false });
	// 				}}>
	// 				<Text>{item.name}</Text>
	// 			</TouchableOpacity>
	// 		</View>
	// 	);
	// };

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
			<View style={{ marginTop: 30, padding: 0, marginBottom: 10 }}>
				<Text
					style={{
						color: "#5254E0",
						fontSize: 20,
						fontWeight: "bold",
						position: "relative",
						right: 95,
					}}
				>
					Sign up
				</Text>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View style={styles.formView}>
					<View>
						<TextInput
							placeholder="Full Name"
							// style={styles.input}
							style={[{ borderColor: inputBorderToggle }, styles.input]}
							value={studentData.studentName}
							onChangeText={(text) => setStudentData({ ...studentData, studentName: text })}
						/>
						<TextInput
							value={studentData.studentID}
							onChangeText={(text) => setStudentData({ ...studentData, studentID: text.trimEnd() })}
							placeholder="Staff ID"
							keyboardType="number-pad"
							style={[{ borderColor: inputBorderToggle }, styles.input]}
							// style={styles.input}
						/>

						<TextInput
							value={studentData.email}
							onChangeText={(text) => setStudentData({ ...studentData, email: text.trimEnd() })}
							placeholder="Email"
							style={[{ borderColor: inputBorderToggle }, styles.input]}
							// style={styles.input}
						/>
						<TextInput
							value={studentData.password}
							onChangeText={(text) => setStudentData({ ...studentData, password: text })}
							placeholder="Password"
							keyboardType="number-pad"
							secureTextEntry={true}
							style={[{ borderColor: inputBorderToggle }, styles.input]}
							// style={styles.input}
						/>
						<TextInput
							value={studentData.confirmPass}
							onChangeText={(text) => setStudentData({ ...studentData, confirmPass: text })}
							placeholder="Confirm Password"
							keyboardType="number-pad"
							secureTextEntry={true}
							// textContentType="password"
							style={[{ borderColor: inputBorderToggle }, styles.input]}
							// style={styles.input}
						/>
						{studentData.password !== studentData.confirmPass ? (
							<Text style={{ color: "red" }}>Passwords not equal</Text>
						) : null}
						<TextInput
							value={studentData.phoneNumber}
							onChangeText={(text) => setStudentData({ ...studentData, phoneNumber: text.trimEnd() })}
							placeholder="Phone Number"
							keyboardType="number-pad"
							maxLength={10}
							// style={styles.input}
							style={[{ borderColor: inputBorderToggle }, styles.input]}
						/>
						{/* <TextInput
							value={studentData.studentType}
							onChangeText={(text) =>
								setStudentData({ ...studentData, studentType: text.trimEnd() })
							}
							placeholder="Degree Type eg Bachelors, Masters, Phd"
							maxLength={10}
							style={styles.input}
						/> */}
						<TextInput
							value={studentData.department}
							onChangeText={(text) => setStudentData({ ...studentData, department: text.trimEnd() })}
							placeholder="Department"
							// keyboardType="number-pad"
							// maxLength={10}
							// style={styles.input}
							style={[{ borderColor: inputBorderToggle }, styles.input]}
						/>
					</View>
					<View style={{ flexDirection: "row" }}>
						<Text>Gender</Text>
						<View style={{ position: "relative", bottom: 10 }}>
							<RadioGroup
								radioButtons={[
									{
										// label: <Text style={{ color: inputBorderToggle }}>{"Male"}</Text>,
										label: "Male",
										value: "Male",
										id: "male",
									},
									{
										// label: <Text style={{ color: inputBorderToggle }}>Female</Text>,
										label: "Female",
										value: "Female",
										id: "female",
									},
								]}
								// color={inputBorderToggle}
								onPress={(data) => {
									const sel = data.find((d) => {
										return d.selected == true;
									});
									setStudentData({ ...studentData, gender: sel.value });
								}}
							/>
						</View>
					</View>
					<View>
						<View style={{ flexDirection: "row" }}>
							<Text>Date of Birth: </Text>
							<TouchableOpacity
								onPress={() => {
									setSelectItem({ ...selectItems, pickDOB: true });
								}}
							>
								<Text>{studentData.dateOfBirth}</Text>
							</TouchableOpacity>
						</View>
						<DateTimePickerModal
							isVisible={selectItems.pickDOB}
							mode="date"
							onConfirm={handleDateConfirm}
							onCancel={() => {
								setSelectItem({ ...selectItems, pickDOB: false });
							}}
						/>
					</View>
				</View>
				<View style={{ position: "relative", top: "3%", marginBottom: 30 }}>
					{loading ? (
						<ActivityIndicator size="large" color="#5254E0" />
					) : (
						<Button
							color="#5254E0"
							title="Sign Up"
							onPress={() => {
								addNewStudent({ variables: { ...studentData } });
							}}
						/>
					)}
				</View>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
						position: "relative",
					}}
				>
					<Text style={{ color: "#CCCCCC", marginLeft: 20, fontSize: 20, marginBottom: 30 }}>
						Already have an account?
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
						<Text style={{ color: "#5254E0", marginLeft: 5, fontSize: 20, marginBottom: 30 }}>Sign In</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default SignUp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "#fff",
	},
	input: {
		width: 260,
		height: 30,
		borderRadius: 5,
		borderWidth: 1,
		marginBottom: 20,
	},
	formView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		position: "relative",
		top: "10%",
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.55,
		shadowRadius: 3.84,
		elevation: 5,
		justifyContent: "flex-start",
		height: "50%",
	},
});
