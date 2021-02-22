import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
function ImageComp({ name }) {
	return (
		<View style={styles.container}>
			<View style={styles.imageView}>
				{/* <Image source={require("../../assets/images/moon.jpg")} style={styles.image} /> */}
				<Ionicons name="person-circle-outline" style={styles.image} size={85} />
				<View style={{ marginTop: 5, marginLeft: 50 }}>
					<Text style={styles.fontStyle}>Hello, {name}</Text>
				</View>
				<View>
					<Text style={styles.fontStyle}>Appointment you have Booked</Text>
				</View>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		marginTop: 10,
		marginRight: 40,
		width: 80,
		height: 80,
		borderRadius: 50,
		position: "relative",
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
