import * as React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
// import { Text, View } from "../components/Themed";
import LoggedInContext from "../context/loggedInContext";

export default function AppointmentScreen() {
	const { globalStudentID } = React.useContext(LoggedInContext);
	console.log("loggedID", globalStudentID);
	return <EditScreenInfo path="/screens/Appointment.tsx" studentID={globalStudentID} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
