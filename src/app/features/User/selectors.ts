import { RootState } from "../../store";

export const getUser = (state: RootState) => state.user
export const isLoggedIn = (state: RootState) => state.user.loggedIn
export const getUserStatus = (state: RootState) => state.user.status
export const getUserMessage = (state: RootState) => state.user.message
