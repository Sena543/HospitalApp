import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import Login from "../components/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import SettingScreen from "../screens/SettingScreen";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<RootNavigator />
		</NavigationContainer>
	);
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
	// const isLoggedIn = localStorage.getItem("loggedIn") !== null;
	// let isLoggedIn;
	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem("loggedIn");
			if (value !== null) {
				// value previously stored
				return value;
			}
		} catch (e) {
			// error reading value
		}
	};

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{getData ? (
				<>
					<Stack.Screen name="Root" component={BottomTabNavigator} />
					<Stack.Screen
						name="Settings"
						component={SettingScreen}
						options={{
							title: "Settings",
						}}
					/>
				</>
			) : (
				<Stack.Screen name="Auth" component={Login} />
			)}
			<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
		</Stack.Navigator>
	);
}
