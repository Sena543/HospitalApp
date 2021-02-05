import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	View,
	Text,
	Alert,
	StyleSheet,
	SafeAreaView,
	Modal,
	ScrollView,
	TouchableOpacity,
	Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Confirm from "./booking/Confirm";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const BOOK_APPOINTMENT = gql`
	mutation(
		$studentID: ID!
		$doctorID: ID!
		$checkupType: String!
		$appointmentStartTime: String!
		$endTime: String!
		# $arrivalConfirmation: Boolean
		$appointmentDate: String!
	) {
		bookAppointment(
			input: {
				studentID: $studentID
				doctorID: $doctorID
				checkupType: $checkupType
				appointmentStartTime: $appointmentStartTime
				endTime: $endTime
				appointmentDate: $appointmentDate
			}
		) {
			appointmentDate
			appointmentStartTime
			arrivalConfirmation
			checkupType
			doctorID {
				doctorID
				doctorName
			}
			endTime
		}
	}
`;

function Booking() {
	const [showModal, setShowModal] = useState(false);
	const [showPurpose, setShowPurpose] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showComponents, setShowComponents] = useState({
		datePicker: false,
		pupropsePicker: false,
		confirmAppointment: false,
		timePicker: false,
	});
	const [bookAppointment, setBookAppointment] = useState({
		checkupType: "Regular Checkup",
		appointmentDate: moment(new Date()).format("DD/MM/YYYY"),
		startTime: moment(new Date().getTime()).format("hh:mm"),
		// startTime: new Date().getTime(),
		endTime: "",
		doctorID: "",
	});

	const [confirmAppointment, { data }] = useMutation(BOOK_APPOINTMENT, {
		variables: {
			doctorID: bookAppointment.doctorID,
			checkupType: bookAppointment.checkupType,
			studentID: 87654321,
			appointmentDate: bookAppointment.appointmentDate,
			endTime: bookAppointment.endTime,
			startTime: bookAppointment.startTime,
		},
	});

	const appointmentList = [
		{ appTime: "1:00", doctorName: "Michael Frimpong", duration: "8:00-9:00" },
		{ appTime: "2:00", doctorName: "Eren Yeager", duration: "8:00-9:00" },
		{ appTime: "3:00", doctorName: "Levi Ackerman", duration: "8:00-9:00" },
		{ appTime: "4:00", doctorName: "Annie Leonhart", duration: "8:00-9:00" },
		{ appTime: "5:00", doctorName: "Reiner Frimpong", duration: "8:00-9:00" },
		{ appTime: "8:00", doctorName: "Michael Jackson", duration: "8:00-9:00" },
		{ appTime: "9:00", doctorName: "Lionel Messi", duration: "8:00-9:00" },
		{ appTime: "10:00", doctorName: "Cristiano Ronaldo", duration: "8:00-9:00" },
	];

	const onChange = (event: any, selectedDate: any) => {
		const currentDate = moment(selectedDate).format("DD/MM/YYYY");
		setBookAppointment({ ...bookAppointment, appointmentDate: currentDate });
	};

	// const onTimeChange = (event: any, selectedTime: any) => {
	// 	const currentTime = moment(selectedTime).format("hh:mm");
	// 	console.log(currentTime);
	// 	setBookAppointment({ ...bookAppointment, startTime: currentTime });
	// };

	// const showDatePicker = () => {
	// 	setShowComponents({ ...showComponents, timePicker: true });
	// };

	const hideDatePicker = () => {
		// setDatePickerVisibility(false);
		setShowComponents({ ...showComponents, timePicker: false });
	};

	const handleConfirm = (time: any) => {
		// console.warn("A date has been picked: ", date)
		setBookAppointment({ ...bookAppointment, startTime: moment(time).format("hh:mm") });
		hideDatePicker();
	};

	const handleDateConfirm = (date: any) => {
		const currentDate = moment(date).format("DD/MM/YYYY");
		setBookAppointment({ ...bookAppointment, appointmentDate: currentDate });
		// hideDatePicker();
		setShowComponents({ ...showComponents, datePicker: false });
	};

	const purposes = ["Regular Checkup", "Medical Checkup", "Dental Checkup", "Results Collection"];
	const AvailabeAppointments = ({
		appTime,
		doctorName,
		duration,
	}: {
		appTime: String;
		doctorName: String;
		duration: String;
	}) => {
		return (
			<View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
				<Text style={{ color: "#B5B7BB" }}>{appTime}</Text>
				<View style={{ flexDirection: "row", flex: 1 }}>
					<View
						style={{
							marginBottom: 10,
							backgroundColor: "#E9E9FF",
							marginLeft: 50,
							width: 30,
							borderRadius: 5,
							alignItems: "center",
							justifyContent: "flex-end",
						}}>
						<Ionicons name="refresh-circle-outline" color="red" size={15} />
					</View>
					<View>
						<Text
							style={{
								marginBottom: 20,
								marginLeft: 10,
								fontWeight: "bold",
								fontSize: 15,
								color: "#000000",
							}}>
							{doctorName}
						</Text>
						<Text style={{ marginLeft: 10 }}>{duration}</Text>
					</View>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, width: "100%", marginLeft: 25 }}>
			<View style={{ flex: 0.1, marginBottom: 30, marginTop: 30, marginLeft: 20 }}>
				<TouchableOpacity
					onPress={() => {
						setShowPurpose(true);
					}}>
					<View style={{ height: 20 }}>
						<Text>Select Appointment Purpose</Text>
						<Text style={{ fontStyle: "normal", fontWeight: "bold", fontSize: 20 }}>
							{bookAppointment.checkupType}
						</Text>
					</View>
				</TouchableOpacity>
				<Modal
					animationType="fade"
					transparent={true}
					visible={showPurpose}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
					}}>
					<View style={styles.modalView}>
						<View>
							<Text style={{ textDecorationLine: "underline" }}>Appointment Purpose</Text>
						</View>
						<Picker
							style={{ height: 50, width: 100, position: "relative", bottom: 70 }}
							onValueChange={(itemValue, itemIndex) => {
								setBookAppointment({ ...bookAppointment, checkupType: itemValue });
								setShowPurpose(!showPurpose);
							}}>
							{purposes.map((purpose) => {
								return <Picker.Item label={purpose} value={purpose} />;
							})}
						</Picker>
					</View>
				</Modal>
			</View>
			<View style={{ flex: 0.5, flexDirection: "row", marginLeft: 20, marginRight: 20 }}>
				<View style={{ flex: 1, flexDirection: "row" }}>
					<Ionicons
						name="radio-button-on-outline"
						size={10}
						color="#FF0000"
						style={{ marginTop: 3, marginRight: 5 }}
					/>
					<Text>Full Booked</Text>
				</View>
				<View style={{ flex: 1, flexDirection: "row" }}>
					<Ionicons
						name="radio-button-on-outline"
						size={10}
						color="#FF6F00"
						style={{ marginTop: 3, marginRight: 5 }}
					/>
					<Text>Almost Full</Text>
				</View>
				<View style={{ flex: 1, flexDirection: "row", marginLeft: 10 }}>
					<Ionicons
						name="radio-button-on-outline"
						size={10}
						color="#23FF1B"
						style={{ marginTop: 3, marginRight: 5 }}
					/>
					<Text>Available</Text>
				</View>
			</View>
			<View
				style={{
					flex: 0.8,
					flexDirection: "row",
					justifyContent: "space-evenly",
					marginLeft: 10,
					marginRight: 30,
				}}>
				<TouchableOpacity
					onPress={() => {
						// setShowDatePicker(true);
						setShowComponents({ ...showComponents, datePicker: true });
					}}>
					<View style={{ height: 50 }}>
						<Text>Date for Appointment</Text>
						<Text style={{ fontStyle: "normal", fontWeight: "bold", fontSize: 20 }}>
							{bookAppointment.appointmentDate}
						</Text>
						<DateTimePickerModal
							isVisible={showComponents.datePicker}
							mode="date"
							onConfirm={handleDateConfirm}
							onCancel={() => {
								setShowComponents({ ...showComponents, datePicker: false });
							}}
						/>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setShowComponents({ ...showComponents, timePicker: true });
					}}>
					<View style={{ height: 50 }}>
						<Text>Select Time</Text>
						<Text style={{ fontStyle: "normal", fontWeight: "bold", fontSize: 20 }}>
							{bookAppointment.startTime}
						</Text>
						<DateTimePickerModal
							isVisible={showComponents.timePicker}
							mode="time"
							onConfirm={handleConfirm}
							onCancel={hideDatePicker}
						/>
					</View>
				</TouchableOpacity>
			</View>
			{/* {!showDatePicker && !showComponents.timePicker ? ( */}
			<View style={{ flex: 2 }}>
				<View style={{ flex: 0.1, flexDirection: "row", marginBottom: 10 }}>
					<Text style={styles.text}>Time</Text>
					<Text style={styles.text}>Available Doctors</Text>
				</View>
				<ScrollView style={{ flex: 2 }}>
					{(appointmentList || []).map((data, index) => {
						return (
							<>
								<TouchableOpacity
									onPress={() => {
										setShowModal(true);
									}}>
									<AvailabeAppointments
										appTime={data.appTime}
										doctorName={data.doctorName}
										duration={data.duration}
										key={index}
									/>
								</TouchableOpacity>
								<Modal
									animationType="slide"
									transparent={true}
									visible={showModal}
									onRequestClose={() => {
										Alert.alert("Modal has been closed.");
									}}>
									<Confirm
										doctorName={data.doctorName}
										time={data.appTime}
										key={index}
										showModal={showModal}
										setShowModal={setShowModal}
									/>
								</Modal>
							</>
						);
					})}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	text: { fontSize: 20, fontStyle: "normal", fontWeight: "bold", marginRight: 20 },
	modalView: {
		position: "relative",
		top: "20%",
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
	dateView: {
		position: "absolute",
		top: "60%",
		margin: 0,
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
		width: "90%",
	},
});

export default Booking;
