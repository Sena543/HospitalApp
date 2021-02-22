import { Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

function AppointmentBubble({
	date,
	time,
	doctor,
	officeNumber,
	location,
	chosenColor,
	index,
	endTime,
}: {
	endTime: String;
	date: String;
	location: String;
	officeNumber: String;
	doctor: String;
	time: String;
	chosenColor: Number;
	index: Number;
}) {
	const colors = [
		{ name: "kindOfRed", dateColor: "#5D002E", bgColor: "#F6E7EC" },
		{ name: "kindOfGreen", dateColor: "#07B20D", bgColor: "#ECFAEE" },
		{ name: "kindOfPurple", dateColor: "#5B4A8C", bgColor: "#E9E9FF" },
	];
	return (
		<View
			key={Number(index)}
			style={{
				flex: 1,
				backgroundColor: `${colors[Number(chosenColor)].bgColor}`,
				borderRadius: 20,
				alignItems: "center",
				justifyContent: "center",
				margin: 20,
			}}>
			<View style={{ display: "flex", justifyContent: "center" }}>
				<Text style={{ color: "#a39bc6", fontSize: 15, fontWeight: "bold" }}>{date}</Text>
			</View>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<View style={{ flexDirection: "row" }}>
					<View style={styles.bubbleText}>
						<Ionicons
							name="location-outline"
							color={`${colors[Number(chosenColor)].dateColor}`}
							style={styles.icon}
						/>
						<Text>{location}</Text>
					</View>
					<View style={styles.bubbleText}>
						<Text>Room {officeNumber}</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row" }}>
					<View style={styles.bubbleText}>
						<Fontisto
							name="doctor"
							color={`${colors[Number(chosenColor)].dateColor}`}
							style={styles.icon}
						/>
						<Text>{doctor}</Text>
					</View>
					<View style={styles.bubbleText}>
						<Text>
							{time} - {endTime}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#e9e9ff",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		margin: 20,
	},
	bubbleText: {
		display: "flex",
		flexDirection: "row",
		margin: 10,
	},
	icon: {
		marginTop: 2,
		marginRight: 2,
	},
});

export default AppointmentBubble;
