import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

function Purpose({ bookAppointment, setBookAppointment }) {
	const [showPurpose, setShowPurpose] = useState(false);
	const purposes = ["Regular Checkup", "Medical Checkup", "Dental Checkup", "Results Collection"];

	return (
		<View style={{ flex: 0.1, marginBottom: 30, marginTop: 10, marginLeft: 5 }}>
			<TouchableOpacity
				onPress={() => {
					setShowPurpose(true);
				}}>
				<View style={{ height: 20 }}>
					<Text>Select Appointment Purpose</Text>
					<View
						style={{
							backgroundColor: "#ECECFF",
							width: 150,
							borderRadius: 5,
							justifyContent: "center",
							flexDirection: "row",
						}}>
						<Text
							style={{
								fontStyle: "normal",
								fontWeight: "bold",
								fontSize: 20,
								color: "#3036FF",
							}}>
							{bookAppointment.checkupType}
						</Text>
						<Ionicons
							name="chevron-down"
							style={{ position: "relative", top: 4, backgroundColor: "#fff", left: 15 }}
						/>
					</View>
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
							return <Picker.Item label={purpose} value={purpose} key={purpose} />;
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
	},
});
