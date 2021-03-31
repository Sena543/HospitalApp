import React, { useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, Text, View } from "react-native";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);
export default function Months() {
	const [selectedMonth, setSelectedMonth] = useState();
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const [todayDate, setTodayDate] = useState(new Date().getDate());
	const [renderedMonths, setRenderedMonth] = useState(months[new Date().getMonth()]);
	const days = Array.from({ length: moment(moment().format("YYYY-MM")).daysInMonth() }, (x, i) =>
		moment().startOf("month").add(i, "days").format("D")
	);

	// const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][todayDate];
	// console.log(dayNames);

	const renderDays = ({ item }) => {
		const bgColor = todayDate == item ? "#0910FF" : "#FFFFFF";
		const textColor = todayDate == item ? "#FFFFFF" : "#000000";
		return (
			<View
				style={{
					backgroundColor: bgColor,
					height: 55,
					width: 45,
					borderRadius: 12,
					justifyContent: "center",
					display: "flex",
					alignItems: "center",
					margin: 2,
				}}>
				<TouchableOpacity onPress={() => setTodayDate(item)}>
					<Text
						style={{
							fontStyle: "normal",
							fontWeight: "bold",
							fontSize: 25,
							color: textColor,
						}}>
						{item}
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const renderMonths = ({ item }) => {
		const selectedColor = renderedMonths === item ? "#3036FF" : "#BFBFBF";
		return (
			<>
				<TouchableOpacity onPress={() => setRenderedMonth(item)}>
					<Text
						style={{
							fontStyle: "normal",
							fontWeight: "bold",
							fontSize: 15,
							margin: 5,
							color: selectedColor,
						}}>
						{item}
					</Text>
				</TouchableOpacity>
			</>
		);
	};
	return (
		<ScrollView>
			<FlatList
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				data={months}
				renderItem={renderMonths}
				keyExtractor={(item) => item}
			/>
			<FlatList
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				data={days}
				renderItem={renderDays}
				keyExtractor={(item) => item}
			/>
		</ScrollView>
	);
}
