import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_TOKEN = "auth_token";

let token: string;

export const getToken = async () => {
	if (token) {
		return Promise.resolve(token);
	}

	token = await AsyncStorage.getItem(AUTH_TOKEN);
	return token;
};

export const signIn = (newToken) => {
	token = newToken;
	return AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

export const signOut = () => {
	token = undefined;
	return AsyncStorage.removeItem(AUTH_TOKEN, (err) => {
		if (!err) console.log("Signed out");
		else {
			console.error("An error occurred while trying to sign out.");
			console.error(err);
		}
	});
};
