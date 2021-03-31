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
import Months from "./booking/Months";
import BookingKeys from "./booking/BookingKeys";
import Purpose from "./booking/Purpose";
import AvailabeAppointments from "./booking/AvailableAppointment";

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

	return (
		<SafeAreaView style={{ flex: 1, width: "100%", marginLeft: 25 }}>
			<Purpose bookAppointment={bookAppointment} setBookAppointment={setBookAppointment} />
			<Months />
			<BookingKeys />
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
