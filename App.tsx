import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, concat } from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import useCachedResources from "./hooks/useCachedResources";
import Nav from "./navigation/Nav";
import { getToken } from "./util";
import { LoggedInProvider } from "./context/loggedInContext";

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = await getToken();
	return {
		headers: {
			...headers,
			auth_token: token,
		},
	};
});

const httpLink = new HttpLink({ uri: "https://immense-savannah-88207.herokuapp.com" });
const securedLink = authLink.concat(httpLink);
const client = new ApolloClient({
	link: concat(errorLink, securedLink),
	cache: new InMemoryCache(),
});

export default function App() {
	const isLoadingComplete = useCachedResources();
	const [isLoggedIn, setIsLogged] = React.useState(false);
	const [globalStudentID, setGlobalStudentID] = React.useState();
	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<ApolloProvider client={client}>
				<LoggedInProvider value={{ isLoggedIn, setIsLogged, globalStudentID, setGlobalStudentID }}>
					<SafeAreaProvider>
						<Nav isLoggedIn={isLoggedIn} />
						<StatusBar />
					</SafeAreaProvider>
				</LoggedInProvider>
			</ApolloProvider>
		);
	}
}
