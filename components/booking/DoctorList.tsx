import React from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, Button } from "react-native";
import AvailabeAppointments from "./AvailableAppointment";
import Confirm from "./Confirm";

export default function DoctorList({
	docList,
	setSelectedDoctor,
	setSelectedTime,
	bookAppointment,
	setBookAppointment,
	showModal,
	setShowModal,
	selectedDoctor,
	confirmAppointment,
	showComponents,
	setShowComponents,
}) {
	return (
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
			<Modal animationType="slide" transparent={true} visible={showComponents.appointmentBooked}>
				<View style={styles.confirmAppView}>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>
						Appointment was booked successfully
					</Text>
					<Button
						onPress={() => setShowComponents({ ...showComponents, appointmentBooked: false })}
						title="Okay"
					/>
				</View>
			</Modal>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
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
	},
});
