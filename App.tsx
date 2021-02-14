import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, concat } from "@apollo/client";

import { onError } from "@apollo/client/link/error";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: "https://immense-savannah-88207.herokuapp.com/" });
const client = new ApolloClient({
	// uri: "https://immense-savannah-88207.herokuapp.com/",
	link: concat(errorLink, httpLink),
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
