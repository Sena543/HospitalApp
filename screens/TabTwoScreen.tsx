import * as React from "react";
import { StyleSheet } from "react-native";

import Booking from "../components/Booking";
import { View } from "../components/Themed";

export default function TabTwoScreen() {
	return (
		<View style={styles.container}>
			<Booking />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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
