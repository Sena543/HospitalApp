import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Profile from "../components/Profile";
import { TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Appointment from "../screens/Appointment";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, ProfileParamList, TabOneParamList, TabTwoParamList } from "../types";
import Navigation from ".";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();
	const activeColor = "#0E14FF";

	return (
		<BottomTab.Navigator
			initialRouteName="TabOne"
			screenOptions={{
				tabBarActiveTintColor: activeColor,
				tabBarActiveBackgroundColor: "#E9E9FF",
				tabBarStyle: {
					borderWidth: 0.5,
					borderBottomWidth: 1,
					// backgroundColor: "orange",
					borderTopLeftRadius: 5,
					borderTopRightRadius: 5,
					borderColor: "transparent",
					overflow: "hidden",
				},
			}}
			// tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
			// tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
		>
			<BottomTab.Screen
				name="Appointment"
				component={AppointmentNavigator}
				options={{
					tabBarIcon: ({ color }) => <TabBarIcon name="business-outline" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Booking"
				component={TabTwoNavigator}
				options={{
					tabBarIcon: ({ color }) => <TabBarIcon name="book-outline" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Profile"
				component={ProfileNavigator}
				options={{
					tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>["name"]; color: string }) {
	return <Ionicons size={22} style={{ marginBottom: 2, marginLeft: 2.5 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AppointmentStack = createStackNavigator<TabOneParamList>();

function AppointmentNavigator({ navigation }) {
	return (
		<AppointmentStack.Navigator>
			<AppointmentStack.Screen
				name="AppointmentScreen"
				component={Appointment}
				options={{
					headerTitle: "Appointment History",
					headerRight: () => {
						return (
							<TouchableOpacity
								onPress={() => {
									navigation.navigate("Settings");
								}}
								style={{ marginRight: 10 }}
							>
								<Ionicons name="settings-outline" size={20} />
							</TouchableOpacity>
						);
					},
				}}
			/>
		</AppointmentStack.Navigator>
	);
}

const ProfileStack = createStackNavigator<ProfileParamList>();
function ProfileNavigator() {
	return (
		<ProfileStack.Navigator>
			<AppointmentStack.Screen name="Your Profile" component={Profile} />
			{/* <AppointmentStack.Screen name="Profile" component={Profile} options={{ headerTitle: "Your Profile" }} /> */}
		</ProfileStack.Navigator>
	);
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
	return (
		<TabTwoStack.Navigator>
			<TabTwoStack.Screen
				name="TabTwoScreen"
				component={TabTwoScreen}
				options={{ headerTitle: "Book Appointment" }}
			/>
		</TabTwoStack.Navigator>
	);
}
