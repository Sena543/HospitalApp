import { Ionicons } from "@expo/vector-icons";
import React, { useState, useContext } from "react";
import {
	View,
	Text,
	Alert,
	StyleSheet,
	SafeAreaView,
	Modal,
	ScrollView,
	TouchableOpacity,
	Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import LoggedInContext from "../context/loggedInContext";
import Confirm from "./booking/Confirm";
import moment from "moment";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const BOOK_APPOINTMENT = gql`
	mutation(
		$studentID: ID!
		$doctorID: ID!
		$checkupType: String!
		$appointmentStartTime: String!
		# $endTime: String!
		# $arrivalConfirmation: Boolean
		$appointmentDate: String!
	) {
		bookAppointment(
			input: {
				studentID: $studentID
				doctorID: $doctorID
				checkupType: $checkupType
				appointmentStartTime: $appointmentStartTime
				# endTime: $endTime
				appointmentDate: $appointmentDate
			}
		) {
			appointmentDate
			appointmentStartTime
			arrivalConfirmation
			checkupType
			doctorID {
				doctorID
			}
			endTime
		}
	}
`;

const GET_AVAILABLE_DOCTORS = gql`
	query($timeSelected: String) {
		getAvailableDoctors(timeSelected: $timeSelected) {
			doctorID
			doctorName
			email
			officeNumber
			timesAvailable
		}
	}
`;

function Booking() {
	const { globalStudentID } = useContext(LoggedInContext);
	const [showModal, setShowModal] = useState(false);
	const [showPurpose, setShowPurpose] = useState(false);

	const [showComponents, setShowComponents] = useState({
		datePicker: false,
		pupropsePicker: false,
		confirmAppointment: false,
		timePicker: false,
		appointmentBooked: false,
	});
	const [bookAppointment, setBookAppointment] = useState({
		checkupType: "Regular Checkup",
		appointmentDate: moment(new Date()).format("DD-MM-YYYY"),
		startTime: moment(new Date().getTime()).format("h:mm"),
		endTime: "",
		doctorID: "",
	});
	const [docList, setDocList] = useState([]);
	const [getDocs, { loading, data: availableDocs }] = useLazyQuery(GET_AVAILABLE_DOCTORS, {
		onCompleted: (d) => {
			console.log(d);
			setDocList(d.getAvailableDoctors);
		},
		onError: (e) => {
			// console.error(e);
		},
	});
	React.useEffect(() => {}, [docList, availableDocs]);
	const [confirmAppointment, { data }] = useMutation(BOOK_APPOINTMENT, {
		variables: {
			doctorID: bookAppointment.doctorID,
			checkupType: bookAppointment.checkupType,
			studentID: globalStudentID,
			appointmentDate: bookAppointment.appointmentDate,
			endTime: bookAppointment.endTime,
			appointmentStartTime: bookAppointment.startTime,
		},
		onCompleted: () => {
			setShowComponents({ ...showComponents, appointmentBooked: true });
		},
		onError: (e) => {
			// console.log(e);
		},
	});

	const hideDatePicker = () => {
		setShowComponents({ ...showComponents, timePicker: false });
	};

	const handleConfirm = (time: any) => {
		const startTime = moment(time).format("h:mm");
		setBookAppointment({ ...bookAppointment, startTime });
		hideDatePicker();
		getDocs({ variables: { timeSelected: startTime } });
		// console.log(startTime);
	};

	const handleDateConfirm = (date: any) => {
		const currentDate = moment(date).format("DD/MM/YYYY");
		setBookAppointment({ ...bookAppointment, appointmentDate: currentDate });
		setShowComponents({ ...showComponents, datePicker: false });
	};

	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);

	const purposes = ["Regular Checkup", "Medical Checkup", "Dental Checkup", "Results Collection"];
	const AvailabeAppointments = ({
		appTime,
		doctorName,
		duration,
		key,
	}: {
		appTime: String;
		doctorName: String;
		duration: String;
		key: Number;
	}) => {
		// console.log("appTime", appTime);
		const colors = ["#AB14F8", "#07B20D", "#07ADB2", "#FF0000"];
		return (
			<View key={Number(key)} style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
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
						<Ionicons name="refresh-circle-outline" color={colors[2]} size={15} />
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
						<Text style={{ marginLeft: 10, marginBottom: 10 }}>
							{appTime}-{Number(appTime[0]) + 1}:00
						</Text>
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
								setBookAppointment({ ...bookAppointment, checkupType: `${itemValue}` });
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
			<View style={{ flex: 2 }}>
				<View style={{ flex: 0.1, flexDirection: "row", marginBottom: 10 }}>
					<Text style={styles.text}>Time</Text>
					<Text style={styles.text}>Available Doctors</Text>
				</View>

				<ScrollView style={{ flex: 2 }}>
					{docList.length === 0 ? (
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								marginTop: 20,
								marginLeft: 10,
								marginRight: 20,
								borderWidth: 1,
								borderColor: "#000",
								height: 50,
								borderStyle: "dashed",
							}}>
							<Text style={{ fontSize: 20, fontWeight: "bold" }}>
								No Doctors currently available at current time
							</Text>
						</View>
					) : (
						(docList || []).map((data, index) => {
							// console.log(data.doctorID);
							return (
								<View key={index}>
									<TouchableOpacity
										onPress={() => {
											setSelectedDoctor(data.doctorName);
											setSelectedTime(data.appTime);
											setBookAppointment({
												...bookAppointment,
												doctorID: data.doctorID,
											});
											setShowModal(true);
										}}>
										<AvailabeAppointments
											appTime={bookAppointment.startTime}
											// appTime={data.appTime}
											doctorName={data.doctorName}
											duration={data.duration}
											key={index}
										/>
									</TouchableOpacity>
								</View>
							);
						})
					)}
					<Modal animationType="slide" transparent={true} visible={showModal}>
						<Confirm
							doctorID={selectedDoctor}
							time={bookAppointment.startTime}
							showModal={showModal}
							setShowModal={setShowModal}
							confirmApp={confirmAppointment}
						/>
					</Modal>
					<Modal
						animationType="slide"
						transparent={true}
						visible={showComponents.appointmentBooked}>
						<View style={styles.confirmAppView}>
							<Text style={{ fontSize: 20, fontWeight: "bold" }}>
								Appointment was booked successfully
							</Text>
							<Button
								onPress={() =>
									setShowComponents({ ...showComponents, appointmentBooked: false })
								}
								title="Okay"
							/>
						</View>
					</Modal>
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
	confirmAppView: {
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
		height: "20%",
		// width:"70%"
	},
});

export default Booking;
