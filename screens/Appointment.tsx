import * as React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
// import { Text, View } from "../components/Themed";
import LoggedInContext from "../context/loggedInContext";

export default function Appointment() {
	const { globalStudentID } = React.useContext(LoggedInContext);
	console.log("loggedID", globalStudentID);
	return (
		<SafeAreaView style={styles.container}>
			<EditScreenInfo path="/screens/Appointment.tsx" studentID={globalStudentID} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
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
