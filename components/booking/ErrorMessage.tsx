import React from "react";
import { Modal, StyleSheet, View, Text, Button } from "react-native";

export default function ErrorMessage({ error, setShowError }) {
	return (
		<Modal animationType="slide" transparent={true} visible={error.errorModal}>
			<View style={styles.modalView}>
				<View style={{}}>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",
							fontStyle: "normal",
							// textDecorationLine: "underline",
							color: "red",
						}}>
						Error
					</Text>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text>{error.errorMessage}</Text>
				</View>
				<Button
					title="Okay"
					color="#0E14FF"
					onPress={() => {
						setShowError({ ...error, errorModal: false });
					}}
				/>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalView: {
		position: "relative",
		top: "20%",
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.55,
		shadowRadius: 3.84,
		elevation: 5,
		justifyContent: "flex-start",
		height: "30%",
		// width:"70%"
	},
});
