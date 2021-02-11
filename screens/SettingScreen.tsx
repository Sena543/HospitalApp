import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

function SettingScreen() {
	return (
		<View style={styles.root}>
			<View
				style={{
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "space-around",
					position: "relative",
					bottom: "20%",
				}}>
				<View>
					<Text style={{ fontSize: 40, fontWeight: "bold", color: "#3036FF" }}>Settings</Text>
				</View>
				<View style={styles.iconContianer}>
					<View style={styles.itemView}>
						<View>
							<Ionicons name="person" size={70} style={styles.icon} />
						</View>
						<Text style={styles.textStyle}>Account Info</Text>
					</View>
					<View style={styles.itemView}>
						<View>
							<Image source={require("../assets/images/sts.png")} style={styles.image} />
						</View>
						<Text style={styles.textStyle}>Visit sts</Text>
					</View>
				</View>
				<View style={styles.iconContianer}>
					<View style={styles.itemView}>
						<View>
							<Ionicons name="notifications-outline" size={70} style={styles.icon} />
						</View>
						<Text style={styles.textStyle}>Noitfications</Text>
					</View>
					<View style={styles.itemView}>
						<View>
							<Ionicons name="log-out-outline" size={70} style={styles.icon} />
						</View>
						<Text style={styles.textStyle}>Logout</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default SettingScreen;

const styles = StyleSheet.create({
	root: {
		backgroundColor: "#fff",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	textStyle: {
		fontWeight: "bold",
		fontSize: 20,
	},
	itemView: {
		backgroundColor: "#F4F2F8",
		width: 160,
		borderRadius: 20,
		height: 160,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		color: "#57668b",
	},
	iconContianer: {
		flexDirection: "row",
		height: "50%",
		justifyContent: "space-around",
		alignItems: "center",
	},
	image: {
		// marginTop: 10,
		paddingRight: 40,
		width: 50,
		height: 40,
		// borderRadius: 50,
		// position: "relative",
		// left: 75,
	},
});
