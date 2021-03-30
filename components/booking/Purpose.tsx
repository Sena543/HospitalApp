import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

function Purpose({ bookAppointment, setBookAppointment }) {
	// const [selectPurpose, setSelectPurpose] = useState()
	const [showPurpose, setShowPurpose] = useState(false);

	const purposes = [
		{ label: "Regular Checkup", value: "Regular" },
		{ label: "Dental Checkup", value: "Dental" },
		{ label: "Results Collection", value: "Results Collection" },
		{ label: "Medication", value: "Medication" },
		{ label: "Surgery", value: "Surgery" },
	];

	return (
		<View style={{ flex: 0.1, marginBottom: 30, marginTop: 10, marginLeft: 5 }}>
			<TouchableOpacity
				onPress={() => {
					setShowPurpose(true);
				}}>
				<View style={{ height: 20 }}>
					<Text>Select Appointment Purpose</Text>
					<Text
						style={{
							fontStyle: "normal",
							fontWeight: "bold",
							fontSize: 20,
							color: "#3036FF",
						}}>
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
							return <Picker.Item label={purpose.label} value={purpose.value} />;
						})}
					</Picker>
				</View>
			</Modal>
		</View>
	);
}

export default Purpose;

const styles = StyleSheet.create({
	modalView: {
		position: "relative",
		top: "15%",
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
