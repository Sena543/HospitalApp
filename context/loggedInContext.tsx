import React from "react";

const LoggedInContext = React.createContext(null);

export const LoggedInProvider = LoggedInContext.Provider;
export const LoggedInConsumer = LoggedInContext.Consumer;

export default LoggedInContext;
