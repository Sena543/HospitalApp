import React from "react";
import Navigation from ".";
import AuthStackRoot from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";

function Nav({ isLoggedIn }) {
	return <NavigationContainer>{isLoggedIn ? <Navigation /> : <AuthStackRoot />}</NavigationContainer>;
}

export default Nav;
