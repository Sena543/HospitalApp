import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image, Platform } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

function SettingScreen() {
	const handleLogout = async () => {
		try {
			const asyncStorageKeys = await AsyncStorage.getAllKeys();
			if (asyncStorageKeys.length > 0) {
				if (Platform.OS === "android") {
					await AsyncStorage.clear();
				}
				if (Platform.OS === "ios") {
					await AsyncStorage.multiRemove(asyncStorageKeys);
				}
			}
		} catch (e) {
			// saving error
			alert("Failed to process requests");
			console.log(e);
		}
	};
	const itemSize = 50;
	return (
		<View style={styles.root}>
			<View
				style={{
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "space-around",
					position: "relative",
					// bottom: "20%",
				}}>
				<View style={styles.iconContianer}>
					<View style={styles.itemView}>
						<View>
							<Ionicons name="person" size={itemSize} style={styles.icon} />
						</View>
						<Text style={styles.textStyle}>Account Info</Text>
					</View>
					<View style={[styles.itemView, { marginRight: 30 }]}>
						<View>
							<Image source={require("../assets/images/sts.png")} style={styles.image} />
						</View>
						<Text style={styles.textStyle}>Visit sts</Text>
					</View>
				</View>
				<View style={styles.iconContianer}>
					<View style={styles.itemView}>
						<View>
							<Ionicons name="notifications-outline" size={itemSize} style={styles.icon} />
						</View>
						<Text style={styles.textStyle}>Noitfications</Text>
					</View>
					<View style={[styles.itemView, { marginRight: 30 }]}>
						<TouchableOpacity onPress={handleLogout}>
							<View>
								<Ionicons name="log-out-outline" size={itemSize} style={styles.icon} />
							</View>
							<Text style={styles.textStyle}>Logout</Text>
						</TouchableOpacity>
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
		width: "45%",
		borderRadius: 20,
		height: "45%",
		margin: 20,
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
		padding: 10,
		width: 60,
		height: 30,
		// borderRadius: 50,
		// position: "relative",
		// left: 75,
	},
});
