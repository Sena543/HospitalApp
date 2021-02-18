import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/SignUp";
import Login from "../components/Login";

const AuthStack = createStackNavigator();

export default function AuthStackRoot() {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name="SignIn" component={Login} options={{ title: "Sign In" }} />
			<AuthStack.Screen
				name="SignUp"
				component={SignUp}
				options={{
					headerTitle: "Sign Up",
				}}
			/>
		</AuthStack.Navigator>
	);
}
