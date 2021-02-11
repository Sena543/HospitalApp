import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

// https://evening-stream-45742.herokuapp.com/

// const client = new ApolloClient({
// 	uri: "https://evening-stream-45742.herokuapp.com/",
// 	cache: new InMemoryCache(),
// });

const client = new ApolloClient({
	uri: "http://localhost:8000/gql",
	cache: new InMemoryCache(),
});
export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<ApolloProvider client={client}>
				<SafeAreaProvider>
					<Navigation colorScheme={colorScheme} />
					<StatusBar />
				</SafeAreaProvider>
			</ApolloProvider>
		);
	}
}
