import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function BookingKeys() {
	return (
		<View
			style={{
				position: "relative",
				bottom: 75,
				flexDirection: "row",
				marginLeft: 20,
				marginRight: 20,
			}}>
			<View style={{ flex: 1, flexDirection: "row" }}>
				<Ionicons
					name="radio-button-on-outline"
					size={10}
					color="#FF0000"
					style={{ marginTop: 3, marginRight: 5 }}
				/>
				<Text>Full Booked</Text>
			</View>
			<View style={{ flex: 1, flexDirection: "row" }}>
				<Ionicons
					name="radio-button-on-outline"
					size={10}
					color="#FF6F00"
					style={{ marginTop: 3, marginRight: 5 }}
				/>
				<Text>Almost Full</Text>
			</View>
			<View style={{ flex: 1, flexDirection: "row", marginLeft: 10 }}>
				<Ionicons
					name="radio-button-on-outline"
					size={10}
					color="#23FF1B"
					style={{ marginTop: 3, marginRight: 5 }}
				/>
				<Text>Available</Text>
			</View>
		</View>
	);
}
