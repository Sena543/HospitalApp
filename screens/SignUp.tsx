import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	Modal,
	FlatList,
	TouchableOpacity,
	Button,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RadioGroup from "react-native-radio-buttons-group";
import moment from "moment";

const SIGNUP_STUDENT = gql`
	mutation(
		$studentName: String!
		$studentID: String!
		$email: String!
		$gender: String!
		$residentialStatus: String
		$studentType: String!
		$password: String!
		$dateOfBirth: String!
		$yearAdmitted: String!
		$hallOfResidence: String
		$studentID: String!
	) {
		addNewStudent(
			input: {
				studentName: $studentName
				studentID: $studentID
				email: $email
				gender: $gender
				studentType: $studentType
				residentialStatus: $residentialStatus
				password: $password
				dateOfBirth: $dateOfBirth
				roomNumber: $roomNumber
				yearAdmitted: $yearAdmitted
				hallOfResidence: $hallOfResidence
			}
		) {
			dateOfBirth
			email
			gender
			hallOfResidence
			hometown
			residentialStatus
			roomNumber
			studentID
			studentName
			studentType
			yearAdmitted
		}
	}
`;

function SignUp({ navigation }) {
	const [studentData, setStudentData] = useState({
		fullName: "",
		email: "",
		studentID: "",
		password: "",
		confirmPass: "",
		phoneNumber: "",
		gender: "",
		dateOfBirth: moment(new Date()).format("DD/MM/YYYY"),
		residentialStatus: "Non Resident",
		hallOfResidence: "",
	});
	const [addNewStudent, { data }] = useMutation(SIGNUP_STUDENT, {
		onCompleted: () => {
			navigation.navigate("SignIn");
		},
		onError: (e) => console.error(e),
	});
	const [selectItems, setSelectItem] = useState({
		selectHall: false,
		pickDOB: false,
	});
	const genderOptions = [
		{ label: "Male", value: "Male" },
		{ label: "Female", value: "Female" },
	];
	const hideDatePicker = () => {
		setSelectItem({ ...selectItems, pickDOB: false });
	};

	const handleConfirm = (time: any) => {
		setStudentData({ ...studentData, dateOfBirth: moment(time).format("hh:mm") });
		hideDatePicker();
		// getDocs({ variables: { timeSelected: bookAppointment.startTime } });
	};

	const handleDateConfirm = (date: any) => {
		setStudentData({ ...studentData, dateOfBirth: moment(date).format("DD/MM/YYYY") });
		hideDatePicker();
	};
	const halls = [
		{ name: "Alexander Kwapong Hall" },
		{ name: "Akuafo Hall" },
		{ name: "Bani Hostel" },
		{ name: "Commonwealth Hall" },
		{ name: "Elizabeth Hall" },
		{ name: "Evandy Hostel" },
		{ name: "Hilla Limann hall" },
		{ name: "Jubilee Hall" },
		{ name: "James Topp Nelson (TF Hostel)" },
		{ name: "Jean Nelson Ackah Hall" },
		{ name: "Legon hall" },
		{ name: "Mensah Sarbah Hall" },
		{ name: "Pentagon (African Union Hostel)" },
		{ name: "Volta Hall" },
		{ name: "International Student Hostel" },
	];

	const renderHalls = ({ item }) => {
		return (
			<View style={{ height: 25, borderBottomWidth: 0.4 }}>
				<TouchableOpacity
					onPress={() => {
						setStudentData({ ...studentData, hallOfResidence: item.name });
						setSelectItem({ ...selectItems, selectHall: false });
					}}>
					<Text>{item.name}</Text>
				</TouchableOpacity>
			</View>
		);
	};
	return (
		<SafeAreaView
			style={{
				backgroundColor: "#fff",
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}>
			<View style={{ margin: 20, padding: 0 }}>
				<Text
					style={{
						color: "#5254E0",
						fontSize: 20,
						fontWeight: "bold",
						position: "relative",
						right: 95,
					}}>
					Sign up
				</Text>
			</View>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.formView}>
					<View>
						<TextInput
							placeholder="Full Name"
							style={styles.input}
							value={studentData.fullName}
							onChange={(e: any) =>
								setStudentData({ ...studentData, fullName: e.target.value })
							}
						/>
						<TextInput
							value={studentData.studentID}
							onChange={(e: any) =>
								setStudentData({ ...studentData, studentID: e.target.value })
							}
							placeholder="Student ID"
							style={styles.input}
						/>

						<TextInput
							value={studentData.email}
							onChange={(e: any) => setStudentData({ ...studentData, email: e.target.value })}
							placeholder="Email"
							style={styles.input}
						/>
						<TextInput
							value={studentData.password}
							onChange={(e: any) =>
								setStudentData({ ...studentData, password: e.target.value })
							}
							placeholder="Password"
							textContentType="password"
							style={styles.input}
						/>
						<TextInput
							value={studentData.fullName}
							onChange={(e: any) =>
								setStudentData({ ...studentData, confirmPass: e.target.value })
							}
							placeholder="Confirm Password"
							textContentType="password"
							style={styles.input}
						/>
						{studentData.password !== studentData.confirmPass ? (
							<Text style={{ color: "red" }}>Passwords not equal</Text>
						) : null}
						<TextInput
							value={studentData.phoneNumber}
							onChange={(e: any) =>
								setStudentData({ ...studentData, phoneNumber: e.target.value })
							}
							placeholder="Phone Number"
							maxLength={10}
							style={styles.input}
						/>
					</View>
					<View style={{ flexDirection: "row" }}>
						<Text>Gender</Text>
						<View style={{ position: "relative", bottom: 10 }}>
							<RadioGroup
								radioButtons={[
									{ label: "Male", value: "Male" },
									{ label: "Female", value: "Female" },
								]}
								flexDirection="row"
								color={"#5254E0"}
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
								}}>
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
					<View>
						<View>
							<View
								style={{
									// flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									margin: 20,
								}}>
								<Text>Residential Status</Text>
								<RadioGroup
									radioButtons={[
										{ label: "Non Resident", value: "Non Resident" },
										{ label: "Resident", value: "Resident" },
									]}
									flexDirection="row"
									color={"#5254E0"}
									onPress={(data) => {
										const sel = data.find((d) => {
											return d.selected == true;
										});
										setStudentData({ ...studentData, residentialStatus: sel.value });
									}}
								/>
							</View>
						</View>
						{studentData.residentialStatus === "Resident" ? (
							<View style={{ justifyContent: "center", alignItems: "center" }}>
								<View>
									<TextInput
										style={styles.input}
										placeholder="Select Hall"
										onFocus={() => setSelectItem({ ...selectItems, selectHall: true })}
										value={studentData.hallOfResidence}
									/>
								</View>
								<Modal visible={selectItems.selectHall}>
									<View style={styles.modalView}>
										<FlatList
											data={halls}
											renderItem={renderHalls}
											keyExtractor={(item) => item.name}
										/>
									</View>
								</Modal>
							</View>
						) : null}
					</View>
				</View>
				<View style={{ flex: 0.2, position: "relative", top: "25%" }}>
					<Button
						color="#5254E0"
						title="Sign Up"
						onPress={() => {
							addNewStudent({ variables: { ...studentData } });
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
						top: "15%",
					}}>
					<Text style={{ color: "#CCCCCC", marginLeft: 20 }}>Already have an account?</Text>
					<TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
						<Text style={{ color: "#5254E0", marginLeft: 5 }}>Sign In</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default SignUp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		// marginTop: "30%",
		backgroundColor: "#fff",
	},
	input: {
		width: 250,
		height: 30,
		borderRadius: 5,
		borderWidth: 1,
		marginBottom: 20,
		// borderColor: "blue",
	},
	formView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		position: "relative",
		top: "50%",
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
		height: "30%",
		// width:"70%"
	},
});
