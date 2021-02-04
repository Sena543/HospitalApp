import React from 'react'

const UserProfileContext = React.createContext(undefined)

export const UserProvider = UserProfileContext.Provider
export const UserConsumer = UserProfileContext.Consumer

export default UserProfileContext;