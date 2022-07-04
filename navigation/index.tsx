import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
// import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import SettingScreen from "../screens/SettingScreen";

export default function Navigation() {
	return <RootNavigator />;
}

const Stack = createStackNavigator();

function RootNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="Root"
				// options={{ headerStyle: { backgroundColor: "#000" } }}
				component={BottomTabNavigator}
			/>
			<Stack.Screen
				name="Settings"
				component={SettingScreen}
				options={{
					title: "Settings",
					headerShown: true,
					headerBackTitle: "Back",
				}}
			/>

			{/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} /> */}
		</Stack.Navigator>
	);
}
