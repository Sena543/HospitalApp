import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import React from "react";

const AvailabeAppointments = ({
	appTime,
	doctorName,
	duration,
}: {
	appTime: String;
	doctorName: String;
	duration: String;
}) => {
	// console.log("appTime", appTime);
	const colors = ["#AB14F8", "#07B20D", "#07ADB2", "#FF0000"];
	return (
		<View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
			{/* <View key={Number(key)} style={{ flex: 1, flexDirection: "row", marginTop: 10 }}> */}
			<Text style={{ color: "#B5B7BB" }}>{appTime}</Text>
			<View style={{ flexDirection: "row", flex: 1 }}>
				<View
					style={{
						marginBottom: 10,
						backgroundColor: "#E9E9FF",
						marginLeft: 50,
						width: 30,
						borderRadius: 5,
						alignItems: "center",
						justifyContent: "flex-end",
					}}>
					<Ionicons name="refresh-circle-outline" color={colors[2]} size={15} />
				</View>
				<View>
					<Text
						style={{
							marginBottom: 20,
							marginLeft: 10,
							fontWeight: "bold",
							fontSize: 15,
							color: "#000000",
						}}>
						{doctorName}
					</Text>
					<Text style={{ marginLeft: 10, marginBottom: 10 }}>
						{appTime}-{Number(appTime[0]) + 1}:00
					</Text>
				</View>
			</View>
		</View>
	);
};

export default AvailabeAppointments;
