import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from ".";
import AuthStackRoot from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";
// import { getToken } from "../util";

function Nav({ isLoggedIn }) {
	return <NavigationContainer>{isLoggedIn ? <Navigation /> : <AuthStackRoot />}</NavigationContainer>;
}

export default Nav;
