import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import AppoitmentList from "./appointment/AppoitmentList";
import ImageComp from "./appointment/ImageComp";

export default function EditScreenInfo({ path }: { path: string }) {
	return (
		<ScrollView style={styles.container}>
			<ImageComp />
			<AppoitmentList />
		</ScrollView>
	);
}

function handleHelpPress() {
	WebBrowser.openBrowserAsync(
		"https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center",
		display: "flex",
		backgroundColor: "#fff",
	},
});
