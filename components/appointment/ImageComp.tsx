import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
function ImageComp({ name }) {
	// console.log(name)
	return (
		<View style={styles.container}>
			<View style={styles.imageView}>
				<Ionicons name="person-circle-outline" style={styles.image} size={85} />
				<View style={{ position: "relative", alignItems: "center", justifyContent: "center" }}>
					<Text style={styles.fontStyle}>Hello, {name}</Text>
				</View>
				<View>
					<Text style={styles.fontStyle}>Appointments you have Booked</Text>
				</View>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		flex: 1,
		marginTop: "5%",
		marginRight: "5%",
		width: 80,
		height: 80,
		borderRadius: 50,
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
		left: 50,
	},
	imageView: {
		flex: 1,
		borderColor: "#000",
		justifyContent: "center",
		alignContent: "center",
	},
	fontStyle: {
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "bold",
	},
});
export default ImageComp;
