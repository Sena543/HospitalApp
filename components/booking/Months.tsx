import React, { useState } from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { View, Text } from "../Themed";

const moment = extendMoment(Moment);
export default function Months({ appointmentDate, setAppointmentDate }) {
	// const [appointmentDate, setAppointmentDate] = useState({
	// 	selectedMonth: "",
	// 	selectedDay: "",
	// 	year: new Date().getFullYear(),
	// });
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
	const handleSetDate = (item: any) => {
		setTodayDate(item);
		setAppointmentDate({ ...appointmentDate, selectedDay: Number(item) });
	};

	const handleSetMonth = (item: any) => {
		const monthFunc = (ele) => ele === item;
		const index = months.findIndex(monthFunc) + 1;
		setRenderedMonth(item);
		setAppointmentDate({ ...appointmentDate, selectedMonth: index });
	};
	const renderDays = ({ item }) => {
		const bgColor = todayDate == item ? "#0910FF" : "#033c57";
		const textColor = todayDate == item ? "#FFFFFF" : "#000000";
		return (
			<TouchableOpacity onPress={() => handleSetDate(item)}>
				<View
					style={{
						backgroundColor: bgColor,
						margin: 3,
						height: 55,
						width: 50,
						borderRadius: 12,
						justifyContent: "center",
						display: "flex",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontStyle: "normal",
							fontWeight: "bold",
							fontSize: 25,
							color: textColor,
						}}
					>
						{item}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	const renderMonths = ({ item }) => {
		const selectedColor = renderedMonths === item ? "#3036FF" : "#BFBFBF";
		const bgColor = renderedMonths === item ? "#ECECFF" : null;
		return (
			<>
				<TouchableOpacity onPress={() => handleSetMonth(item)}>
					<Text
						style={{
							fontStyle: "normal",
							fontWeight: "bold",
							fontSize: 18,
							margin: 5,
							borderRadius: 5,
							color: selectedColor,
							backgroundColor: bgColor,
						}}
					>
						{item}
					</Text>
				</TouchableOpacity>
			</>
		);
	};
	// console.log(appointmentDate);
	return (
		<ScrollView>
			<FlatList
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				data={months}
				renderItem={renderMonths}
				keyExtractor={(item) => item}
			/>
			<View style={{ marginRight: 20 }}>
				<FlatList
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					data={days}
					renderItem={renderDays}
					keyExtractor={(item) => item}
				/>
			</View>
		</ScrollView>
	);
}
